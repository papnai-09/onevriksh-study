import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';

const getJwtSecret = () => {
  return process.env.JWT_SECRET || 'onevriksh-local-dev-jwt-secret-key-32chars!';
};

export async function protect(req, res, next) {
  try {
    let token = null;

    if (req.cookies?.access_token) {
      token = req.cookies.access_token;
    } else if (req.headers.authorization?.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required. Please log in to continue.'
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, getJwtSecret());
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: 'Session expired or invalid. Please log in again.'
      });
    }

    const userId = decoded.id || decoded.sub;
    if (!userId) {
      return res.status(401).json({ success: false, message: 'Invalid session token payload' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Account not found. Please log in again.' });
    }

    if (!user.active) {
      return res.status(403).json({ success: false, message: 'Account is inactive. Please contact support.' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Authentication failed' });
  }
}

export const authorize = (...roles) => (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ success: false, message: 'Authentication required' });
  }
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({
      success: false,
      message: 'Access denied: You do not have permission to perform this action.'
    });
  }
  next();
};
