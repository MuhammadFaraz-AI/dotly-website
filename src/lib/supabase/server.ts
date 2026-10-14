import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { requireSupabasePublicEnv } from "@/lib/env";

/**
 * Supabase client for the currently signed in user (server components, server actions).
 * Uses the publishable key, so RLS applies — this is the client the admin dashboard reads
 * and writes leads through, per the "authenticated admins only" policies.
 */
export async function createClient() {
  const cookieStore = await cookies();
  const { url, publishableKey } = requireSupabasePublicEnv();

  return createServerClient(url, publishableKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // Called from a Server Component that can't set cookies — fine as long as the
          // proxy is also refreshing the session (it is, see src/lib/supabase/middleware.ts).
        }
      },
    },
  });
}
