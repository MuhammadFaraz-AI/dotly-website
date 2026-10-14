import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { SiteShell } from "@/components/layout/SiteShell";
import { CtaBand } from "@/components/sections/CtaBand";
import { FaqList } from "@/components/sections/FaqList";
import { Opener } from "@/components/sections/Opener";
import { StepSlider } from "@/components/sections/StepSlider";
import { TeamCard } from "@/components/sections/TeamCard";
import { ToolsStrip } from "@/components/sections/ToolsStrip";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { aboutFaqs } from "@/content/faqs";
import { credentials, processSteps, stack, values } from "@/content/pages";

export const metadata: Metadata = {
  title: { absolute: "About Dotly | AI Automation Studio in Karachi" },
};

export default function AboutPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="About"
        title="A small studio that builds automations that last"
        sub="Dotly designs and builds AI agents and workflows for brands that want their time back."
      />

      <Reveal as="section" id="about" className="wrap sec">
        <Opener eyebrow="About us" title="Who we are">
          A solo studio, stated honestly: one builder, real client work, and the tools behind it.
        </Opener>
        <div className="dt-about">
          <div className="dt-about__loc">
            <div className="dt-globe" />
            <span className="dt-pin" aria-hidden="true" />
            <span className="dt-chip dt-chip--eyebrow">Location</span>
            <h3 className="h3">
              Based in Karachi, Pakistan. Working with clients in the Gulf, the US, and worldwide.
            </h3>
            <Link className="dt-btn dt-btn--primary" href="/contact">Start a Project</Link>
          </div>
          <div className="dt-about__body">
            <div className="dt-card">
              <h3 className="h3">Our mission</h3>
              <p>
                Our mission is simple: remove the repetitive work from your business with systems you can
                trust. We start small, prove the result, then expand.
              </p>
              <div className="dt-row">
                {stack.map((s) => (
                  <span className="dt-chip" key={s}>{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal as="section" className="wrap sec" style={{ paddingTop: 0 }}>
        <Opener eyebrow="Core values" title="Guided by principles">
          Four rules we apply to every project.
        </Opener>
        <div className="dt-why">
          {values.map((v, i) => (
            <Reveal as="article" className="dt-feature" key={v.title} index={i} stagger={80}>
              <span className="dt-tile"><Icon name={v.icon} /></span>
              <h3 className="h3">{v.title}</h3>
              <p>{v.text}</p>
            </Reveal>
          ))}
        </div>
      </Reveal>

      <Reveal as="section" className="wrap sec" style={{ paddingTop: 0 }}>
        <Opener eyebrow="Founder" title="The person behind your project">
          One lead, working directly with you from the first call to handover.
        </Opener>
        <TeamCard
          photoLabel="[FOUNDER-2: clean headshot, light background]"
          role="Founder and AI Developer"
          bio="I am an AI developer with about two years of hands on experience building with n8n and AI agents. My stack includes Python, FastAPI, LangChain, LangGraph, RAG pipelines, and MCP servers. I have built automations for a DTC clothing brand and a healthcare brand, and I teach Agentic AI to bootcamp students. I hold a Diploma in Cloud Computing from NED University."
          showGithub
        />
      </Reveal>

      <section className="wrap" style={{ paddingBottom: 96 }}>
        <div className="dt-band dt-dark">
          <div className="dt-cred">
            <div className="dt-cred__head">
              <span className="dt-chip dt-chip--dark">Credentials</span>
              <h2 className="h2">What backs the work</h2>
              <p>Only real credentials are listed here.</p>
            </div>
            {credentials.map((c, i) => (
              <Reveal as="div" className="dt-cred__row" key={c.title} index={i} stagger={80}>
                <span className="dt-tile"><Icon name={c.icon} /></span>
                <span>{c.title}</span>
                <span className="dt-cred__sub">{c.sub}</span>
                <span className="dt-cred__year">{c.year}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ToolsStrip />

      <Reveal as="section" className="wrap sec" style={{ paddingTop: 0 }}>
        <Opener eyebrow="How we work" title="How we work">
          Four steps, with something you can review early.
        </Opener>
        <StepSlider steps={processSteps} />
      </Reveal>

      <Reveal as="section" className="wrap sec" style={{ paddingTop: 0 }}>
        <Opener eyebrow="FAQs" title="Frequently asked questions">
          Straight answers before you book.
        </Opener>
        <FaqList items={aboutFaqs} />
      </Reveal>

      <CtaBand />
    </SiteShell>
  );
}
