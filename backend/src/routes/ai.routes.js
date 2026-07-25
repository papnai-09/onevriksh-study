import express from 'express';
import { protect } from '../middleware/auth.js';

const router = express.Router();
router.use(protect);

router.post('/doubt-solver', (req, res) => {
  const question = req.body.question || 'your topic';
  res.json({
    answer: `Here is a concise learning path for "${question}": understand the core definition, see one practical example, then solve two small exercises. In live mode this endpoint can be connected to OpenAI or Azure OpenAI.`,
    sources: ['Course notes', 'Recorded lecture transcript'],
    mode: process.env.AI_API_KEY ? 'live-ready' : 'demo'
  });
});

router.post('/test-generator', (req, res) => {
  const topic = req.body.topic || 'Digital Marketing';
  res.json({
    title: `${topic} Practice Test`,
    questions: [
      { question: `What is the primary goal of ${topic}?`, options: ['Awareness and outcomes', 'Random posting', 'Only design', 'Only exams'], answer: 0 },
      { question: 'Which habit improves learning retention?', options: ['Daily revision', 'Skipping practice', 'Late submissions', 'No notes'], answer: 0 }
    ]
  });
});

router.post('/performance-analysis', (req, res) => {
  const score = Number(req.body.score || 72);
  res.json({
    score,
    summary: score >= 80 ? 'Strong performance with advanced readiness.' : 'Good base; revise weak modules and attempt timed tests.',
    nextSteps: ['Revise notes for 20 minutes daily', 'Attempt one module quiz', 'Ask mentor for doubt review']
  });
});

export default router;
