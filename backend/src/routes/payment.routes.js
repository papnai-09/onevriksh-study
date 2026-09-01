import crypto from 'crypto';
import express from 'express';
import Razorpay from 'razorpay';
import { protect } from '../middleware/auth.js';
import { Course, Enrollment, Payment } from '../models/index.js';

const router = express.Router();
router.use(protect);

const hasRazorpay = () =>
  Boolean(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET);

/**
 * Create a new Razorpay Order for course enrollment
 */
router.post('/create-order', async (req, res, next) => {
  try {
    const { courseId } = req.body;
    if (!courseId) {
      return res.status(400).json({ success: false, message: 'Course ID is required' });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    const receipt = `ovs_rcpt_${Date.now().toString().slice(-8)}`;
    let order;

    if (hasRazorpay()) {
      const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET
      });
      order = await razorpay.orders.create({
        amount: Math.round(course.fee * 100), // in paise
        currency: 'INR',
        receipt,
        notes: {
          courseId: course._id.toString(),
          studentId: req.user._id.toString()
        }
      });
    } else {
      // In development mode when keys are not set, provide an explicitly marked dev order
      order = {
        id: `order_dev_${Date.now()}`,
        amount: Math.round(course.fee * 100),
        currency: 'INR',
        receipt,
        isDevOrder: true
      };
    }

    const payment = await Payment.create({
      student: req.user._id,
      course: course._id,
      amount: course.fee,
      status: 'pending',
      razorpayOrderId: order.id,
      receipt
    });

    res.status(201).json({
      success: true,
      order,
      paymentId: payment._id,
      keyId: process.env.RAZORPAY_KEY_ID || 'rzp_test_onevriksh'
    });
  } catch (error) {
    next(error);
  }
});

/**
 * Verify Razorpay payment signature & grant enrollment
 */
router.post('/verify', async (req, res, next) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, paymentId } = req.body;

    if (!paymentId) {
      return res.status(400).json({ success: false, message: 'Payment record ID is required' });
    }

    const payment = await Payment.findById(paymentId);
    if (!payment) {
      return res.status(404).json({ success: false, message: 'Payment record not found' });
    }

    // Strict signature check
    if (hasRazorpay()) {
      if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        return res.status(400).json({ success: false, message: 'Missing required Razorpay payment verification details' });
      }

      const body = `${razorpay_order_id}|${razorpay_payment_id}`;
      const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(body)
        .digest('hex');

      if (expectedSignature !== razorpay_signature) {
        payment.status = 'failed';
        await payment.save();
        return res.status(400).json({ success: false, message: 'Payment signature verification failed' });
      }
    } else {
      // In development without Razorpay keys, ensure not in production
      if (process.env.NODE_ENV === 'production') {
        return res.status(500).json({ success: false, message: 'Payment gateway configuration missing in production' });
      }
    }

    payment.status = 'paid';
    payment.razorpayPaymentId = razorpay_payment_id || `pay_dev_${Date.now()}`;
    payment.razorpaySignature = razorpay_signature || 'dev_signature';
    payment.paidAt = new Date();
    await payment.save();

    // Unlock or update course enrollment
    await Enrollment.updateOne(
      { student: req.user._id, course: payment.course },
      {
        $setOnInsert: {
          student: req.user._id,
          course: payment.course,
          progress: 0,
          status: 'active',
          enrolledAt: new Date()
        }
      },
      { upsert: true }
    );

    res.json({
      success: true,
      message: 'Payment verified and course access granted successfully!',
      payment
    });
  } catch (error) {
    next(error);
  }
});

export default router;
