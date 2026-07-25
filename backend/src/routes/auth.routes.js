import express from 'express';
import { handleCallback, getSession, handleLogout, initiateLogin, refreshToken } from '../controllers/auth.controller.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Initiate OAuth 2.1 authorization PKCE flow
router.get('/login', initiateLogin);
router.post('/login', initiateLogin);

// OAuth 2.1 Code Exchange & User Synchronization Callback (GET & POST)
router.get('/callback', handleCallback);
router.post('/callback', handleCallback);

// Session check endpoints
router.get('/session', protect, getSession);
router.get('/me', protect, (req, res) => res.json({ authenticated: true, user: req.user }));

// Single Logout Endpoint
router.post('/logout', handleLogout);

// Token Refresh
router.post('/refresh', protect, refreshToken);

// Deprecated local register route (Redirects client to accounts.onevriksh.in)
router.post('/register', (req, res) => {
  const idpUrl = process.env.ACCOUNTS_IDP_URL || 'https://accounts.onevriksh.in';
  return res.status(308).json({
    message: 'Local registration has been migrated to accounts.onevriksh.in',
    registerUrl: `${idpUrl}/register`
  });
});

// Profile updating endpoint for authenticated users
router.patch('/profile', protect, async (req, res, next) => {
  try {
    const allowed = ['name', 'phone', 'address', 'dateOfBirth', 'profileImage'];
    allowed.forEach((field) => {
      if (req.body[field] !== undefined) req.user[field] = req.body[field];
    });
    if (typeof req.user.save === 'function') {
      await req.user.save();
    }
    res.json({ user: req.user });
  } catch (error) {
    next(error);
  }
});

export default router;
