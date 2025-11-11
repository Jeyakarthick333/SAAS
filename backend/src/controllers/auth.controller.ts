import { Request, Response, NextFunction } from 'express';
import { createClient } from '@supabase/supabase-js';
import { env } from '../config/env';
import { ApiResponse } from '../types';
import { CustomError } from '../middleware/errorHandler';
import { logger } from '../utils/logger';

// Initialize Supabase admin client
const supabaseAdmin = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

/**
 * Register a new user
 */
export const register = async (
  req: Request,
  res: Response<ApiResponse<{ user: unknown; session: unknown }>>,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password, metadata } = req.body;

    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm email for SaaS
      user_metadata: metadata || {},
    });

    if (error) {
      logger.error({ error }, 'User registration failed');
      const customError = new Error(error.message) as CustomError;
      customError.statusCode = 400;
      throw customError;
    }

    logger.info({ userId: data.user?.id }, 'User registered successfully');

    res.status(201).json({
      success: true,
      data: {
        user: data.user,
        session: null, // Supabase admin.createUser doesn't return a session
      },
      message: 'User registered successfully',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Login user
 */
export const login = async (
  req: Request,
  res: Response<ApiResponse<{ session: unknown; user: unknown }>>,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;

    const { data, error } = await supabaseAdmin.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      logger.error({ error }, 'User login failed');
      const customError = new Error(error.message) as CustomError;
      customError.statusCode = 401;
      throw customError;
    }

    logger.info({ userId: data.user?.id }, 'User logged in successfully');

    res.status(200).json({
      success: true,
      data: {
        session: data.session,
        user: data.user,
      },
      message: 'Login successful',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get current user
 */
export const getCurrentUser = async (
  req: Request,
  res: Response<ApiResponse<{ user: unknown }>>,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      const error = new Error('Authorization token required') as CustomError;
      error.statusCode = 401;
      throw error;
    }

    const token = authHeader.substring(7);
    
    const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);

    if (error || !user) {
      const customError = new Error('Invalid or expired token') as CustomError;
      customError.statusCode = 401;
      throw customError;
    }

    res.status(200).json({
      success: true,
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Logout user
 * Note: Supabase handles session management on the client side.
 * This endpoint just confirms the logout request.
 * The actual session invalidation should be handled by the client.
 */
export const logout = async (
  req: Request,
  res: Response<ApiResponse>,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      const error = new Error('Authorization token required') as CustomError;
      error.statusCode = 401;
      throw error;
    }

    const token = authHeader.substring(7);
    
    // Verify token is valid before allowing logout
    const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);

    if (error || !user) {
      const customError = new Error('Invalid or expired token') as CustomError;
      customError.statusCode = 401;
      throw customError;
    }

    logger.info({ userId: user.id }, 'User logged out successfully');

    // Note: Supabase sessions are stateless JWT tokens.
    // The client should remove the token from storage.
    // For server-side invalidation, you would need to maintain a token blacklist in Redis.

    res.status(200).json({
      success: true,
      message: 'Logout successful',
    });
  } catch (error) {
    next(error);
  }
};

