import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { SiteShell } from "@/components/layout/SiteShell";
import { CtaBand } from "@/components/sections/CtaBand";
import { Media } from "@/components/sections/Media";
import { Opener } from "@/components/sections/Opener";
import { StepSlider } from "@/components/sections/StepSlider";
import { Reveal } from "@/components/ui/Reveal";
import { cases, getCase } from "@/content/cases";
import { resolveImage } from "@/lib/media";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const study = getCase(slug);
  if (!study) return {};
  const hero = resolveImage(study.heroImage);
  const ogImages = hero?.exists
    ? [{ url: hero.src, width: 2100, height: 900, alt: hero.alt }]
    : undefined;
  return {
    title: study.detail.metaTitle,
    description: study.detail.sub,
    openGraph: ogImages ? { images: ogImages } : undefined,
    twitter: ogImages ? { card: "summary_large_image", images: ogImages } : undefined,
  };
}

export default async function CaseStudyPage({ params }: { params: Params }) {
  const { slug } = await params;
  const study = getCase(slug);
  if (!study) notFound();
  const { detail } = study;
  const hero = resolveImage(study.heroImage);
  const canvas = resolveImage(study.canvasImage);

  return (
    <SiteShell>
      <PageHero eyebrow="Case study" title={detail.title} sub={detail.sub} />

      <Reveal as="section" className="wrap sec" style={{ paddingTop: 48 }}>
        <article className="dt-case">
          <Media
            label={study.heroMedia}
            aspectRatio="21/9"
            src={hero?.src}
            alt={hero?.alt}
            exists={hero?.exists}
            sizes="(min-width: 1200px) 1200px, 100vw"
          />
          <div className="dt-case__body">
            <dl className="dt-case__fields">
              <div><dt>Client</dt><dd>{study.client}</dd></div>
              <div><dt>Problem</dt><dd>{study.problem}</dd></div>
              <div><dt>Solution</dt><dd>{study.solution}</dd></div>
              <div><dt>Result</dt><dd>{study.result}</dd></div>
              <div><dt>Tools</dt><dd>{study.tools}</dd></div>
            </dl>
          </div>
        </article>
      </Reveal>

      <Reveal as="section" className="wrap sec" style={{ paddingTop: 0 }}>
        <Opener eyebrow="The hard part" title={detail.hardPart.title}>
          {detail.hardPart.text}
        </Opener>
      </Reveal>

      <Reveal as="section" className="wrap sec" style={{ paddingTop: 0 }}>
        <Opener eyebrow="How it works" title={detail.how.title}>
          {detail.how.text}
        </Opener>
        <StepSlider steps={detail.steps} />
        <Media
          label={study.canvasMedia}
          aspectRatio="21/9"
          src={canvas?.src}
          alt={canvas?.alt}
          exists={canvas?.exists}
          sizes="(min-width: 1200px) 1200px, 100vw"
          style={{ marginTop: 24 }}
        />
      </Reveal>

      <CtaBand />
    </SiteShell>
  );
}
