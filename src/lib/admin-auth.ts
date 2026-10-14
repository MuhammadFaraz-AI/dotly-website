import "server-only";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export interface AdminSession {
  userId: string;
  email: string | undefined;
}

async function getClaimsAndAdminRow() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();
  const claims = data?.claims;
  if (error || !claims) return null;

  const admin = createAdminClient();
  const { data: row } = await admin.from("admin_users").select("user_id").eq("user_id", claims.sub).maybeSingle();
  if (!row) return null;

  return { userId: claims.sub as string, email: claims.email as string | undefined };
}

/**
 * The proxy only proves "someone is signed in" — this is the second, independent check that
 * the signed in user's id is actually present in admin_users. Call at the top of every admin
 * page/layout. Redirects to /admin/login for anyone who fails either check.
 */
export async function requireAdmin(): Promise<AdminSession> {
  const session = await getClaimsAndAdminRow();
  if (!session) redirect("/admin/login");
  return session;
}

/**
 * Same check for server actions, which shouldn't redirect mid-mutation — returns null so the
 * caller can throw/bail instead. Every leads server action must call this before touching data.
 */
export async function getAdminSession(): Promise<AdminSession | null> {
  return getClaimsAndAdminRow();
}
