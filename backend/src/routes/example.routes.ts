import { Router } from 'express';
import {
  getExamples,
  getExampleById,
  createExample,
  updateExample,
  deleteExample,
} from '../controllers/example.controller';
import { validate } from '../middleware/validate';
import { z } from 'zod';
import { commonSchemas } from '../utils/validation';

const router = Router();

// Validation schemas
const createExampleSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  description: z.string().optional(),
});

const updateExampleSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  description: z.string().optional(),
});

const paramsSchema = z.object({
  id: commonSchemas.mongoId,
});

router
  .route('/')
  .get(getExamples)
  .post(validate(createExampleSchema), createExample);

router
  .route('/:id')
  .get(validate(paramsSchema, 'params'), getExampleById)
  .put(validate(paramsSchema, 'params'), validate(updateExampleSchema), updateExample)
  .delete(validate(paramsSchema, 'params'), deleteExample);

export default router;

