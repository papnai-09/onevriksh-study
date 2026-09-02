import { DatabaseSync } from 'node:sqlite';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, '../../onevriksh.db');

const db = new DatabaseSync(DB_PATH);

// Create users table
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    name       TEXT    NOT NULL,
    phone      TEXT    NOT NULL UNIQUE,
    password   TEXT    NOT NULL,
    role       TEXT    NOT NULL DEFAULT 'student',
    course     TEXT,
    created_at TEXT    NOT NULL DEFAULT (datetime('now'))
  )
`);

// Seed default admin if not exists (Admin / 9999999999 / admin123)
import bcrypt from 'bcryptjs';
const adminExists = db.prepare('SELECT id FROM users WHERE phone = ?').get('9999999999');
if (!adminExists) {
  const hash = bcrypt.hashSync('admin123', 10);
  db.prepare('INSERT INTO users (name, phone, password, role, course) VALUES (?, ?, ?, ?, ?)').run(
    'ONEVRIKSH Admin',
    '9999999999',
    hash,
    'admin',
    'Administration'
  );
}

export default db;
