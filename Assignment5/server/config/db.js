import mongoose from 'mongoose';

const RETRY_DELAY_MS = 5000;
const MAX_RETRIES = 5;
let retries = 0;
let retryTimer = null;

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) throw new Error('MONGO_URI is not defined in environment variables.');

  const attemptConnection = async () => {
    try {
      await mongoose.connect(mongoUri);
      console.log(`[DB] Connected to MongoDB Atlas: ${mongoose.connection.host}`);
      retries = 0;
    } catch (error) {
      retries += 1;
      console.error(`[DB] Connection failed (attempt ${retries}/${MAX_RETRIES}): ${error.message}`);

      if (retries >= MAX_RETRIES) {
        console.error('[DB] Max retries reached. Exiting process.');
        process.exit(1);
      }

      retryTimer = setTimeout(attemptConnection, RETRY_DELAY_MS);
    }
  };

  mongoose.connection.on('disconnected', () => {
    console.warn('[DB] MongoDB disconnected. Reconnecting...');
    if (!retryTimer) retryTimer = setTimeout(attemptConnection, RETRY_DELAY_MS);
  });

  mongoose.connection.on('connected', () => {
    if (retryTimer) {
      clearTimeout(retryTimer);
      retryTimer = null;
    }
  });

  mongoose.connection.on('error', (err) => {
    console.error(`[DB] MongoDB error: ${err.message}`);
  });

  process.on('SIGINT', async () => {
    try {
      if (retryTimer) clearTimeout(retryTimer);
      await mongoose.connection.close();
      console.log('[DB] MongoDB connection closed due to SIGINT.');
      process.exit(0);
    } catch (error) {
      console.error(`[DB] Error during DB shutdown: ${error.message}`);
      process.exit(1);
    }
  });

  await attemptConnection();
};

export default connectDB;
