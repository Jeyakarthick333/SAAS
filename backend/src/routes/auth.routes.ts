import { Router, RequestHandler } from 'express';
import { register, login, getCurrentUser, logout } from '../controllers/auth.controller';
import { validate } from '../middleware/validate';
import { z } from 'zod';
import { commonSchemas } from '../utils/validation';

const router = Router();

// Get auth limiter from app locals (set in security middleware)
// This will be available when the route is mounted
const getAuthLimiter = (): RequestHandler => {
  return (req, res, next) => {
    const limiter = (req.app as any).locals?.authLimiter;
    if (limiter) {
      return limiter(req, res, next);
    }
    next();
  };
};

// Validation schemas
const registerSchema = z.object({
  email: commonSchemas.email,
  password: commonSchemas.password,
  metadata: z.record(z.unknown()).optional(),
});

const loginSchema = z.object({
  email: commonSchemas.email,
  password: z.string().min(1, 'Password is required'),
});

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 8
 *               metadata:
 *                 type: object
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error or user already exists
 */
router.post('/register', getAuthLimiter(), validate(registerSchema), register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', getAuthLimiter(), validate(loginSchema), login);

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Get current user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user information
 *       401:
 *         description: Unauthorized
 */
router.get('/me', getCurrentUser);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 *       401:
 *         description: Unauthorized
 */
router.post('/logout', logout);

export default router;

