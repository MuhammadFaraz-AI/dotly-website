import Link from "next/link";
import { CaseCard } from "@/components/sections/CaseCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { FaqList } from "@/components/sections/FaqList";
import { FeatureHub } from "@/components/sections/FeatureHub";
import { Opener } from "@/components/sections/Opener";
import { ServicesAccordion } from "@/components/sections/ServicesAccordion";
import { StepSlider } from "@/components/sections/StepSlider";
import { TeamCard } from "@/components/sections/TeamCard";
import { ToolsStrip } from "@/components/sections/ToolsStrip";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/layout/PageHero";
import { SiteShell } from "@/components/layout/SiteShell";
import { cases } from "@/content/cases";
import { homeFaqs } from "@/content/faqs";
import { processSteps, proofStats } from "@/content/pages";
import { services } from "@/content/services";

export default function HomePage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="AI automation studio"
        minHeight={720}
        titleMaxWidth={960}
        title={
          <>
            Automate the work that slows your brand down.
            <span className="dt-hero__pill" aria-hidden="true">
              <span><Icon name="workflow" /></span>
              <span><Icon name="sparkles" /></span>
              <span><Icon name="code" /></span>
            </span>
          </>
        }
        sub="Dotly builds AI agents and n8n workflows for ecommerce and healthcare brands. Product images in minutes, leads followed up automatically, support answered around the clock."
      >
        <div className="dt-hero__actions">
          <Link className="dt-btn dt-btn--primary" href="/contact">Book a free automation audit</Link>
          <Link className="dt-btn dt-btn--secondary" href="/works">See our work</Link>
        </div>
        <p className="dt-hero__sub" style={{ fontSize: 14, margin: 0 }}>
          n8n certified. Built with n8n, OpenAI, LangGraph, and FastAPI.
        </p>
        <a className="dt-chip" href="#services" style={{ textDecoration: "none" }}>
          Scroll <Icon name="arrow-down" />
        </a>
      </PageHero>

      <ToolsStrip />

      <section className="wrap" style={{ paddingBottom: 48 }}>
        <div className="dt-stats">
          {proofStats.map((s, i) => (
            <Reveal as="div" className="dt-stat" key={s.label} index={i} stagger={80}>
              <span className="dt-stat__num" style={s.small ? { fontSize: 34, lineHeight: 1.4 } : undefined}>
                {s.value}
              </span>
              <span className="dt-stat__label">{s.label}</span>
            </Reveal>
          ))}
        </div>
      </section>

      <Reveal as="section" id="services" className="wrap sec" style={{ paddingTop: 48 }}>
        <Opener eyebrow="Services" title="Everything you need to run on autopilot">
          We turn slow, manual work into systems that run on their own. Pick one service or combine them.
        </Opener>
        <ServicesAccordion items={services} variant="summary" />
      </Reveal>

      <Reveal as="section" id="works" className="wrap sec" style={{ paddingTop: 0 }}>
        <Opener eyebrow="Selected work" title="Real workflows, running for real brands">
          Two client builds, shown as problem, solution and result.
        </Opener>
        <div className="cases">
          {cases.map((c, i) => (
            <CaseCard
              key={c.slug}
              index={i}
              media={c.cardMedia}
              image={c.cardImage}
              aspectRatio="16/10"
              title={`${c.number} ${c.title}`}
              cta={{ label: "Read the case study", href: `/works/${c.slug}` }}
              metrics={c.metrics}
              fields={[
                { label: "Client", value: c.client },
                { label: "Problem", value: c.problem },
                { label: "Solution", value: c.solution },
                { label: "Result", value: c.result },
              ]}
            />
          ))}
        </div>
      </Reveal>

      <Reveal as="section" className="wrap sec" style={{ paddingTop: 0 }}>
        <Opener eyebrow="Process" title="From idea to a system that runs itself">
          Four steps, with something you can review early.
        </Opener>
        <StepSlider steps={processSteps} />
      </Reveal>

      <FeatureHub />

      <Reveal as="section" className="wrap sec" style={{ paddingTop: 0 }}>
        <Opener eyebrow="Founder" title="Built by one person you can talk to">
          One lead, working directly with you from the first call to handover.
        </Opener>
        <TeamCard
          photoLabel="[FOUNDER-1: clean headshot, light background]"
          role="Founder and AI developer, Dotly"
          bio="I build AI agents and automations. I have worked with n8n and AI agents for about two years, and I teach Agentic AI to students in Karachi. When you hire Dotly, you work directly with the person building your system."
          showAbout
        />
      </Reveal>

      <Reveal as="section" className="wrap sec" style={{ paddingTop: 0 }}>
        <Opener eyebrow="FAQs" title="Frequently asked questions">
          Straight answers before you book.
        </Opener>
        <FaqList items={homeFaqs} />
      </Reveal>

      <CtaBand />
    </SiteShell>
  );
}
