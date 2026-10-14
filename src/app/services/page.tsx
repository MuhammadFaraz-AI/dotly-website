import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { SiteShell } from "@/components/layout/SiteShell";
import { CtaBand } from "@/components/sections/CtaBand";
import { FaqList } from "@/components/sections/FaqList";
import { Opener } from "@/components/sections/Opener";
import { ServicesAccordion } from "@/components/sections/ServicesAccordion";
import { StepSlider } from "@/components/sections/StepSlider";
import { Reveal } from "@/components/ui/Reveal";
import { servicesFaqs } from "@/content/faqs";
import { processSteps } from "@/content/pages";
import { services } from "@/content/services";
import { resolveImage } from "@/lib/media";

export const metadata: Metadata = { title: { absolute: "AI Automation Services | Dotly" } };

export default function ServicesPage() {
  const servicesWithImages = services.map((s) => ({ ...s, resolvedImage: resolveImage(s.image) }));

  return (
    <SiteShell>
      <PageHero
        eyebrow="Services"
        title="Build smarter with AI that does real work"
        sub="From first audit to a system that runs itself."
      />

      <Reveal as="section" id="services" className="wrap sec" style={{ paddingTop: 48 }}>
        <Opener eyebrow="What we do" title="End to end AI services">
          We turn ambiguous AI ideas into working features and workflows. Strategy, build, and support, with one
          person accountable.
        </Opener>
        <ServicesAccordion items={servicesWithImages} variant="details" />
      </Reveal>

      <div className="wrap">
        <div className="panel-white">
          <Reveal as="section" className="sec" style={{ paddingTop: 0 }}>
            <Opener eyebrow="Process" title="From idea to a system that runs itself">
              Four steps, with something you can review early.
            </Opener>
            <StepSlider steps={processSteps} controls />
          </Reveal>
        </div>
      </div>

      <Reveal as="section" className="wrap sec" style={{ paddingTop: 0 }}>
        <Opener eyebrow="FAQs" title="Frequently asked questions">
          Straight answers before you book.
        </Opener>
        <FaqList items={servicesFaqs} />
      </Reveal>

      <CtaBand />
    </SiteShell>
  );
}
