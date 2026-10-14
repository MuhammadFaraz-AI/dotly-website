import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Media } from "./Media";
import { resolveImage, type ImageRef } from "@/lib/media";

interface CaseCardProps {
  media: string;
  image?: ImageRef;
  aspectRatio: string;
  eyebrow?: string;
  title: string;
  cta: { label: string; href: string };
  metrics: string[];
  fields: { label: string; value: string }[];
  /** Position in a grid/list, staggers the reveal animation. */
  index?: number;
}

export function CaseCard({ media, image, aspectRatio, eyebrow, title, cta, metrics, fields, index = 0 }: CaseCardProps) {
  const external = cta.href.startsWith("http");
  const resolved = resolveImage(image);
  const link = (
    <>
      {cta.label} <Icon name="arrow-up-right" />
    </>
  );
  return (
    <Reveal as="article" className="dt-case" index={index} stagger={80}>
      <Media
        label={media}
        aspectRatio={aspectRatio}
        src={resolved?.src}
        alt={resolved?.alt}
        exists={resolved?.exists}
        sizes="(min-width: 1200px) 50vw, 100vw"
      />
      <div className="dt-case__body">
        {eyebrow && <span className="dt-chip dt-chip--eyebrow">{eyebrow}</span>}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <h3 className="h3">{title}</h3>
          {external ? (
            <a className="dt-btn dt-btn--secondary" href={cta.href} rel="noopener noreferrer">
              {link}
            </a>
          ) : (
            <Link className="dt-btn dt-btn--secondary" href={cta.href}>
              {link}
            </Link>
          )}
        </div>
        <div className="dt-case__metrics">
          {metrics.map((m) => (
            <span className="dt-chip" key={m}>
              {m}
            </span>
          ))}
        </div>
        <dl className="dt-case__fields">
          {fields.map((f) => (
            <div key={f.label}>
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Reveal>
  );
}
