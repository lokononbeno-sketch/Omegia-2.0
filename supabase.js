import { createClient } from '@supabase/supabase-js';

// Valeurs de secours : sans elles, createClient plante et l'écran reste blanc
// quand les variables VITE_SUPABASE_* ne sont pas configurées.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export default supabase;
