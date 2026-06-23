import express from 'express';
import { Course, Lead, Notice } from '../models/index.js';
import { cacheMiddleware } from '../middleware/cache.js';

const router = express.Router();

router.get('/courses', cacheMiddleware(60), async (req, res, next) => {
  try {
    const filter = { active: true };
    if (req.query.category) filter.category = req.query.category;
    const search = req.query.search?.trim();
    if (search) filter.$or = [{ title: new RegExp(search, 'i') }, { description: new RegExp(search, 'i') }];
    const courses = await Course.find(filter).populate('trainer', 'name profileImage').sort({ featured: -1, createdAt: -1 });
    res.json({ courses });
  } catch (error) {
    next(error);
  }
});

router.get('/courses/:slug', cacheMiddleware(60), async (req, res, next) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug, active: true }).populate('trainer', 'name profileImage');
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json({ course });
  } catch (error) {
    next(error);
  }
});

router.get('/notices', cacheMiddleware(60), async (_req, res, next) => {
  try {
    const notices = await Notice.find({ published: true }).sort({ publishedAt: -1 }).limit(10);
    res.json({ notices });
  } catch (error) {
    next(error);
  }
});

router.post('/leads/demo', async (req, res, next) => {
  try {
    const lead = await Lead.create({ ...req.body, name: req.body.name || req.body.fullName, kind: 'demo' });
    res.status(201).json({ lead, message: 'Demo registration received' });
  } catch (error) {
    next(error);
  }
});

router.post('/leads/contact', async (req, res, next) => {
  try {
    const lead = await Lead.create({ ...req.body, kind: 'contact' });
    res.status(201).json({ lead, message: 'Contact request received' });
  } catch (error) {
    next(error);
  }
});

export default router;
