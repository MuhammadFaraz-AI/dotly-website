import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { SiteShell } from "@/components/layout/SiteShell";

export const metadata: Metadata = { title: "Message sent", robots: { index: false } };

export default function ThankYouPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Message sent"
        title="Thanks, we got your message"
        sub="We will reply within one business day with next steps. While you wait, see how we automated product images for a clothing brand."
      >
        <div className="dt-hero__actions">
          <Link className="dt-btn dt-btn--primary" href="/works/shirt-on-model">See our work</Link>
          <Link className="dt-btn dt-btn--secondary" href="/">Back to home</Link>
        </div>
      </PageHero>
    </SiteShell>
  );
}
