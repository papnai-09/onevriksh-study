import express from 'express';
import db from '../db.js';

const router = express.Router();

function parseCourse(row) {
  if (!row) return null;
  return {
    ...row,
    benefits: typeof row.benefits === 'string' ? JSON.parse(row.benefits) : row.benefits || [],
    curriculum: typeof row.curriculum === 'string' ? JSON.parse(row.curriculum) : row.curriculum || [],
    trainerRole: row.trainer_role
  };
}

// ── GET /api/courses ─────────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;
    let queryText = 'SELECT * FROM courses WHERE 1=1';
    const params = [];

    if (category && category !== 'All') {
      params.push(category);
      queryText += ` AND category = $${params.length}`;
    }

    if (search && search.trim()) {
      params.push(`%${search.trim()}%`);
      const pIdx = params.length;
      queryText += ` AND (title ILIKE $${pIdx} OR description ILIKE $${pIdx} OR category ILIKE $${pIdx})`;
    }

    queryText += ' ORDER BY id ASC';
    const result = await db.query(queryText, params);
    const courses = result.rows.map(parseCourse);

    res.json({ success: true, courses });
  } catch (err) {
    console.error('Fetch courses error:', err);
    res.status(500).json({ message: 'Failed to fetch courses.' });
  }
});

// ── GET /api/courses/:slug ───────────────────────────────────
router.get('/:slug', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM courses WHERE slug = $1', [req.params.slug]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Course not found.' });
    }
    res.json({ success: true, course: parseCourse(result.rows[0]) });
  } catch (err) {
    console.error('Fetch course error:', err);
    res.status(500).json({ message: 'Failed to fetch course.' });
  }
});

export default router;
