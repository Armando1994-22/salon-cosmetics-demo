import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true, // Keep true so clients stay logged in
    autoRefreshToken: true,
    detectSessionInUrl: true,
    // 💡 Setting this to false stops multi-tab listeners from competing for tokens
    multiTab: false 
  }
})