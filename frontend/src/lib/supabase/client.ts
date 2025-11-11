import { createBrowserClient } from '@supabase/ssr';
import { env } from '../env';

/**
 * Create Supabase client for browser usage
 */
export const createClient = () => {
  return createBrowserClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
};

