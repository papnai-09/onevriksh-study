import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';

export async function protect(req, res, next) {
  try {
    const bearer = req.headers.authorization?.startsWith('Bearer ')
      ? req.headers.authorization.split(' ')[1]
      : null;
    const token = req.cookies?.access_token || bearer;

    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const secret = process.env.JWT_SECRET || 'onevriksh-local-dev-secret';
    let decoded;
    try {
      decoded = jwt.verify(token, secret);
    } catch (jwtErr) {
      return res.status(401).json({ message: 'Invalid or expired session' });
    }

    // Static dev mock admin handling
    if (decoded.sub === '000000000000000000000001' || decoded.id === '000000000000000000000001') {
      req.user = {
        _id: '000000000000000000000001',
        id: '000000000000000000000001',
        accountId: '000000000000000000000001',
        name: 'Local Admin',
        email: 'admin@onevriksh.com',
        role: 'admin',
        active: true,
        save: async function () { return this; }
      };
      return next();
    }

    // Static dev mock student handling
    if (decoded.sub === '000000000000000000000002' || decoded.id === '000000000000000000000002') {
      req.user = {
        _id: '000000000000000000000002',
        id: '000000000000000000000002',
        accountId: '000000000000000000000002',
        name: 'Local Student',
        email: 'student@onevriksh.com',
        role: 'student',
        studentId: 'OVS999999',
        active: true,
        save: async function () { return this; }
      };
      return next();
    }

    if (process.env.MONGODB_URI) {
      // Find user by _id or accountId
      let user = await User.findById(decoded.sub);
      if (!user) {
        user = await User.findOne({ accountId: decoded.sub });
      }
      if (!user || !user.active) {
        return res.status(401).json({ message: 'Account unavailable or inactive' });
      }
      req.user = user;
    } else {
      // In-memory fallback representation
      req.user = {
        _id: decoded.sub,
        id: decoded.sub,
        accountId: decoded.sub,
        email: decoded.email || `${decoded.sub}@user.onevriksh.in`,
        name: decoded.name || 'Learner',
        role: decoded.role || 'student',
        active: true
      };
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Authentication required' });
  }
}

export const authorize = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return res.status(403).json({ message: 'Insufficient permission' });
  }
  next();
};
