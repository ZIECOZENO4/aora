import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://uoppdgbycojkpcadszya.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvcHBkZ2J5Y29qa3BjYWRzenlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjAwNTE1NDAsImV4cCI6MjAzNTYyNzU0MH0.qmoTVgC9ajFpUyu4WpAp_9YgYDA-8EZirpB-SPbMBF8";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
