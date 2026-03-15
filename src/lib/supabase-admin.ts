import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
// IMPORTANT: This key MUST NEVER be exposed to the browser.
// It bypasses Row Level Security.
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseServiceKey) {
  console.warn(
    "Warning: SUPABASE_SERVICE_ROLE_KEY is not set in `.env.local`. " +
      "The Contact API will fail if RLS is enabled."
  );
}

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey || "");
