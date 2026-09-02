import express from 'express';
import db from '../db.js';

const router = express.Router();

// ── GET /api/certificates/verify/:certNumber ─────────────────
router.get('/verify/:certNumber', async (req, res) => {
  try {
    const rawNumber = (req.params.certNumber || '').trim().toUpperCase();
    if (!rawNumber) return res.status(400).json({ message: 'Certificate number is required.' });

    const result = await db.query('SELECT * FROM certificates WHERE certificate_number = $1', [rawNumber]);
    const cert = result.rows[0];

    if (!cert) {
      return res.status(404).json({
        success: false,
        verified: false,
        message: 'No verified certificate found for this certificate ID.'
      });
    }

    res.json({
      success: true,
      verified: true,
      certificate: {
        certificateNumber: cert.certificate_number,
        studentName: cert.student_name,
        studentId: cert.student_id,
        courseTitle: cert.course_title,
        grade: cert.grade,
        issuedAt: cert.issued_at,
        certificateUrl: null
      }
    });
  } catch (err) {
    console.error('Certificate verify error:', err);
    res.status(500).json({ message: 'Certificate verification failed.' });
  }
});

export default router;
