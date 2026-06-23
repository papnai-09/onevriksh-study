import express from 'express';
import { authorize, protect } from '../middleware/auth.js';
import {
  Attendance,
  Course,
  Enrollment,
  Notice,
  Payment,
  Result,
  StudyMaterial,
  Test,
  User
} from '../models/index.js';

const router = express.Router();
router.use(protect, authorize('admin'));

router.get('/stats', async (_req, res, next) => {
  try {
    const [totalStudents, activeStudents, totalCourses, paidPayments, attendanceToday, enrollments] = await Promise.all([
      User.countDocuments({ role: 'student' }),
      User.countDocuments({ role: 'student', active: true }),
      Course.countDocuments(),
      Payment.find({ status: 'paid' }),
      Attendance.countDocuments({ date: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) } }),
      Enrollment.countDocuments()
    ]);
    const totalRevenue = paidPayments.reduce((sum, item) => sum + item.amount, 0);
    res.json({ totalStudents, activeStudents, totalCourses, totalRevenue, attendanceToday, enrollments });
  } catch (error) {
    next(error);
  }
});

function crudRoutes(path, Model, options = {}) {
  router.get(path, async (_req, res, next) => {
    try {
      const items = await Model.find().sort({ createdAt: -1 }).limit(200);
      res.json({ items });
    } catch (error) {
      next(error);
    }
  });
  router.post(path, async (req, res, next) => {
    try {
      const item = await Model.create(options.prepareCreate ? options.prepareCreate(req) : req.body);
      res.status(201).json({ item });
    } catch (error) {
      next(error);
    }
  });
  router.patch(`${path}/:id`, async (req, res, next) => {
    try {
      const item = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!item) return res.status(404).json({ message: 'Record not found' });
      return res.json({ item });
    } catch (error) {
      return next(error);
    }
  });
  router.delete(`${path}/:id`, async (req, res, next) => {
    try {
      const item = await Model.findByIdAndDelete(req.params.id);
      if (!item) return res.status(404).json({ message: 'Record not found' });
      return res.json({ message: 'Deleted' });
    } catch (error) {
      return next(error);
    }
  });
}

crudRoutes('/students', User, { prepareCreate: (req) => ({ ...req.body, role: 'student' }) });
crudRoutes('/courses', Course);
crudRoutes('/attendance', Attendance, { prepareCreate: (req) => ({ ...req.body, markedBy: req.user._id }) });
crudRoutes('/payments', Payment);
crudRoutes('/notices', Notice, { prepareCreate: (req) => ({ ...req.body, createdBy: req.user._id }) });
crudRoutes('/materials', StudyMaterial, { prepareCreate: (req) => ({ ...req.body, uploadedBy: req.user._id }) });
crudRoutes('/tests', Test, { prepareCreate: (req) => ({ ...req.body, createdBy: req.user._id }) });
crudRoutes('/results', Result);

export default router;
