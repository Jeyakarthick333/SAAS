import { Router } from 'express';
import { uploadSingle } from '../middleware/upload';
import { uploadToS3, deleteFromS3, getPresignedUrl } from '../utils/upload';
import { logger } from '../utils/logger';
import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../types';
import { CustomError } from '../middleware/errorHandler';

const router = Router();

/**
 * @swagger
 * /api/upload:
 *   post:
 *     summary: Upload a file to S3
 *     tags: [Upload]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: file
 *         type: file
 *         required: true
 *         description: File to upload
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *       400:
 *         description: No file provided or invalid file
 */
router.post(
  '/',
  uploadSingle('file'),
  async (req: Request, res: Response<ApiResponse<{ key: string; url: string; bucket: string }>>, next: NextFunction): Promise<void> => {
    try {
      if (!req.file) {
        const error = new Error('No file provided') as CustomError;
        error.statusCode = 400;
        throw error;
      }

      const folder = (req.body.folder as string) || 'uploads';
      const makePublic = req.body.makePublic === 'true';

      const result = await uploadToS3(req.file, folder, makePublic);

      logger.info({ key: result.key, bucket: result.bucket }, 'File uploaded successfully');

      res.status(200).json({
        success: true,
        data: result,
        message: 'File uploaded successfully',
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @swagger
 * /api/upload/{key}:
 *   delete:
 *     summary: Delete a file from S3
 *     tags: [Upload]
 *     parameters:
 *       - in: path
 *         name: key
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: File deleted successfully
 *       400:
 *         description: Invalid key
 */
router.delete(
  '/:key',
  async (req: Request, res: Response<ApiResponse>, next: NextFunction): Promise<void> => {
    try {
      const { key } = req.params;

      if (!key) {
        const error = new Error('File key is required') as CustomError;
        error.statusCode = 400;
        throw error;
      }

      const deleted = await deleteFromS3(key);

      if (!deleted) {
        const error = new Error('Failed to delete file') as CustomError;
        error.statusCode = 500;
        throw error;
      }

      res.status(200).json({
        success: true,
        message: 'File deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @swagger
 * /api/upload/{key}/url:
 *   get:
 *     summary: Get presigned URL for a private file
 *     tags: [Upload]
 *     parameters:
 *       - in: path
 *         name: key
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: expiresIn
 *         schema:
 *           type: integer
 *           default: 3600
 *     responses:
 *       200:
 *         description: Presigned URL generated successfully
 *       400:
 *         description: Invalid key
 */
router.get(
  '/:key/url',
  async (req: Request, res: Response<ApiResponse<{ url: string }>>, next: NextFunction): Promise<void> => {
    try {
      const { key } = req.params;
      const expiresIn = req.query.expiresIn ? parseInt(req.query.expiresIn as string, 10) : 3600;

      if (!key) {
        const error = new Error('File key is required') as CustomError;
        error.statusCode = 400;
        throw error;
      }

      const url = await getPresignedUrl(key, expiresIn);

      res.status(200).json({
        success: true,
        data: { url },
        message: 'Presigned URL generated successfully',
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;

