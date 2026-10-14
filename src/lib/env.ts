import { z } from "zod";

/**
 * All Supabase env vars are optional here on purpose: the site must keep working with zero
 * Supabase config (contact form falls back to the file lead store, public pages are unaffected).
 * Code paths that actually need a var call one of the require* helpers below, which throw a
 * clear error at the point of use instead of crashing the whole app at boot.
 */
// An env var left blank in .env.local (e.g. "KEY=") is "" at runtime, not undefined — treat
// that the same as unset rather than failing the .min(1) check below.
const emptyToUndefined = (value: unknown) => (typeof value === "string" && value.trim() === "" ? undefined : value);

const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.preprocess(emptyToUndefined, z.string().trim().url().optional()),
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: z.preprocess(emptyToUndefined, z.string().trim().min(1).optional()),
  SUPABASE_SECRET_KEY: z.preprocess(emptyToUndefined, z.string().trim().min(1).optional()),
});

const parsed = envSchema.safeParse({
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  SUPABASE_SECRET_KEY: process.env.SUPABASE_SECRET_KEY,
});

if (!parsed.success) {
  // Issue messages only ever name which var is malformed, never its value.
  throw new Error(`Invalid environment variables: ${parsed.error.issues.map((i) => i.path.join(".")).join(", ")}`);
}

export const env = parsed.data;

export function hasSupabasePublicEnv(): boolean {
  return Boolean(env.NEXT_PUBLIC_SUPABASE_URL && env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);
}

export function hasSupabaseSecretKey(): boolean {
  return Boolean(env.SUPABASE_SECRET_KEY);
}

/** Throws if the public Supabase vars aren't set — call only where Supabase is actually used. */
export function requireSupabasePublicEnv(): { url: string; publishableKey: string } {
  if (!env.NEXT_PUBLIC_SUPABASE_URL || !env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY must be set.");
  }
  return { url: env.NEXT_PUBLIC_SUPABASE_URL, publishableKey: env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY };
}

/** Throws if the secret key isn't set — server only, call only from admin.ts. */
export function requireSupabaseSecretKey(): string {
  if (!env.SUPABASE_SECRET_KEY) {
    throw new Error("SUPABASE_SECRET_KEY must be set.");
  }
  return env.SUPABASE_SECRET_KEY;
}
