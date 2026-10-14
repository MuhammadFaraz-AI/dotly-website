import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { SiteShell } from "@/components/layout/SiteShell";
import { CaseCard } from "@/components/sections/CaseCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { Opener } from "@/components/sections/Opener";
import { Reveal } from "@/components/ui/Reveal";
import { cases, otherWorks } from "@/content/cases";

export const metadata: Metadata = {
  title: { absolute: "AI Automation Case Studies and Projects | Dotly" },
};

export default function WorksPage() {
  return (
    <SiteShell>
      <PageHero eyebrow="Works" title="Explore our AI work" sub="Real workflows, built and running." />

      <Reveal as="section" className="wrap sec" style={{ paddingTop: 48 }}>
        <div className="cases">
          {cases.map((c, i) => (
            <CaseCard
              key={c.slug}
              index={i}
              media={c.cardMedia}
              image={c.cardImage}
              aspectRatio="16/10"
              eyebrow="Client work"
              title={`${c.number} ${c.title}`}
              cta={{ label: "Read the case study", href: `/works/${c.slug}` }}
              metrics={c.metrics}
              fields={[
                { label: "Client", value: c.client },
                { label: "Problem", value: c.problem },
                { label: "Solution", value: c.solutionShort },
                { label: "Result", value: c.resultShort },
              ]}
            />
          ))}
          {otherWorks.map((w, i) => (
            <CaseCard
              key={w.number}
              index={cases.length + i}
              media={w.media}
              image={w.image}
              aspectRatio="16/10"
              eyebrow={w.kind}
              title={`${w.number} ${w.title}`}
              cta={w.cta}
              metrics={w.metrics}
              fields={w.fields}
            />
          ))}
        </div>
      </Reveal>

      <section className="wrap" style={{ paddingBottom: 0 }}>
        <Opener title="Have a similar problem?" />
      </section>

      <CtaBand />
    </SiteShell>
  );
}
