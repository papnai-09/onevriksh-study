import express from 'express';
import cors from 'cors';
import session from 'express-session';
import authRouter from './routes/auth.js';
import coursesRouter from './routes/courses.js';
import leadsRouter from './routes/leads.js';
import noticesRouter from './routes/notices.js';
import certificatesRouter from './routes/certificates.js';
import studentRouter from './routes/student.js';
import adminRouter from './routes/admin.js';

const app = express();
const PORT = process.env.PORT || 4000;

// ── Middleware ───────────────────────────────────────────────
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET || 'onevriksh-secret-key-change-in-prod',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,       // set true in production with HTTPS
    maxAge: 7 * 24 * 60 * 60 * 1000  // 7 days
  }
}));

// ── Routes ───────────────────────────────────────────────────
app.use('/api/auth', authRouter);
app.use('/api/courses', coursesRouter);
app.use('/api/leads', leadsRouter);
app.use('/api/notices', noticesRouter);
app.use('/api/certificates', certificatesRouter);
app.use('/api/student', studentRouter);
app.use('/api/admin', adminRouter);

app.get('/health', (req, res) => res.json({ status: 'ok' }));

import db from './db.js';

// ── Start ────────────────────────────────────────────────────
async function startServer() {
  await db.initDb();
  app.listen(PORT, () => {
    console.log(`Backend running at http://localhost:${PORT} connected to Neon Cloud PostgreSQL`);
  });
}

startServer();
