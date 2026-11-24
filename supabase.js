import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

const isConfigured = Boolean(supabaseUrl && supabaseAnonKey);

const unavailable = () => ({
  data: null,
  error: new Error('La connexion Supabase doit être configurée pour activer cette fonction.')
});

const demoAuth = {
  getSession: async () => ({ data: { session: null }, error: null }),
  onAuthStateChange: () => ({
    data: { subscription: { unsubscribe: () => {} } }
  }),
  signInWithPassword: async () => unavailable(),
  signUp: async () => unavailable(),
  signInWithOAuth: async () => unavailable(),
  signOut: async () => ({ error: null })
};

// Keep the public demo usable when deployment secrets are not yet configured.
// When the existing Supabase URL and anon key are supplied, the real client is used.
const supabase = isConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : { auth: demoAuth };

export { supabase };
export default supabase;
