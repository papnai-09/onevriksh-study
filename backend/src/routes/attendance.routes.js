import express from 'express';
import QRCode from 'qrcode';
import { authorize, protect } from '../middleware/auth.js';
import { Attendance } from '../models/index.js';

const router = express.Router();

router.post('/qr-session', protect, authorize('admin'), async (req, res, next) => {
  try {
    const sessionCode = `OVS-${Date.now()}`;
    const payload = JSON.stringify({ sessionCode, courseId: req.body.courseId, expiresAt: Date.now() + 10 * 60 * 1000 });
    const qr = await QRCode.toDataURL(payload);
    res.status(201).json({ sessionCode, qr, expiresInMinutes: 10 });
  } catch (error) {
    next(error);
  }
});

router.post('/scan', protect, async (req, res, next) => {
  try {
    const attendance = await Attendance.create({
      student: req.user._id,
      course: req.body.courseId,
      status: 'present',
      method: 'qr',
      sessionCode: req.body.sessionCode
    });
    res.status(201).json({ attendance, message: 'Attendance marked' });
  } catch (error) {
    next(error);
  }
});

export default router;
