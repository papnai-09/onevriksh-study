import express from 'express';
import db from '../db.js';

const router = express.Router();

// ── POST /api/leads/demo ─────────────────────────────────────
router.post('/demo', async (req, res) => {
  try {
    const { name, phone, email, course, message } = req.body;

    if (!name?.trim()) return res.status(400).json({ message: 'Name is required.' });
    if (!phone?.trim()) return res.status(400).json({ message: 'Phone number is required.' });

    const cleanPhone = phone.replace(/\D/g, '');
    const referenceId = `DEMO-${Date.now().toString().slice(-6)}`;

    await db.query(`
      INSERT INTO leads (reference_id, type, name, phone, email, course, message, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `, [
      referenceId,
      'demo',
      name.trim(),
      cleanPhone,
      email?.trim() || null,
      course?.trim() || null,
      message?.trim() || null,
      'New'
    ]);

    res.status(201).json({
      success: true,
      referenceId,
      message: 'Demo class booking request received! Our counsellor will call you shortly.'
    });
  } catch (err) {
    console.error('Demo lead error:', err);
    res.status(500).json({ message: 'Failed to submit demo request.' });
  }
});

// ── POST /api/leads/contact ──────────────────────────────────
router.post('/contact', async (req, res) => {
  try {
    const { name, phone, email, course, message } = req.body;

    if (!name?.trim()) return res.status(400).json({ message: 'Name is required.' });
    if (!phone?.trim()) return res.status(400).json({ message: 'Phone number is required.' });

    const cleanPhone = phone.replace(/\D/g, '');
    const referenceId = `ENQ-${Date.now().toString().slice(-6)}`;

    await db.query(`
      INSERT INTO leads (reference_id, type, name, phone, email, course, message, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `, [
      referenceId,
      'contact',
      name.trim(),
      cleanPhone,
      email?.trim() || null,
      course?.trim() || null,
      message?.trim() || null,
      'New'
    ]);

    res.status(201).json({
      success: true,
      referenceId,
      message: 'Your enquiry has been received. Our admissions team will get back to you shortly.'
    });
  } catch (err) {
    console.error('Contact lead error:', err);
    res.status(500).json({ message: 'Failed to submit enquiry.' });
  }
});

// ── GET /api/leads (Admin Only) ──────────────────────────────
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM leads ORDER BY id DESC');
    res.json({ success: true, leads: result.rows });
  } catch (err) {
    console.error('Fetch leads error:', err);
    res.status(500).json({ message: 'Failed to fetch leads.' });
  }
});

export default router;
