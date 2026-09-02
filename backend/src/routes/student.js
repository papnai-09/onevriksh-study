import express from 'express';
import db from '../db.js';

const router = express.Router();

// ── GET /api/student/overview ────────────────────────────────
router.get('/overview', async (req, res) => {
  try {
    let studentName = 'Student';
    let courseName = 'Digital Marketing Advanced';

    if (req.session?.userId) {
      const userRes = await db.query('SELECT name, course FROM users WHERE id = $1', [req.session.userId]);
      const user = userRes.rows[0];
      if (user) {
        studentName = user.name;
        if (user.course) courseName = user.course;
      }
    }

    const initials = studentName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'ST';

    // Fetch enrolled course details if exists
    const courseRes = await db.query('SELECT * FROM courses WHERE title ILIKE $1 OR slug ILIKE $2 LIMIT 1', [
      `%${courseName}%`,
      `%${courseName.toLowerCase().replace(/\s+/g, '-')}%`
    ]);
    const courseDetails = courseRes.rows[0];

    const noticesRes = await db.query('SELECT * FROM notices ORDER BY id DESC LIMIT 3');

    res.json({
      success: true,
      name: studentName,
      initials,
      course: courseName,
      attendance: 88,
      progress: 64,
      totalFees: courseDetails?.fee || 28999,
      paidFees: 20000,
      nextClass: { title: 'Google Ads: Search Campaigns', time: 'Today, 4:00 PM', room: 'Lab 2' },
      attendanceHistory: [
        { date: '21 Jun 2026', subject: 'SEO Strategy', status: 'Present' },
        { date: '19 Jun 2026', subject: 'Content Marketing', status: 'Present' },
        { date: '17 Jun 2026', subject: 'Campaign Planning', status: 'Late' },
        { date: '14 Jun 2026', subject: 'Market Research', status: 'Present' }
      ],
      results: [
        { test: 'SEO Foundations', score: 88, rank: 4, classAverage: 72 },
        { test: 'Content Strategy', score: 82, rank: 7, classAverage: 69 },
        { test: 'Marketing Basics', score: 91, rank: 3, classAverage: 74 }
      ],
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
