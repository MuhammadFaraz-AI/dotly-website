"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

interface LineInfo {
  id: string;
  d: string;
  cardX: number;
  cardY: number;
  factor: number;
  delay: number;
}

/** Per-line stagger: duration factor (applied to --dt-hub-dot-duration) and delay in seconds. */
const FACTORS = [0.85, 1.05, 0.95, 1.15, 0.9, 1.1];
const DELAYS = [0, 0.5, 1.1, 0.3, 0.8, 1.3];

/** Lines/dots start this long after the section becomes visible, so the HubTile's
 * own pop-in entrance (--dt-hub-pop-duration in site.css) finishes first. */
const START_DELAY_MS = 450;

/**
 * SVG overlay for the "Why Dotly" hub: draws one curved connector per feature
 * card to the center tile, with a small dot animated along each via CSS
 * offset-path. Desktop-only (>=1200px, matching where .dt-hub itself is shown),
 * paused off-screen, and inert under prefers-reduced-motion (handled by the
 * sitewide `.dt *` animation:none rule in components.css, so lines + a static
 * dot still render, they just don't move). Each dot/node's actual animation
 * duration is computed in CSS from --dt-hub-dot-duration * --line-factor *
 * --dt-hub-speed, so hovering the hub tile (which sets --dt-hub-speed on the
 * shared .dt-hubgrid ancestor) speeds every line up without touching this file.
 */
export function HubConnectors() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<LineInfo[] | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const grid = container?.parentElement;
    if (!container || !grid) return;

    const hub = grid.querySelector<HTMLElement>(".dt-hub");
    const cols = grid.querySelectorAll<HTMLElement>(".dt-hubgrid__col");
    const leftCards = Array.from(cols[0]?.querySelectorAll<HTMLElement>(".dt-feature--sm") ?? []);
    const rightCards = Array.from(cols[1]?.querySelectorAll<HTMLElement>(".dt-feature--sm") ?? []);

    function measure() {
      if (!hub || !window.matchMedia("(min-width:1200px)").matches) {
        setLines(null);
        return;
      }
      const gridRect = grid!.getBoundingClientRect();
      const hubRect = hub.getBoundingClientRect();
      const hubY = hubRect.top + hubRect.height / 2 - gridRect.top;
      const hubLeftX = hubRect.left - gridRect.left;
      const hubRightX = hubRect.right - gridRect.left;

      const next: LineInfo[] = [];
      leftCards.forEach((card, i) => {
        const r = card.getBoundingClientRect();
        const cardX = r.right - gridRect.left;
        const cardY = r.top + r.height / 2 - gridRect.top;
        const midX = (hubLeftX + cardX) / 2;
        next.push({
          id: `l${i}`,
          d: `M ${hubLeftX} ${hubY} C ${midX} ${hubY}, ${midX} ${cardY}, ${cardX} ${cardY}`,
          cardX,
          cardY,
          factor: FACTORS[i],
          delay: DELAYS[i],
        });
      });
      rightCards.forEach((card, i) => {
        const r = card.getBoundingClientRect();
        const cardX = r.left - gridRect.left;
        const cardY = r.top + r.height / 2 - gridRect.top;
        const midX = (hubRightX + cardX) / 2;
        next.push({
          id: `r${i}`,
          d: `M ${hubRightX} ${hubY} C ${midX} ${hubY}, ${midX} ${cardY}, ${cardX} ${cardY}`,
          cardX,
          cardY,
          factor: FACTORS[i + 3],
          delay: DELAYS[i + 3],
        });
      });
      setLines(next);
    }

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(grid);
    window.addEventListener("resize", measure);
    document.fonts?.ready?.then(measure).catch(() => {});

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let timeout: ReturnType<typeof setTimeout> | null = null;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timeout = setTimeout(() => el.setAttribute("data-active", ""), START_DELAY_MS);
        } else {
          if (timeout) clearTimeout(timeout);
          el.removeAttribute("data-active");
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      if (timeout) clearTimeout(timeout);
    };
  }, []);

  return (
    <div ref={containerRef} className="dt-hubfx" aria-hidden="true">
      {lines && (
        <>
          <svg>
            {lines.map((l) => (
              <path key={l.id} d={l.d} className="dt-hubfx__line" />
            ))}
            {lines.map((l) => (
              <circle
                key={`${l.id}-node`}
                cx={l.cardX}
                cy={l.cardY}
                r={3}
                className="dt-hubfx__node"
                style={
                  {
                    "--line-factor": l.factor,
                    animationDelay: `${l.delay}s`,
                  } as CSSProperties
                }
              />
            ))}
          </svg>
          {lines.map((l) => (
            <span
              key={`${l.id}-dot`}
              className="dt-hubfx__dot"
              style={
                {
                  offsetPath: `path("${l.d}")`,
                  "--line-factor": l.factor,
                  animationDelay: `${l.delay}s`,
                } as CSSProperties
              }
            />
          ))}
        </>
      )}
    </div>
  );
}
