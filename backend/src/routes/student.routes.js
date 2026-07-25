import express from 'express';
import { protect } from '../middleware/auth.js';
import { Attendance, Certificate, Enrollment, Notice, Payment, Result, StudyMaterial } from '../models/index.js';

const router = express.Router();
router.use(protect);

router.get('/overview', async (req, res, next) => {
  try {
    const [enrollments, attendance, payments, notices, results, certificates] = await Promise.all([
      Enrollment.find({ student: req.user._id }).populate('course'),
      Attendance.find({ student: req.user._id }).populate('course').sort({ date: -1 }).limit(50),
      Payment.find({ student: req.user._id }).populate('course').sort({ createdAt: -1 }),
      Notice.find({ published: true }).sort({ publishedAt: -1 }).limit(5),
      Result.find({ student: req.user._id }).populate('test').sort({ submittedAt: -1 }).limit(10),
      Certificate.find({ student: req.user._id }).populate('course')
    ]);
    const present = attendance.filter((item) => item.status === 'present' || item.status === 'late').length;
    const attendancePercentage = attendance.length ? Math.round((present / attendance.length) * 100) : 0;
    res.json({ enrollments, attendance, attendancePercentage, payments, notices, results, certificates });
  } catch (error) {
    next(error);
  }
});

router.get('/materials', async (req, res, next) => {
  try {
    const enrollments = await Enrollment.find({ student: req.user._id }).select('course');
    const materials = await StudyMaterial.find({ course: { $in: enrollments.map((item) => item.course) } }).populate('course');
    res.json({ materials });
  } catch (error) {
    next(error);
  }
});

router.patch('/progress/:enrollmentId', async (req, res, next) => {
  try {
    const enrollment = await Enrollment.findOneAndUpdate(
      { _id: req.params.enrollmentId, student: req.user._id },
      { progress: req.body.progress, completedLessons: req.body.completedLessons },
      { new: true, runValidators: true }
    );
    if (!enrollment) return res.status(404).json({ message: 'Enrollment not found' });
    return res.json({ enrollment });
  } catch (error) {
    return next(error);
  }
});

export default router;
