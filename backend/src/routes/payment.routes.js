import crypto from 'crypto';
import express from 'express';
import Razorpay from 'razorpay';
import { protect } from '../middleware/auth.js';
import { Course, Enrollment, Payment } from '../models/index.js';

const router = express.Router();
router.use(protect);

const hasRazorpay = () => process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET;

router.post('/create-order', async (req, res, next) => {
  try {
    const course = await Course.findById(req.body.courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    const receipt = `ovs_${Date.now()}`;
    let order = { id: `order_mock_${Date.now()}`, amount: course.fee * 100, currency: 'INR', receipt, mock: true };
    if (hasRazorpay()) {
      const razorpay = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET });
      order = await razorpay.orders.create({ amount: course.fee * 100, currency: 'INR', receipt });
    }
    const payment = await Payment.create({
      student: req.user._id,
      course: course._id,
      amount: course.fee,
      status: 'pending',
      razorpayOrderId: order.id,
      receipt
    });
    res.status(201).json({ order, payment, keyId: process.env.RAZORPAY_KEY_ID || 'rzp_test_demo' });
  } catch (error) {
    next(error);
  }
});

router.post('/verify', async (req, res, next) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, paymentId } = req.body;
    let valid = true;
    if (hasRazorpay()) {
      const body = `${razorpay_order_id}|${razorpay_payment_id}`;
      const expected = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET).update(body).digest('hex');
      valid = expected === razorpay_signature;
    }
    if (!valid) return res.status(400).json({ message: 'Payment signature verification failed' });
    const payment = await Payment.findByIdAndUpdate(
      paymentId,
      { status: 'paid', razorpayPaymentId: razorpay_payment_id, razorpaySignature: razorpay_signature, paidAt: new Date() },
      { new: true }
    );
    await Enrollment.updateOne(
      { student: req.user._id, course: payment.course },
      { $setOnInsert: { student: req.user._id, course: payment.course, progress: 0 } },
      { upsert: true }
    );
    res.json({ payment, message: 'Payment verified and course unlocked' });
  } catch (error) {
    next(error);
  }
});

export default router;
