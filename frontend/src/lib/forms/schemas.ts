import { z } from 'zod';

/**
 * Common form validation schemas
 */

// Example form schema
export const exampleFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  description: z.string().optional(),
});

export type ExampleFormData = z.infer<typeof exampleFormSchema>;

