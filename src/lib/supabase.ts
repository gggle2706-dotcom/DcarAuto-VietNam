import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || 'https://egxfbhigyyrgpnmgbffv.supabase.co';
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVneGZiaGlneXlyZ3BubWdiZmZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg5NzA1NzYsImV4cCI6MjEwNDU0NjU3Nn0.LE08B8XpD8gN6f1vNURQA40VvFY1oqWud_Z1EtVbzaY';

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl !== 'https://your-project-id.supabase.co'
);

// Tạo Supabase client (hoặc client dummy nếu chưa cấu hình để không gây crash khi build)
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  }
);
