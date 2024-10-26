import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vvdzecqhtquarwtjmrts.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ2ZHplY3FodHF1YXJ3dGptcnRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg3Mjg3NDMsImV4cCI6MjA0NDMwNDc0M30.sq4sof79xI73n9wtNixTvJT5ohlh5A2cxET6tdCzskM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
