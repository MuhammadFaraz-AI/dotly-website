import { NextResponse, type NextRequest } from "next/server";
import { hasSupabasePublicEnv } from "@/lib/env";
import { updateSession } from "@/lib/supabase/middleware";

/**
 * Protects the admin area with a Supabase session. Fails closed in production when Supabase
 * is not configured. This refreshes the session and redirects unauthenticated requests to
 * /admin/login, but it is NOT the only check — every admin page and server action separately
 * verifies the signed in user is in admin_users (src/lib/admin-auth.ts), since a valid Supabase
 * session alone only proves someone is logged in, not that they're an admin.
 */
const PUBLIC_ADMIN_PATHS = ["/admin/login"];

export async function proxy(request: NextRequest) {
  if (!hasSupabasePublicEnv()) {
    if (process.env.NODE_ENV === "production") {
      return new NextResponse("Admin is not configured", { status: 503 });
    }
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;
  const { supabaseResponse, claims } = await updateSession(request);
  const isPublicPath = PUBLIC_ADMIN_PATHS.includes(pathname);

  if (!claims && !isPublicPath) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    url.search = "";
    return NextResponse.redirect(url);
  }

  if (claims && isPublicPath) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

export const config = { matcher: ["/admin/:path*"] };
