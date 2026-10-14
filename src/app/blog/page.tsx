import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { SiteShell } from "@/components/layout/SiteShell";
import { BlogExplorer } from "@/components/sections/BlogExplorer";
import { CtaBand } from "@/components/sections/CtaBand";
import { Reveal } from "@/components/ui/Reveal";
import { posts } from "@/content/posts";
import { resolveImage } from "@/lib/media";

export const metadata: Metadata = {
  title: { absolute: "AI Automation Blog | n8n, AI Agents, and Workflows | Dotly" },
};

export default function BlogPage() {
  const postsWithImages = posts.map((p) => ({ ...p, resolvedImage: resolveImage(p.image) }));

  return (
    <SiteShell>
      <PageHero
        eyebrow="Blog"
        title="Notes from the build"
        sub="Practical guides on n8n, AI agents, and automation for ecommerce and healthcare brands."
      />
      <Reveal as="section" className="wrap" style={{ paddingTop: 48, paddingBottom: 96 }}>
        <BlogExplorer posts={postsWithImages} />
      </Reveal>
      <CtaBand />
    </SiteShell>
  );
}
