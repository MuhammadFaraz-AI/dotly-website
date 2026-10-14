"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { Media } from "./Media";
import { Reveal } from "@/components/ui/Reveal";
import type { Service } from "@/content/services";
import type { ResolvedImage } from "@/lib/media";

/** The server parent resolves each service's image (fs isn't available here, a client
 * component) and passes the result in via this field. */
export type ServiceWithImage = Service & { resolvedImage?: ResolvedImage };

interface ServicesAccordionProps {
  items: ServiceWithImage[];
  /** "summary" is the compact home variant, "details" adds the visual slot and long copy. */
  variant: "summary" | "details";
}

export function ServicesAccordion({ items, variant }: ServicesAccordionProps) {
  const [open, setOpen] = useState<number | null>(0);
  const detailed = variant === "details";

  return (
    <div className="dt-acc">
      {items.map((s, i) => {
        const isOpen = open === i;
        const tags = detailed ? s.detailTags : s.summaryTags;
        return (
          <Reveal
            as="div"
            className="dt-acc__row"
            data-open={isOpen ? "" : undefined}
            key={s.title}
            index={i}
            stagger={80}
          >
            <button
              type="button"
              className="dt-acc__head"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <span>{s.title}</span>
              <span className="dt-acc__icon">
                <Icon name="arrow-up-right" />
              </span>
            </button>
            <div className="dt-acc__body" aria-hidden={!isOpen}>
              <div className={detailed ? "dt-acc__inner svc-inner" : "dt-acc__inner"}>
                {detailed && (
                  <Media
                    label="[SERVICE visual: glossy 3D object]"
                    className="svc-media"
                    decorative
                    src={s.resolvedImage?.src}
                    alt={s.resolvedImage?.alt}
                    exists={s.resolvedImage?.exists}
                    sizes="(min-width: 811px) 40vw, 100vw"
                  />
                )}
                <p className="dt-acc__desc">{detailed ? s.details : s.summary}</p>
                <div className="dt-acc__tags">
                  {tags.map((t) => (
                    <span className="dt-chip dt-chip--dark" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
                <span className="dt-acc__index" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
