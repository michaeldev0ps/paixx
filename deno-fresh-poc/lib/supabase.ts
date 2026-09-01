import { createClient } from "https://esm.sh/@supabase/supabase-js@2.0.0";

const requireEnv = (name: string) => {
  const value = Deno.env.get(name)?.trim();
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
};

const supabaseUrl = requireEnv("SUPABASE_URL");
const supabaseAnonKey = requireEnv("SUPABASE_ANON_KEY");

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
  },
});
