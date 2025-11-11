import multer from 'multer';
import { Request } from 'express';

/**
 * Configure multer for memory storage (files will be stored in memory as buffers)
 * This is suitable for uploading directly to S3
 */
const storage = multer.memoryStorage();

/**
 * File filter to validate file types
 */
const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
): void => {
  // Define allowed MIME types
  const allowedMimes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/webp',
    'application/pdf',
    'text/plain',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ];

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`File type ${file.mimetype} is not allowed`));
  }
};

/**
 * Multer configuration
 */
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
});

/**
 * Single file upload middleware
 */
export const uploadSingle = (fieldName: string = 'file') => {
  return upload.single(fieldName);
};

/**
 * Multiple files upload middleware
 */
export const uploadMultiple = (fieldName: string = 'files', maxCount: number = 5) => {
  return upload.array(fieldName, maxCount);
};

/**
 * Multiple fields upload middleware
 */
export const uploadFields = (fields: Array<{ name: string; maxCount?: number }>) => {
  return upload.fields(fields);
};

