import express from 'express';
import bcrypt from 'bcryptjs';
import db from '../db.js';

const router = express.Router();

// ── POST /api/auth/register ──────────────────────────────────
router.post('/register', async (req, res) => {
  try {
    const { name, phone, password, course } = req.body;

    if (!name?.trim()) return res.status(400).json({ message: 'Name is required.' });
    if (!phone?.trim()) return res.status(400).json({ message: 'Phone number is required.' });
    if (!password) return res.status(400).json({ message: 'Password is required.' });
    if (password.length < 6) return res.status(400).json({ message: 'Password must be at least 6 characters.' });

    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) return res.status(400).json({ message: 'Enter a valid 10-digit mobile number.' });

    const existing = await db.query('SELECT id FROM users WHERE phone = $1', [cleanPhone]);
    if (existing.rows.length > 0) {
      return res.status(409).json({ message: 'This mobile number is already registered. Please login.' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const result = await db.query(
      'INSERT INTO users (name, phone, password, role, course) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, phone, role, course, created_at',
      [name.trim(), cleanPhone, passwordHash, 'student', course || null]
    );

    const user = result.rows[0];
    req.session.userId = user.id;
    res.status(201).json({ success: true, user });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: 'Registration failed. Please try again.' });
  }
});

// ── POST /api/auth/login ─────────────────────────────────────
router.post('/login', async (req, res) => {
  try {
    const { phone, password } = req.body;

    if (!phone?.trim()) return res.status(400).json({ message: 'Phone number is required.' });
    if (!password) return res.status(400).json({ message: 'Password is required.' });

    const cleanPhone = phone.replace(/\D/g, '');
    const result = await db.query('SELECT * FROM users WHERE phone = $1', [cleanPhone]);
    const user = result.rows[0];

    if (!user) return res.status(401).json({ message: 'No account found with this mobile number.' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Incorrect password. Please try again.' });

    req.session.userId = user.id;

    const { password: _pw, ...safeUser } = user;
    res.json({ success: true, user: safeUser });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Login failed. Please try again.' });
  }
});

// ── POST /api/auth/reset-password ────────────────────────────
router.post('/reset-password', async (req, res) => {
  try {
    const { phone, password } = req.body;

    if (!phone?.trim()) return res.status(400).json({ message: 'Phone number is required.' });
    if (!password) return res.status(400).json({ message: 'New password is required.' });
    if (password.length < 6) return res.status(400).json({ message: 'Password must be at least 6 characters.' });

    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) return res.status(400).json({ message: 'Enter a valid 10-digit mobile number.' });

    const result = await db.query('SELECT id, name, phone, role, course, created_at FROM users WHERE phone = $1', [cleanPhone]);
    const user = result.rows[0];

    if (!user) return res.status(404).json({ message: 'No account found with this mobile number.' });

    const passwordHash = await bcrypt.hash(password, 10);
    await db.query('UPDATE users SET password = $1 WHERE id = $2', [passwordHash, user.id]);

    req.session.userId = user.id;
    res.json({ success: true, message: 'Password has been updated successfully.', user });
  } catch (err) {
    console.error('Reset password error:', err);
    res.status(500).json({ message: 'Failed to reset password. Please try again.' });
  }
});

// ── GET /api/auth/me ─────────────────────────────────────────
router.get('/me', async (req, res) => {
  try {
    if (!req.session?.userId) return res.status(401).json({ message: 'Not authenticated.' });

    const result = await db.query(
      'SELECT id, name, phone, role, course, created_at FROM users WHERE id = $1',
      [req.session.userId]
    );

    const user = result.rows[0];
    if (!user) return res.status(401).json({ message: 'Session invalid.' });

    res.json({ success: true, user });
  } catch (err) {
    console.error('Me error:', err);
    res.status(500).json({ message: 'Failed to check session.' });
  }
});

// ── POST /api/auth/logout ────────────────────────────────────
router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.json({ success: true });
  });
});

export default router;
