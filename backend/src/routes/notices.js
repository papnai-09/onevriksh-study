import express from 'express';
import db from '../db.js';

const router = express.Router();

// ── GET /api/notices ─────────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM notices ORDER BY id DESC');
    res.json({ success: true, notices: result.rows });
  } catch (err) {
    console.error('Fetch notices error:', err);
    res.status(500).json({ message: 'Failed to fetch notices.' });
  }
});

// ── POST /api/notices (Admin) ────────────────────────────────
router.post('/', async (req, res) => {
  try {
    const { title, date, type, text } = req.body;
    if (!title || !text) return res.status(400).json({ message: 'Title and text are required.' });

    const result = await db.query(
      'INSERT INTO notices (title, date, type, text) VALUES ($1, $2, $3, $4) RETURNING *',
      [title.trim(), date || 'Today', type || 'General', text.trim()]
    );

    res.status(201).json({ success: true, notice: result.rows[0] });
  } catch (err) {
    console.error('Add notice error:', err);
    res.status(500).json({ message: 'Failed to create notice.' });
  }
});

export default router;
