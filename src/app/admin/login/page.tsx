import type { Metadata } from "next";
import { signIn } from "./actions";

export const metadata: Metadata = {
  title: "Admin login",
  robots: { index: false, follow: false },
};

type SearchParams = Promise<{ error?: string }>;

export default async function AdminLoginPage({ searchParams }: { searchParams: SearchParams }) {
  const { error } = await searchParams;

  return (
    <div className="dt" style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24, background: "var(--canvas)" }}>
      <form action={signIn} className="dt-form" style={{ width: "100%", maxWidth: 400 }}>
        <h1 className="h3">Dotly admin</h1>
        <div className="dt-field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" placeholder="you@dotly.studio" required autoComplete="username" />
        </div>
        <div className="dt-field">
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" required autoComplete="current-password" />
        </div>
        {error && (
          <p role="alert" style={{ color: "#b52a05", margin: 0, fontWeight: 500 }}>
            Incorrect email or password.
          </p>
        )}
        <button className="dt-btn dt-btn--primary" type="submit">
          Sign in
        </button>
      </form>
    </div>
  );
}
