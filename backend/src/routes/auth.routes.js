import express from 'express';
import rateLimit from 'express-rate-limit';
import {
  changePassword,
  forgotPassword,
  getSession,
  login,
  logout,
  register,
  resetPassword,
  updateProfile
} from '../controllers/auth.controller.js';
import { protect } from '../middleware/auth.js';
import { validateBody } from '../middleware/validate.js';
import {
  changePasswordSchema,
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
  updateProfileSchema
} from '../utils/validators.js';

const router = express.Router();

// Strict rate limiter for auth endpoints (brute-force defense)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // 20 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many authentication attempts from this IP. Please try again after 15 minutes.'
  }
});

// Local Registration
router.post('/register', authLimiter, validateBody(registerSchema), register);

// Local Login
router.post('/login', authLimiter, validateBody(loginSchema), login);

// Session Verification
router.get('/session', protect, getSession);
router.get('/me', protect, getSession);

// Logout
router.post('/logout', logout);

// Password Management
router.post('/change-password', protect, validateBody(changePasswordSchema), changePassword);
router.post('/forgot-password', authLimiter, validateBody(forgotPasswordSchema), forgotPassword);
router.post('/reset-password', authLimiter, validateBody(resetPasswordSchema), resetPassword);

// Profile Update
router.patch('/profile', protect, validateBody(updateProfileSchema), updateProfile);

export default router;
