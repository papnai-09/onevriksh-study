import crypto from 'crypto';
import express from 'express';
import { protect } from '../middleware/auth.js';
import { User } from '../models/index.js';
import { sendSession } from '../utils/token.js';

const router = express.Router();

router.post('/register', async (req, res, next) => {
  try {
    const { name, email, phone, password, role = 'student' } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: 'Email already registered' });
    const user = await User.create({
      name,
      email,
      phone,
      password,
      role: role === 'admin' ? 'admin' : 'student',
      studentId: role === 'admin' ? undefined : `OVS${Date.now().toString().slice(-6)}`
    });
    return sendSession(res, user, 201);
  } catch (error) {
    return next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    return sendSession(res, user);
  } catch (error) {
    return next(error);
  }
});

router.post('/logout', (_req, res) => {
  res.clearCookie('access_token');
  res.json({ message: 'Logged out' });
});

router.get('/me', protect, (req, res) => {
  res.json({ user: req.user });
});

router.post('/forgot-password', async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      user.resetPasswordToken = crypto.randomBytes(24).toString('hex');
      user.resetPasswordExpires = new Date(Date.now() + 30 * 60 * 1000);
      await user.save();
    }
    res.json({ message: 'If the account exists, reset instructions have been generated.' });
  } catch (error) {
    next(error);
  }
});

router.post('/reset-password', async (req, res, next) => {
  try {
    const user = await User.findOne({
      resetPasswordToken: req.body.token,
      resetPasswordExpires: { $gt: new Date() }
    });
    if (!user) return res.status(400).json({ message: 'Invalid or expired reset token' });
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    return sendSession(res, user);
  } catch (error) {
    return next(error);
  }
});

router.patch('/profile', protect, async (req, res, next) => {
  try {
    const allowed = ['name', 'phone', 'address', 'dateOfBirth', 'profileImage'];
    allowed.forEach((field) => {
      if (req.body[field] !== undefined) req.user[field] = req.body[field];
    });
    await req.user.save();
    res.json({ user: req.user });
  } catch (error) {
    next(error);
  }
});

router.patch('/change-password', protect, async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('+password');
    if (!(await user.comparePassword(req.body.currentPassword))) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }
    user.password = req.body.newPassword;
    await user.save();
    res.json({ message: 'Password updated' });
  } catch (error) {
    next(error);
  }
});

export default router;
