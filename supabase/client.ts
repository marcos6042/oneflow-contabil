import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!https://vfypfmxvaukzsmkxupcr.supabase.co;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmeXBmbXh2YXVrenNta3h1cGNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ3NTkwMzcsImV4cCI6MjA2MDMzNTAzN30.v7oHWqlP7KusJ_7TsrtRMwPTWEswQQI5dTSJzQ1US-0; 

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

