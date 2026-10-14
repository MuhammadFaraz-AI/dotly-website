import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { requireSupabasePublicEnv } from "@/lib/env";

/**
 * Refreshes the Supabase session cookie for the proxy (Next 16's middleware). Mirrors the
 * official Next.js SSR guide: do not add logic between createServerClient and getClaims(),
 * and always return the `supabaseResponse` object as-is so the refreshed cookies ship.
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });
  const { url, publishableKey } = requireSupabasePublicEnv();

  const supabase = createServerClient(url, publishableKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options));
      },
    },
  });

  const { data } = await supabase.auth.getClaims();

  return { supabaseResponse, claims: data?.claims ?? null };
}
