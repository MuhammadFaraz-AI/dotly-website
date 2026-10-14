"use client";

import { useRef } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";

export interface Step {
  icon: IconName;
  title: string;
  text: string;
  /** Optional duration chip shown beside the icon. */
  time?: string;
}

interface StepSliderProps {
  steps: Step[];
  controls?: boolean;
}

export function StepSlider({ steps, controls = false }: StepSliderProps) {
  const track = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.max(el.clientWidth * 0.8, 280), behavior: "smooth" });
  };

  return (
    <>
      <div className="dt-slider" ref={track}>
        {steps.map((s, i) => (
          <Reveal as="article" className="dt-step" key={s.title} index={i} stagger={80}>
            <div className="dt-step__top">
              <span className="dt-tile">
                <Icon name={s.icon} />
              </span>
              {s.time && <span className="dt-chip">{s.time}</span>}
            </div>
            <h3 className="h3">{s.title}</h3>
            <p className="dt-muted">{s.text}</p>
            <div className="dt-step__foot">
              <span className="dt-step__num">
                {String(i + 1).padStart(2, "0")}/{String(steps.length).padStart(2, "0")}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
      {controls && (
        <div className="dt-slider__ctrl">
          <button type="button" className="dt-btn dt-btn--secondary dt-btn--circle" aria-label="Previous" onClick={() => scroll(-1)}>
            <Icon name="chevron-left" />
          </button>
          <button type="button" className="dt-btn dt-btn--secondary dt-btn--circle" aria-label="Next" onClick={() => scroll(1)}>
            <Icon name="chevron-right" />
          </button>
        </div>
      )}
    </>
  );
}
