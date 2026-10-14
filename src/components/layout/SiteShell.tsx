import type { ReactNode } from "react";
import { Footer } from "./Footer";

/** Wraps a public page in the design system root and adds the shared footer. */
export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="dt" style={{ minHeight: "100vh" }}>
      {children}
      <Footer />
    </div>
  );
}
