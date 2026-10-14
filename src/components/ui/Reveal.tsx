"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties, ElementType, HTMLAttributes, ReactNode } from "react";

type Tag = "div" | "section" | "article" | "li" | "span" | "footer" | "aside";

interface RevealProps extends Omit<HTMLAttributes<HTMLElement>, "className" | "style" | "children"> {
  /** Element to render. Keep this the same tag the design relies on (grid/flex item, list item, ...). */
  as?: Tag;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Position in a list, combined with `stagger` to space items out. */
  index?: number;
  /** Delay step in ms per `index`. */
  stagger?: number;
  /** Explicit delay in ms, takes priority over index/stagger. */
  delay?: number;
  /** Rise distance in px, defaults to --dt-reveal-y (site.css). */
  y?: number;
  threshold?: number;
}

/**
 * Fades + rises content into view once, the first time it crosses `threshold`.
 * No JS: children render plain and fully visible (the hidden state is only ever
 * applied by this effect, after mount). Reduced motion: skipped entirely.
 */
export function Reveal({
  as = "div",
  children,
  className,
  index,
  stagger,
  delay,
  y,
  threshold = 0.15,
  style,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    el.classList.add("dt-reveal");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("dt-reveal--visible");
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const computedDelay = delay ?? (index != null ? index * (stagger ?? 0) : undefined);
  const vars: Record<string, string> = {};
  if (computedDelay) vars["--dt-reveal-delay"] = `${computedDelay}ms`;
  if (y != null) vars["--dt-reveal-y"] = `${y}px`;

  const Element = as as ElementType;
  return (
    <Element ref={ref} className={className} style={{ ...vars, ...style }} {...rest}>
      {children}
    </Element>
  );
}
