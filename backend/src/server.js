import dotenv from 'dotenv';
import { app } from './app.js';
import { connectDatabase } from './config/db.js';

dotenv.config();

const port = process.env.PORT || 5000;

async function start() {
  await connectDatabase();
  app.listen(port, () => {
    console.log(`Onevriksh API running on http://localhost:${port}`);
  });
}

start().catch((error) => {
  console.error(error);
  process.exit(1);
});
