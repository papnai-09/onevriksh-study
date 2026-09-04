import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('DATABASE_URL is not defined in .env');
}

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

// Helper query function
export const query = (text, params) => pool.query(text, params);

// ── INITIALIZE DATABASE TABLES & SEEDS ─────────────────────────
export async function initDb() {
  const client = await pool.connect();
  try {
    console.log('Connected to Neon PostgreSQL Database! Initializing tables...');

    // 1. Create Tables
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id         SERIAL PRIMARY KEY,
        name       TEXT    NOT NULL,
        phone      TEXT    NOT NULL UNIQUE,
        password   TEXT    NOT NULL,
        role       TEXT    NOT NULL DEFAULT 'student',
        course     TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS courses (
        id             SERIAL PRIMARY KEY,
        slug           TEXT    NOT NULL UNIQUE,
        title          TEXT    NOT NULL,
        category       TEXT    NOT NULL,
        duration       TEXT    NOT NULL,
        fee            INTEGER NOT NULL,
        rating         NUMERIC NOT NULL DEFAULT 4.9,
        students       INTEGER NOT NULL DEFAULT 0,
        level          TEXT    NOT NULL,
        image          TEXT,
        description    TEXT    NOT NULL,
        trainer        TEXT,
        trainer_role   TEXT,
        benefits       JSONB,
        curriculum     JSONB,
        created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS leads (
        id           SERIAL PRIMARY KEY,
        reference_id TEXT    NOT NULL UNIQUE,
        type         TEXT    NOT NULL, -- 'demo' | 'contact'
        name         TEXT    NOT NULL,
        phone        TEXT    NOT NULL,
        email        TEXT,
        course       TEXT,
        message      TEXT,
        status       TEXT    NOT NULL DEFAULT 'New',
        created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS notices (
        id         SERIAL PRIMARY KEY,
        title      TEXT    NOT NULL,
        date       TEXT    NOT NULL,
        type       TEXT    NOT NULL,
        text       TEXT    NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS certificates (
        id                 SERIAL PRIMARY KEY,
        certificate_number TEXT    NOT NULL UNIQUE,
        student_name       TEXT    NOT NULL,
        student_id         TEXT    NOT NULL,
        course_title       TEXT    NOT NULL,
        grade              TEXT    NOT NULL,
        issued_at          TEXT    NOT NULL,
        created_at         TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS materials (
        id          SERIAL PRIMARY KEY,
        course_slug TEXT,
        title       TEXT    NOT NULL,
        type        TEXT    NOT NULL, -- 'PDF' | 'ZIP' | 'DOC'
        size        TEXT,
        created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    // 2. Admin Seed
    const adminCheck = await client.query('SELECT id FROM users WHERE phone = $1', ['9999999999']);
    if (adminCheck.rows.length === 0) {
      const hash = await bcrypt.hash('admin123', 10);
      await client.query(
        'INSERT INTO users (name, phone, password, role, course) VALUES ($1, $2, $3, $4, $5)',
        ['ONEVRIKSH Admin', '9999999999', hash, 'admin', 'Administration']
      );
      console.log('Seeded default admin (9999999999 / admin123)');
    }

    // 3. Courses Seed & Sync
    const seedCourses = [
        {
          slug: 'digital-marketing-foundation',
          title: 'Digital Marketing Foundation',
          category: 'Marketing',
          duration: '4 Months',
          fee: 27000,
          rating: 4.9,
          students: 340,
          level: 'Beginner',
          image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
          description: 'Master digital marketing fundamentals, search engine optimization basics, Google and social media marketing essentials, and keyword research.',
          trainer: 'Rohit Sharma',
          trainerRole: 'Digital Marketing Specialist',
          benefits: JSON.stringify(['Live practical briefs', 'Hands-on SEO & SEM tools', 'Foundation Skill Certificate']),
          curriculum: JSON.stringify([
            'Digital Marketing Fundamentals & Digital Landscape',
            'Search Engine Optimization (SEO) Core Basics',
            'Search Engine Marketing (Google Ads) Introduction',
            'Social Media Marketing & Content Creation Basics',
            'Keyword Research & Analytics Foundations'
          ])
        },
        {
          slug: 'digital-marketing-advanced',
          title: 'Digital Marketing Advanced',
          category: 'Marketing',
          duration: '8 Months',
          fee: 54000,
          rating: 4.9,
          students: 420,
          level: 'Intermediate',
          image: 'https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&w=800&q=80',
          description: 'Deep-dive into technical SEO audits, Google Ads bidding, Meta Ads Manager, GA4 analytics setup, and multi-channel campaign management.',
          trainer: 'Rohit Sharma',
          trainerRole: 'Performance Marketing Lead',
          benefits: JSON.stringify(['Google & Meta Ads Manager mastery', 'GA4 & Search Console implementation', 'Placement assistance & mock interviews']),
          curriculum: JSON.stringify([
            'Technical SEO, Site Audits & Backlink Architecture',
            'Google Ads Campaign Architecture & Bidding Strategy',
            'Meta Advertising (Facebook & Instagram Ads Manager)',
            'Web Analytics & GA4 Measurement Setup',
            'Email Marketing Automation & Lead Funnels'
          ])
        },
        {
          slug: 'digital-marketing-mastery',
          title: 'Digital Marketing Mastery',
          category: 'Marketing',
          duration: '12 Months',
          fee: 81000,
          rating: 4.9,
          students: 510,
          level: 'Advanced',
          image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
          description: 'Full-stack performance marketing, conversion rate optimization (CRO), marketing automation, freelancing & agency workflows, and capstone project defense.',
          trainer: 'Rohit Sharma',
          trainerRole: 'Chief Marketing Consultant',
          benefits: JSON.stringify(['Full-stack marketing leadership', 'Portfolio capstone defense', 'Dedicated 100% placement support*']),
          curriculum: JSON.stringify([
            'Full-Stack Digital Marketing Strategy & Execution',
            'Performance Marketing & CRO (Conversion Rate Optimization)',
            'Marketing Automation, Omnichannel & Lifecycle Funnels',
            'Freelancing, Client Acquisition & Consulting Workflows',
            'Comprehensive Capstone Portfolio Defense'
          ])
        },
        {
          slug: 'graphic-design',
          title: 'Graphic Design Mastery',
          category: 'Design',
          duration: '5 Months',
          fee: 24999,
          rating: 4.8,
          students: 286,
          level: 'Beginner',
          image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
          description: 'Master visual thinking, branding and industry tools through a portfolio-first studio curriculum.',
          trainer: 'Meera Kapoor',
          trainerRole: 'Brand and Visual Designer',
          benefits: JSON.stringify(['Adobe tool mastery', 'Professional portfolio', 'Agency workflow practice']),
          curriculum: JSON.stringify(['Design principles', 'Photoshop and image making', 'Illustrator and identity', 'Layouts and typography', 'Portfolio presentation'])
        },
        {
          slug: 'french-language',
          title: 'French Language Program',
          category: 'Languages',
          duration: '4 Months',
          fee: 84000,
          rating: 4.9,
          students: 198,
          level: 'Beginner',
          image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
          description: 'Speak French with confidence through interactive classes, practical conversation and DELF-focused preparation.',
          trainer: 'Ananya Verma',
          trainerRole: 'DELF Certified French Trainer',
          benefits: JSON.stringify(['DELF exam preparation', 'Conversation labs', 'Small batch mentoring']),
          curriculum: JSON.stringify(['A1 foundations', 'Everyday conversation', 'Grammar in context', 'Listening and pronunciation', 'DELF mock assessment'])
        },
        {
          slug: 'german-language',
          title: 'German Language Program',
          category: 'Languages',
          duration: '4 Months',
          fee: 84000,
          rating: 4.8,
          students: 174,
          level: 'Beginner',
          image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=800&q=80',
          description: 'Learn practical German and prepare for Goethe certification with guided speaking and exam practice.',
          trainer: 'Nikhil Arora',
          trainerRole: 'Goethe Certified German Trainer',
          benefits: JSON.stringify(['Goethe-aligned curriculum', 'Weekly speaking club', 'Study abroad guidance']),
          curriculum: JSON.stringify(['A1 vocabulary and grammar', 'Listening essentials', 'Speaking situations', 'Reading and writing', 'Goethe mock tests'])
        },
        {
          slug: 'spanish-language',
          title: 'Spanish Language Program',
          category: 'Languages',
          duration: '4 Months',
          fee: 84000,
          rating: 4.7,
          students: 152,
          level: 'Beginner',
          image: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=1200&q=80',
          description: 'A lively, conversation-led Spanish program for travel, work and global opportunities.',
          trainer: 'Aarav Mehta',
          trainerRole: 'Spanish Language Educator',
          benefits: JSON.stringify(['Conversation-first classes', 'Cultural immersion', 'Flexible batches']),
          curriculum: JSON.stringify(['Sounds and introductions', 'Daily communication', 'Grammar patterns', 'Workplace Spanish', 'Final speaking project'])
        },
        {
          slug: 'english-speaking',
          title: 'English Speaking & Personality',
          category: 'Communication',
          duration: '3 Months',
          fee: 48000,
          rating: 4.9,
          students: 510,
          level: 'Intermediate',
          image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',
          description: 'Strengthen spoken English, confidence, presentation and interview skills in a supportive small batch.',
          trainer: 'Priya Malhotra',
          trainerRole: 'Communication and Soft Skills Coach',
          benefits: JSON.stringify(['Daily speaking practice', 'Interview simulations', 'Personal feedback']),
          curriculum: JSON.stringify(['Fluency foundations', 'Vocabulary and pronunciation', 'Public speaking', 'Group discussions', 'Interview mastery'])
        },
        {
          slug: 'italian-language',
          title: 'Italian Language Program',
          category: 'Languages',
          duration: '4 Months',
          fee: 17999,
          rating: 4.8,
          students: 120,
          level: 'Beginner',
          image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80',
          description: 'Master conversational Italian, grammar foundations and CILS exam preparation with native-certified trainers.',
          trainer: 'Elena Rossi',
          trainerRole: 'CILS Certified Italian Educator',
          benefits: JSON.stringify(['CILS exam preparation', 'Interactive audio-visual labs', 'Small batch mentoring']),
          curriculum: JSON.stringify(['A1 vocabulary & grammar', 'Everyday conversation', 'Italian culture & travel', 'Pronunciation & listening', 'CILS mock evaluation'])
        }
      ];

      for (const c of seedCourses) {
        await client.query(`
          INSERT INTO courses (slug, title, category, duration, fee, rating, students, level, image, description, trainer, trainer_role, benefits, curriculum)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
          ON CONFLICT (slug) DO UPDATE SET fee = EXCLUDED.fee, title = EXCLUDED.title, duration = EXCLUDED.duration, category = EXCLUDED.category
        `, [
          c.slug, c.title, c.category, c.duration, c.fee, c.rating, c.students, c.level, c.image, c.description, c.trainer, c.trainerRole, c.benefits, c.curriculum
        ]);
      }
      console.log('Synced courses to Neon PostgreSQL');

    // 4. Notices Seed
    const noticeCount = await client.query('SELECT COUNT(*) as count FROM notices');
    if (parseInt(noticeCount.rows[0].count, 10) === 0) {
      await client.query('INSERT INTO notices (title, date, type, text) VALUES ($1, $2, $3, $4)', ['Digital Marketing guest session', '24 Jun', 'Event', 'Industry session with a performance marketing specialist at 4:00 PM.']);
      await client.query('INSERT INTO notices (title, date, type, text) VALUES ($1, $2, $3, $4)', ['Monthly assessment schedule', '27 Jun', 'Academic', 'Check your course section for test slots and syllabus.']);
      await client.query('INSERT INTO notices (title, date, type, text) VALUES ($1, $2, $3, $4)', ['Fee reminder', '30 Jun', 'Fees', 'Second installment is due by the end of this month.']);
      console.log('Seeded notices to Neon PostgreSQL');
    }

    // 5. Certificates Seed
    const certCount = await client.query('SELECT COUNT(*) as count FROM certificates');
    if (parseInt(certCount.rows[0].count, 10) === 0) {
      await client.query('INSERT INTO certificates (certificate_number, student_name, student_id, course_title, grade, issued_at) VALUES ($1, $2, $3, $4, $5, $6)', ['OVS-CERT-2026-001', 'Rahul Sharma', 'OVS202601', 'Digital Marketing Foundation', 'Grade A+', '2026-01-15T00:00:00.000Z']);
      await client.query('INSERT INTO certificates (certificate_number, student_name, student_id, course_title, grade, issued_at) VALUES ($1, $2, $3, $4, $5, $6)', ['OVS-CERT-2026-SAMPLE', 'Priya Verma', 'OVS202602', 'Digital Marketing Mastery', 'Grade A', '2026-02-10T00:00:00.000Z']);
      await client.query('INSERT INTO certificates (certificate_number, student_name, student_id, course_title, grade, issued_at) VALUES ($1, $2, $3, $4, $5, $6)', ['OVS-CERT-2026-003', 'Aarav Mehta', 'OVS202603', 'Graphic Design Mastery', 'Grade A', '2026-03-01T00:00:00.000Z']);
      console.log('Seeded certificates to Neon PostgreSQL');
    }

    // 6. Materials Seed
    const matCount = await client.query('SELECT COUNT(*) as count FROM materials');
    if (parseInt(matCount.rows[0].count, 10) === 0) {
      await client.query('INSERT INTO materials (course_slug, title, type, size) VALUES ($1, $2, $3, $4)', ['digital-marketing-advanced', 'SEO & Keyword Strategy Guide', 'PDF', '4.2 MB']);
      await client.query('INSERT INTO materials (course_slug, title, type, size) VALUES ($1, $2, $3, $4)', ['digital-marketing-advanced', 'Google Ads Bidding Formulas & Cheatsheet', 'PDF', '2.8 MB']);
      await client.query('INSERT INTO materials (course_slug, title, type, size) VALUES ($1, $2, $3, $4)', ['graphic-design', 'Design System & Typography Starter Kit', 'ZIP', '18.5 MB']);
      await client.query('INSERT INTO materials (course_slug, title, type, size) VALUES ($1, $2, $3, $4)', ['french-language', 'DELF A1 Speaking Dialogues & Audio Script', 'PDF', '3.1 MB']);
      console.log('Seeded materials to Neon PostgreSQL');
    }

    console.log('Database initialization completed successfully!');
  } catch (err) {
    console.error('Failed to initialize database tables:', err);
  } finally {
    client.release();
  }
}

export default { query, initDb, pool };
