import { S3Client } from '@aws-sdk/client-s3';
import { logger } from '../utils/logger';
import { env } from './env';

let s3Client: S3Client | null = null;

/**
 * Initialize AWS S3 client
 */
export const initS3 = (): S3Client => {
  if (s3Client) {
    return s3Client;
  }

  try {
    s3Client = new S3Client({
      region: env.AWS_REGION,
      credentials: {
        accessKeyId: env.AWS_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
      },
    });

    logger.info('AWS S3 client initialized');
    return s3Client;
  } catch (error) {
    logger.error({ error }, 'Failed to initialize S3 client');
    throw error;
  }
};

/**
 * Get S3 client instance
 */
export const getS3Client = (): S3Client => {
  if (!s3Client) {
    return initS3();
  }
  return s3Client;
};

/**
 * Get S3 bucket name
 */
export const getS3Bucket = (): string => {
  return env.AWS_S3_BUCKET;
};

