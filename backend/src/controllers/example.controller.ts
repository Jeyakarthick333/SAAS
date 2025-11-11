import { Request, Response, NextFunction } from 'express';
import Example, { IExample } from '../models/example.model';
import { ApiResponse } from '../types';
import { CustomError } from '../middleware/errorHandler';
import { CacheService } from '../utils/cache';
import { commonSchemas } from '../utils/validation';
import { z } from 'zod';

// Validation schemas
const createExampleSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  description: z.string().optional(),
});

const updateExampleSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  description: z.string().optional(),
});

// Get all examples
/**
 * @swagger
 * /api/examples:
 *   get:
 *     summary: Get all examples
 *     tags: [Examples]
 *     responses:
 *       200:
 *         description: List of examples
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 */
export const getExamples = async (
  _req: Request,
  res: Response<ApiResponse<IExample[]>>,
  next: NextFunction
): Promise<void> => {
  try {
    // Try to get from cache first
    const cacheKey = 'examples:all';
    const cached = await CacheService.get<IExample[]>(cacheKey);
    
    if (cached) {
      res.status(200).json({
        success: true,
        data: cached,
      });
      return;
    }

    const examples = await Example.find();
    
    // Cache the results for 5 minutes
    await CacheService.set(cacheKey, examples, 300);
    
    res.status(200).json({
      success: true,
      data: examples,
    });
  } catch (error) {
    next(error);
  }
};

// Get single example by ID
/**
 * @swagger
 * /api/examples/{id}:
 *   get:
 *     summary: Get example by ID
 *     tags: [Examples]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Example found
 *       404:
 *         description: Example not found
 */
export const getExampleById = async (
  req: Request,
  res: Response<ApiResponse<IExample>>,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    
    // Validate ID format
    commonSchemas.mongoId.parse(id);
    
    // Try cache first
    const cacheKey = `examples:${id}`;
    const cached = await CacheService.get<IExample>(cacheKey);
    
    if (cached) {
      res.status(200).json({
        success: true,
        data: cached,
      });
      return;
    }

    const example = await Example.findById(id);

    if (!example) {
      const error = new Error('Example not found') as CustomError;
      error.statusCode = 404;
      throw error;
    }

    // Cache for 5 minutes
    await CacheService.set(cacheKey, example, 300);

    res.status(200).json({
      success: true,
      data: example,
    });
    return;
  } catch (error) {
    next(error);
  }
};

// Create new example
/**
 * @swagger
 * /api/examples:
 *   post:
 *     summary: Create a new example
 *     tags: [Examples]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Example created successfully
 *       400:
 *         description: Validation error
 */
export const createExample = async (
  req: Request,
  res: Response<ApiResponse<IExample>>,
  next: NextFunction
): Promise<void> => {
  try {
    // Validation is handled by middleware, but we can also validate here for safety
    const validated = createExampleSchema.parse(req.body);
    
    const example = await Example.create(validated);
    
    // Invalidate cache
    await CacheService.deletePattern('examples:*');
    
    res.status(201).json({
      success: true,
      data: example,
      message: 'Example created successfully',
    });
  } catch (error) {
    next(error);
  }
};

// Update example
/**
 * @swagger
 * /api/examples/{id}:
 *   put:
 *     summary: Update an example
 *     tags: [Examples]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Example updated successfully
 *       404:
 *         description: Example not found
 */
export const updateExample = async (
  req: Request,
  res: Response<ApiResponse<IExample>>,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    commonSchemas.mongoId.parse(id);
    
    const validated = updateExampleSchema.parse(req.body);

    const example = await Example.findByIdAndUpdate(
      id,
      validated,
      { new: true, runValidators: true }
    );

    if (!example) {
      const error = new Error('Example not found') as CustomError;
      error.statusCode = 404;
      throw error;
    }

    // Invalidate cache
    await CacheService.delete(`examples:${id}`);
    await CacheService.deletePattern('examples:all');

    res.status(200).json({
      success: true,
      data: example,
      message: 'Example updated successfully',
    });
  } catch (error) {
    next(error);
  }
};

// Delete example
/**
 * @swagger
 * /api/examples/{id}:
 *   delete:
 *     summary: Delete an example
 *     tags: [Examples]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Example deleted successfully
 *       404:
 *         description: Example not found
 */
export const deleteExample = async (
  req: Request,
  res: Response<ApiResponse>,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    commonSchemas.mongoId.parse(id);
    
    const example = await Example.findByIdAndDelete(id);

    if (!example) {
      const error = new Error('Example not found') as CustomError;
      error.statusCode = 404;
      throw error;
    }

    // Invalidate cache
    await CacheService.delete(`examples:${id}`);
    await CacheService.deletePattern('examples:all');

    res.status(200).json({
      success: true,
      message: 'Example deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

