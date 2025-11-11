import express, { Application } from 'express';
import swaggerUi from 'swagger-ui-express';
import { notFound } from './middleware/notFound';
import { errorHandler } from './middleware/errorHandler';
import { configureSecurity } from './middleware/security';
import { swaggerSpec } from './config/swagger';
import { initRedis } from './config/redis';
import { logger } from './utils/logger';
import exampleRoutes from './routes/example.routes';
import uploadRoutes from './routes/upload.routes';
import authRoutes from './routes/auth.routes';

const app: Application = express();

// Security middleware (must be first)
configureSecurity(app);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Initialize Redis connection
try {
  initRedis();
} catch (error) {
  logger.warn({ error }, 'Redis initialization failed, continuing without cache');
}

// Health check route
/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Server is running
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 message:
 *                   type: string
 *                   example: Server is running
 */
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API routes
app.use('/api/examples', exampleRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/auth', authRoutes);

// Error handling middleware (must be last)
app.use(notFound);
app.use(errorHandler);

export default app;

