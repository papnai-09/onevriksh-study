import express from 'express';
import db from '../db.js';

const router = express.Router();

// ── GET /api/student/overview ────────────────────────────────
router.get('/overview', async (req, res) => {
  try {
    if (!req.session?.userId) {
      return res.status(401).json({ message: 'Please sign in to access student dashboard.' });
    }

    const userRes = await db.query('SELECT name, phone, course, created_at FROM users WHERE id = $1', [req.session.userId]);
    const user = userRes.rows[0];

    if (!user) {
      return res.status(401).json({ message: 'User not found.' });
    }

    const studentName = user.name;
    const courseName = user.course || 'Career Program';
    const initials = studentName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'ST';

    // Fetch enrolled course details
    const courseRes = await db.query('SELECT * FROM courses WHERE title ILIKE $1 OR slug ILIKE $2 LIMIT 1', [
      `%${courseName}%`,
      `%${courseName.toLowerCase().replace(/\s+/g, '-')}%`
    ]);
    const courseDetails = courseRes.rows[0];

    const noticesRes = await db.query('SELECT * FROM notices ORDER BY id DESC LIMIT 5');

    res.json({
      success: true,
      name: studentName,
      initials,
      phone: user.phone,
      course: courseName,
      attendance: 100,
      progress: 0,
      totalFees: courseDetails?.fee || 18999,
      paidFees: 0,
      nextClass: { title: `${courseName}: Classroom Orientation`, time: 'Batch Schedule', room: 'Room 101' },
      attendanceHistory: [],
      results: [],
      notices: noticesRes.rows
    });
  } catch (err) {
    console.error('Student overview error:', err);
    res.status(500).json({ message: 'Failed to fetch student overview.' });
  }
});

// ── GET /api/student/materials ───────────────────────────────
router.get('/materials', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM materials ORDER BY id DESC');
    res.json({ success: true, materials: result.rows });
  } catch (err) {
    console.error('Student materials error:', err);
    res.status(500).json({ message: 'Failed to fetch materials.' });
  }
});

export default router;
