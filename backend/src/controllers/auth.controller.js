import crypto from 'crypto';
import { User } from '../models/index.js';
import { sendSession } from '../utils/token.js';

/**
 * Register a new student account locally
 */
export async function register(req, res, next) {
  try {
    const { name, email, password, phone, studentId } = req.body;

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email address already exists. Please log in.'
      });
    }

    const generatedStudentId = studentId || `OVS${Date.now().toString().slice(-6)}`;

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      phone: phone || '',
      role: 'student',
      studentId: generatedStudentId,
      active: true,
      lastLoginAt: new Date()
    });

    return sendSession(res, user, 201, 'Account created successfully');
  } catch (error) {
    next(error);
  }
}

/**
 * Log in with email and password
 */
export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    // Find user with password field included
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    if (!user.active) {
      return res.status(403).json({
        success: false,
        message: 'Your account has been deactivated. Please contact institute support.'
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    user.lastLoginAt = new Date();
    await user.save();

    return sendSession(res, user, 200, 'Logged in successfully');
  } catch (error) {
    next(error);
  }
}

/**
 * Get current session profile
 */
export async function getSession(req, res) {
  if (!req.user) {
    return res.status(401).json({ success: false, message: 'Unauthenticated' });
  }
  return res.json({
    success: true,
    authenticated: true,
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      phone: req.user.phone,
      role: req.user.role,
      studentId: req.user.studentId,
      profileImage: req.user.profileImage,
      address: req.user.address,
      dateOfBirth: req.user.dateOfBirth,
      active: req.user.active,
      createdAt: req.user.createdAt
    }
  });
}

/**
 * Log out and clear session cookie
 */
export async function logout(req, res) {
  const isProd = process.env.NODE_ENV === 'production';
  res.clearCookie('access_token', {
    httpOnly: true,
    sameSite: isProd ? 'none' : 'lax',
    secure: isProd
  });
  return res.json({
    success: true,
    message: 'Logged out successfully'
  });
}

/**
 * Change password for authenticated user
 */
export async function changePassword(req, res, next) {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id).select('+password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Current password is incorrect' });
    }

    user.password = newPassword;
    await user.save();

    return res.json({
      success: true,
      message: 'Password updated successfully'
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Request password reset token
 */
export async function forgotPassword(req, res, next) {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      // Do not reveal email existence
      return res.json({
        success: true,
        message: 'If an account exists with that email, password reset instructions have been generated.'
      });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    user.passwordResetToken = hashedToken;
    user.passwordResetExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    await user.save();

    return res.json({
      success: true,
      message: 'Password reset link generated.',
      // In production, token is sent via email; for dev/demo we return token or test URL
      resetToken: process.env.NODE_ENV === 'production' ? undefined : resetToken
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Reset password with token
 */
export async function resetPassword(req, res, next) {
  try {
    const { token, password } = req.body;
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Password reset token is invalid or has expired.'
      });
    }

    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    user.lastLoginAt = new Date();
    await user.save();

    return sendSession(res, user, 200, 'Password has been reset successfully');
  } catch (error) {
    next(error);
  }
}

/**
 * Update user profile
 */
export async function updateProfile(req, res, next) {
  try {
    const allowed = ['name', 'phone', 'address', 'dateOfBirth', 'profileImage'];
    allowed.forEach((field) => {
      if (req.body[field] !== undefined) req.user[field] = req.body[field];
    });

    await req.user.save();

    return res.json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        phone: req.user.phone,
        role: req.user.role,
        studentId: req.user.studentId,
        profileImage: req.user.profileImage,
        address: req.user.address,
        dateOfBirth: req.user.dateOfBirth
      }
    });
  } catch (error) {
    next(error);
  }
}
