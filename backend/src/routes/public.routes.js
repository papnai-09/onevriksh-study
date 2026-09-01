import express from 'express';
import { Course, Lead, Notice, Certificate } from '../models/index.js';
import { cacheMiddleware } from '../middleware/cache.js';
import { validateBody } from '../middleware/validate.js';
import { contactLeadSchema, demoLeadSchema } from '../utils/validators.js';

const router = express.Router();

/**
 * Public Course List with Category & Search Filters (Only published courses)
 */
router.get('/courses', cacheMiddleware(60), async (req, res, next) => {
  try {
    const filter = { published: true };
    if (req.query.category && req.query.category !== 'All') {
      filter.category = req.query.category;
    }
    const search = req.query.search?.trim();
    if (search) {
      filter.$or = [
        { title: new RegExp(search, 'i') },
        { shortDescription: new RegExp(search, 'i') },
        { longDescription: new RegExp(search, 'i') },
        { category: new RegExp(search, 'i') }
      ];
    }
    const courses = await Course.find(filter)
      .sort({ featured: -1, createdAt: -1 });

    res.json({ success: true, count: courses.length, courses });
  } catch (error) {
    next(error);
  }
});

/**
 * Public Course Detail by Slug (Only published courses)
 */
router.get('/courses/:slug', cacheMiddleware(60), async (req, res, next) => {
  try {
    const course = await Course.findOne({
      slug: req.params.slug.toLowerCase(),
      published: true
    });

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    res.json({ success: true, course });
  } catch (error) {
    next(error);
  }
});

/**
 * Public Notices
 */
router.get('/notices', cacheMiddleware(60), async (_req, res, next) => {
  try {
    const notices = await Notice.find({ published: true })
      .sort({ publishedAt: -1 })
      .limit(10);
    res.json({ success: true, notices });
  } catch (error) {
    next(error);
  }
});

/**
 * Submit Free Demo Booking Lead
 */
router.post('/leads/demo', validateBody(demoLeadSchema), async (req, res, next) => {
  try {
    const referenceId = `DEMO-${Date.now().toString().slice(-6)}`;
    const lead = await Lead.create({
      kind: 'demo',
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email || '',
      course: req.body.course || '',
      mode: req.body.mode || '',
      message: req.body.message || '',
      referenceId
    });

    res.status(201).json({
      success: true,
      message: 'Demo class booking request received! Our counsellor will call you shortly.',
      referenceId,
      lead
    });
  } catch (error) {
    next(error);
  }
});

/**
 * Submit General Contact / Enquiry Lead
 */
router.post('/leads/contact', validateBody(contactLeadSchema), async (req, res, next) => {
  try {
    const referenceId = `ENQ-${Date.now().toString().slice(-6)}`;
    const lead = await Lead.create({
      kind: 'contact',
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email || '',
      subject: req.body.subject || 'General Enquiry',
      message: req.body.message,
      referenceId
    });

    res.status(201).json({
      success: true,
      message: 'Your enquiry has been received. Our team will get back to you within 24 hours.',
      referenceId,
      lead
    });
  } catch (error) {
    next(error);
  }
});

/**
 * Live Certificate Verification Endpoint
 */
router.get('/verify-certificate/:certificateNumber', async (req, res, next) => {
  try {
    const certificateNumber = req.params.certificateNumber.trim().toUpperCase();
    const certificate = await Certificate.findOne({ certificateNumber, verified: true })
      .populate('student', 'name studentId')
      .populate('course', 'title category duration');

    if (!certificate) {
      return res.status(404).json({
        success: false,
        verified: false,
        message: 'No verified certificate found for this certificate ID. Please verify the ID format.'
      });
    }

    res.json({
      success: true,
      verified: true,
      certificate: {
        certificateNumber: certificate.certificateNumber,
        studentName: certificate.studentName || certificate.student?.name || 'Verified Student',
        studentId: certificate.student?.studentId || 'N/A',
        courseTitle: certificate.courseName || certificate.course?.title || 'Certified Program',
        grade: certificate.grade || 'Grade A',
        issuedAt: certificate.issuedAt,
        certificateUrl: certificate.certificateUrl || null
      }
    });
  } catch (error) {
    next(error);
  }
});

export default router;
