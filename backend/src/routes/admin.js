import express from 'express';
import db from '../db.js';

const router = express.Router();

// ── GET /api/admin/stats ─────────────────────────────────────
router.get('/stats', async (req, res) => {
  try {
    const studentRes = await db.query("SELECT COUNT(*) as count FROM users WHERE role = 'student'");
    const courseRes = await db.query('SELECT COUNT(*) as count FROM courses');
    const leadRes = await db.query('SELECT COUNT(*) as count FROM leads');

    const studentCount = parseInt(studentRes.rows[0].count, 10);
    const courseCount = parseInt(courseRes.rows[0].count, 10);
    const leadCount = parseInt(leadRes.rows[0].count, 10);

    const stats = [
      { label: 'Total students', value: `${studentCount}`, delta: 'Registered', tone: 'blue' },
      { label: 'Active courses', value: `${courseCount}`, delta: 'Available', tone: 'green' },
      { label: 'New inquiries', value: `${leadCount}`, delta: 'Leads', tone: 'magenta' },
      { label: 'System status', value: '100%', delta: 'Online', tone: 'amber' }
    ];

    const recentRes = await db.query(`
      SELECT name, course, created_at as joined, 'Active' as status, 'Paid' as fees
      FROM users
      ORDER BY id DESC
      LIMIT 5
    `);

    res.json({ success: true, stats, recentStudents: recentRes.rows });
  } catch (err) {
    console.error('Admin stats error:', err);
    res.status(500).json({ message: 'Failed to fetch admin statistics.' });
  }
});

// ── GET /api/admin/students ──────────────────────────────────
router.get('/students', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT id, name, phone, role, course, created_at
      FROM users
      ORDER BY id DESC
    `);
    res.json({ success: true, students: result.rows });
  } catch (err) {
    console.error('Admin students error:', err);
    res.status(500).json({ message: 'Failed to fetch students list.' });
  }
});

export default router;
