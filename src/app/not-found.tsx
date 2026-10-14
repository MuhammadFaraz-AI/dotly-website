import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { SiteShell } from "@/components/layout/SiteShell";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <SiteShell>
      <PageHero eyebrow="404" title="This page wandered off" sub="Let's get you back on track.">
        <div className="dt-hero__actions">
          <Link className="dt-btn dt-btn--primary" href="/">Home</Link>
          <Link className="dt-btn dt-btn--secondary" href="/services">Services</Link>
          <Link className="dt-btn dt-btn--secondary" href="/contact">Contact</Link>
        </div>
      </PageHero>
    </SiteShell>
  );
}
