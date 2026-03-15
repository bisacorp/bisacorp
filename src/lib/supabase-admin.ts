import { createClient } from "@supabase/supabase-js";

// Gunakan fallback "dummy_url" jika environment variables belum diset (misal saat proses build Vercel)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://dummy_url_for_build.supabase.co";
// IMPORTANT: This key MUST NEVER be exposed to the browser.
// It bypasses Row Level Security.
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "dummy_key_for_build";

if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.warn(
    "Warning: SUPABASE_SERVICE_ROLE_KEY is not set. " +
      "The Contact API will fail if RLS is enabled."
  );
}

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
