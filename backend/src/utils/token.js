import jwt from 'jsonwebtoken';

const jwtSecret = () => process.env.JWT_SECRET || 'onevriksh-local-dev-secret';

export function signToken(user) {
  const payload = {
    sub: user.accountId || user._id,
    id: user._id,
    accountId: user.accountId || user._id,
    email: user.email,
    name: user.name,
    role: user.role
  };
  return jwt.sign(payload, jwtSecret(), { expiresIn: '7d' });
}

export function sendSession(res, user, status = 200) {
  const token = signToken(user);
  res.cookie('access_token', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 7 * 24 * 60 * 60 * 1000
  });
  return res.status(status).json({
    token,
    user: {
      id: user._id,
      accountId: user.accountId || user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      studentId: user.studentId,
      profileImage: user.profileImage
    }
  });
}
