"use client";

import { useEffect, useRef } from "react";

/**
 * The center "Dotly" tile in the Why Dotly hub. A client component because its
 * hover/touch state has to reach sideways into sibling elements (the connector
 * dots in HubConnectors, the 6 feature cards) via a shared [data-hub-active]
 * attribute on the common .dt-hubgrid ancestor, which plain CSS :hover can't do
 * for siblings that come before this element in the DOM.
 */
export function HubTile() {
  const ref = useRef<HTMLDivElement>(null);
  const touchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  function setActive(active: boolean) {
    const grid = ref.current?.closest(".dt-hubgrid");
    if (!grid) return;
    if (active) grid.setAttribute("data-hub-active", "");
    else grid.removeAttribute("data-hub-active");
  }

  function handleTouchStart() {
    setActive(true);
    if (touchTimeout.current) clearTimeout(touchTimeout.current);
    touchTimeout.current = setTimeout(() => setActive(false), 1500);
  }

  // One-time pop-in entrance when the section first scrolls into view, then the
  // connector lines/dots start shortly after (see HubConnectors' own delay).
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    el.classList.add("dt-hub--pop-ready");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.remove("dt-hub--pop-ready");
          el.classList.add("dt-hub--popped");
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    return () => {
      if (touchTimeout.current) clearTimeout(touchTimeout.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="dt-hub"
      aria-hidden="true"
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onTouchStart={handleTouchStart}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="1" />
      </svg>
      <span>Dotly</span>
    </div>
  );
}
