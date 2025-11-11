/**
 * Standard API response type
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: {
    message: string;
    details?: Array<{
      path: string;
      message: string;
    }>;
  };
}

/**
 * Paginated API response
 */
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

/**
 * Error response
 */
export interface ErrorResponse {
  success: false;
  error: {
    message: string;
    details?: unknown;
  };
}

