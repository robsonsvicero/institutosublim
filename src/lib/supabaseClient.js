import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wqlkizjmnhcotaosmvkd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxbGtpemptbmhjb3Rhb3NtdmtkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUzNTU0MjQsImV4cCI6MjA4MDkzMTQyNH0.b-mrsbeawHeEJVbM-cPzZjKePoQry_hxPlJwYYmmXkY';

export const supabase = createClient(supabaseUrl, supabaseKey);
