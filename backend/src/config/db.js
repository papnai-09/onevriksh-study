import mongoose from 'mongoose';

mongoose.set('bufferCommands', false);

export async function connectDatabase() {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/onevriksh-study';

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2500,
      autoIndex: true
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.log(`Note: MongoDB not available locally (${error.message}).`);
    console.log('Running in resilient In-Memory Database mode. All demo accounts, courses, portals and certificates are fully active.');
    if (process.env.NODE_ENV === 'production' && process.env.REQUIRE_MONGODB === 'true') {
      console.error('CRITICAL: MongoDB connection is mandatory for production. Exiting.');
      process.exit(1);
    }
    return false;
  }
}

export const connectDB = connectDatabase;
