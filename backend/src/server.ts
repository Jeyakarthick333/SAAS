import dotenv from 'dotenv';
import app from './app';
import { connectDatabase } from './config/database';
import { logger } from './utils/logger';
import { env } from './config/env';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDatabase();

// Start server
const PORT = parseInt(env.PORT, 10);

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});

