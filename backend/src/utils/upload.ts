import {
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { getS3Client, getS3Bucket } from '../config/s3';
import { logger } from './logger';
import { env } from '../config/env';

export interface UploadResult {
  key: string;
  url: string;
  bucket: string;
}

/**
 * Upload file to S3
 */
export const uploadToS3 = async (
  file: Express.Multer.File,
  folder: string = 'uploads',
  makePublic: boolean = false
): Promise<UploadResult> => {
  try {
    const s3Client = getS3Client();
    const bucket = getS3Bucket();
    
    // Generate unique file key
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const extension = file.originalname.split('.').pop();
    const key = `${folder}/${timestamp}-${randomString}.${extension}`;

    // Upload file
    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: makePublic ? 'public-read' : 'private',
    });

    await s3Client.send(command);

    // Generate URL
    const url = makePublic
      ? `https://${bucket}.s3.${env.AWS_REGION}.amazonaws.com/${key}`
      : await getSignedUrl(s3Client, new GetObjectCommand({ Bucket: bucket, Key: key }), {
          expiresIn: 3600, // 1 hour
        });

    logger.info({ key, bucket }, 'File uploaded to S3');

    return {
      key,
      url,
      bucket,
    };
  } catch (error) {
    logger.error({ error }, 'S3 upload error');
    throw new Error('Failed to upload file to S3');
  }
};

/**
 * Delete file from S3
 */
export const deleteFromS3 = async (key: string): Promise<boolean> => {
  try {
    const s3Client = getS3Client();
    const bucket = getS3Bucket();

    const command = new DeleteObjectCommand({
      Bucket: bucket,
      Key: key,
    });

    await s3Client.send(command);
    logger.info({ key, bucket }, 'File deleted from S3');
    return true;
  } catch (error) {
    logger.error({ error, key }, 'S3 delete error');
    return false;
  }
};

/**
 * Generate presigned URL for private file
 */
export const getPresignedUrl = async (key: string, expiresIn: number = 3600): Promise<string> => {
  try {
    const s3Client = getS3Client();
    const bucket = getS3Bucket();

    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: key,
    });

    const url = await getSignedUrl(s3Client, command, { expiresIn });
    return url;
  } catch (error) {
    logger.error({ error, key }, 'Failed to generate presigned URL');
    throw new Error('Failed to generate presigned URL');
  }
};

