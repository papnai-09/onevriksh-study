import express from 'express';
import { authorize, protect } from '../middleware/auth.js';
import {
  Attendance,
  Certificate,
  Course,
  Enrollment,
  Lead,
  Notice,
  Payment,
  Result,
  StudyMaterial,
  Test,
  User
} from '../models/index.js';

const router = express.Router();
router.use(protect, authorize('admin'));

/**
 * Admin Aggregated Analytics
 */
router.get('/stats', async (_req, res, next) => {
  try {
    const todayMidnight = new Date();
    todayMidnight.setHours(0, 0, 0, 0);

    const [
      totalStudents,
      activeStudents,
      totalCourses,
      revenueResult,
      attendanceToday,
      totalEnrollments,
      newLeads
    ] = await Promise.all([
      User.countDocuments({ role: 'student' }),
      User.countDocuments({ role: 'student', active: true }),
      Course.countDocuments({ active: true }),
      Payment.aggregate([
        { $match: { status: 'paid' } },
        { $group: { _id: null, total: { $sum: '$amount' } } }
      ]),
      Attendance.countDocuments({ date: { $gte: todayMidnight } }),
      Enrollment.countDocuments({ status: 'active' }),
      Lead.countDocuments({ status: 'new' })
    ]);

    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0;

    res.json({
      success: true,
      totalStudents,
      activeStudents,
      totalCourses,
      totalRevenue,
      attendanceToday,
      enrollments: totalEnrollments,
      newLeads
    });
  } catch (error) {
    next(error);
  }
});

function crudRoutes(path, Model, options = {}) {
  // List records with pagination limit
  router.get(path, async (_req, res, next) => {
    try {
      const items = await Model.find()
        .sort({ createdAt: -1 })
        .limit(options.limit || 200)
        .populate(options.populate || []);
      res.json({ success: true, items });
    } catch (error) {
      next(error);
    }
  });

  // Create record
  router.post(path, async (req, res, next) => {
    try {
      const payload = options.prepareCreate ? options.prepareCreate(req) : req.body;
      const item = await Model.create(payload);
      res.status(201).json({ success: true, item });
    } catch (error) {
      next(error);
    }
  });

  // Update record
  router.patch(`${path}/:id`, async (req, res, next) => {
    try {
      const item = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });
      if (!item) return res.status(404).json({ success: false, message: 'Record not found' });
      return res.json({ success: true, item });
    } catch (error) {
      return next(error);
    }
  });

  // Delete record
  router.delete(`${path}/:id`, async (req, res, next) => {
    try {
      const item = await Model.findByIdAndDelete(req.params.id);
      if (!item) return res.status(404).json({ success: false, message: 'Record not found' });
      return res.json({ success: true, message: 'Record deleted successfully' });
    } catch (error) {
      return next(error);
    }
  });
}

crudRoutes('/students', User, {
  prepareCreate: (req) => ({
    ...req.body,
    role: 'student',
    password: req.body.password || 'Student@123456'
  })
});
crudRoutes('/courses', Course);
crudRoutes('/attendance', Attendance, {
  prepareCreate: (req) => ({ ...req.body, markedBy: req.user._id }),
  populate: ['student', 'course']
});
crudRoutes('/payments', Payment, { populate: ['student', 'course'] });
crudRoutes('/notices', Notice, {
  prepareCreate: (req) => ({ ...req.body, createdBy: req.user._id })
});
crudRoutes('/materials', StudyMaterial, {
  prepareCreate: (req) => ({ ...req.body, uploadedBy: req.user._id }),
  populate: ['course']
});
crudRoutes('/tests', Test, {
  prepareCreate: (req) => ({ ...req.body, createdBy: req.user._id }),
  populate: ['course']
});
crudRoutes('/results', Result, { populate: ['student', 'test'] });
crudRoutes('/certificates', Certificate, { populate: ['student', 'course'] });
crudRoutes('/leads', Lead);

export default router;
