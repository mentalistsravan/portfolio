import { createClient } from '@supabase/supabase-js';

// Retrieve Supabase environment variables from Vite env or default to production credentials
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ivmeaeptqqjthbcwuhhr.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2bWVhZXB0cXFqdGhiY3d1aGhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc3MjI4NDAsImV4cCI6MjEwMzI5ODg0MH0.PB7j96ODynCZV57YMcSflOy5Stuzi-R6XJKUcw4hnBk';

export const isSupabaseConfigured = true;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: false },
  realtime: { params: { eventsPerSecond: 10 } }
});
