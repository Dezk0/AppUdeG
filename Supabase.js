import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zlotxrdbajwoyezcxdad.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpsb3R4cmRiYWp3b3llemN4ZGFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMyMjc2NTUsImV4cCI6MjA0ODgwMzY1NX0.73T60ROOWKOJP5xfMvvDGTNKLM-Us_2j6Zoh3zsTKak';

export const supabase = createClient(supabaseUrl,supabaseKey);

export default supabase;