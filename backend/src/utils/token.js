import jwt from 'jsonwebtoken';

const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('FATAL: JWT_SECRET environment variable must be set in production!');
    }
    return 'onevriksh-local-dev-jwt-secret-key-32chars!';
  }
  return secret;
};

export function signToken(user) {
  const payload = {
    id: user._id.toString(),
    sub: user._id.toString(),
    email: user.email,
    name: user.name,
    role: user.role
  };
  return jwt.sign(payload, getJwtSecret(), {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });
}

export function sendSession(res, user, statusCode = 200, message = 'Authenticated successfully') {
  const token = signToken(user);
  
  const isProd = process.env.NODE_ENV === 'production';
  res.cookie('access_token', token, {
    httpOnly: true,
    sameSite: isProd ? 'none' : 'lax',
    secure: isProd,
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });

  return res.status(statusCode).json({
    success: true,
    message,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      studentId: user.studentId,
      profileImage: user.profileImage,
      active: user.active
    }
  });
}
