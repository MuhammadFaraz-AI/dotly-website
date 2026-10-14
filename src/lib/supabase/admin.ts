import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { requireSupabasePublicEnv, requireSupabaseSecretKey } from "@/lib/env";

/**
 * Secret-key client: bypasses RLS entirely. Only for the contact form's write path
 * (src/lib/lead-store.ts) and the admin_users membership check (src/lib/admin-auth.ts).
 * `server-only` makes importing this from a client component a build error.
 */
export function createAdminClient() {
  const { url } = requireSupabasePublicEnv();
  const secretKey = requireSupabaseSecretKey();

  return createSupabaseClient(url, secretKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
