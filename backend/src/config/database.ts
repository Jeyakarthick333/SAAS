import mongoose from 'mongoose';
import { logger } from '../utils/logger';
import { env } from './env';

export const connectDatabase = async (): Promise<void> => {
  try {
    const mongoURI = env.MONGODB_URI;

    await mongoose.connect(mongoURI);
    logger.info('MongoDB connected successfully');

    mongoose.connection.on('error', (err) => {
      logger.error({ err }, 'MongoDB connection error');
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB disconnected');
    });

    // Handle app termination
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      logger.info('MongoDB connection closed through app termination');
      process.exit(0);
    });
  } catch (error) {
    logger.error({ error }, 'Error connecting to MongoDB');
    process.exit(1);
  }
};

