import { createClient } from '@supabase/supabase-js';
const apiKey = import.meta.env.VITE_API_KEY;
const supabaseProjectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;

export const supabase = createClient(
  `https://${supabaseProjectId}.supabase.co`,
  apiKey
);
