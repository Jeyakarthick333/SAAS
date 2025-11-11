/**
 * API endpoint constants
 */
export const API_ENDPOINTS = {
  // Example endpoints
  examples: {
    list: '/examples',
    detail: (id: string) => `/examples/${id}`,
    create: '/examples',
    update: (id: string) => `/examples/${id}`,
    delete: (id: string) => `/examples/${id}`,
  },
  
  // Upload endpoints
  upload: {
    upload: '/upload',
    delete: (key: string) => `/upload/${key}`,
    getUrl: (key: string) => `/upload/${key}/url`,
  },
  
  // Health check
  health: '/health',
} as const;

