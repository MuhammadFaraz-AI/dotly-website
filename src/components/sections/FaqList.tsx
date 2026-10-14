"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import type { Faq } from "@/content/faqs";

export function FaqList({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="dt-faq">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <Reveal
            as="div"
            className="dt-faq__row"
            data-open={isOpen ? "" : undefined}
            key={f.q}
            index={i}
            stagger={80}
          >
            <button
              type="button"
              className="dt-faq__q"
              aria-expanded={isOpen}
              aria-controls={`faq-${i}`}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <span>{f.q}</span>
              <span className="dt-faq__mark">
                <Icon name={isOpen ? "minus" : "plus"} />
              </span>
            </button>
            <div className="dt-faq__a" aria-hidden={!isOpen}>
              <div id={`faq-${i}`}>
                <p>{f.a}</p>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
