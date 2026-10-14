import type { CSSProperties, ReactNode } from "react";
import { Nav } from "./Nav";

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  sub?: ReactNode;
  minHeight?: number;
  titleMaxWidth?: number;
  ctaHref?: string;
  children?: ReactNode;
}

/** Hero banner with the floating nav, used at the top of every public page. */
export function PageHero({
  eyebrow,
  title,
  sub,
  minHeight = 460,
  titleMaxWidth = 860,
  ctaHref,
  children,
}: PageHeroProps) {
  const style: CSSProperties = { minHeight, alignContent: "center" };
  return (
    <div className="hero-wrap">
      <section className="dt-hero" style={style}>
        <div className="dt-hero__bg" />
        <div className="dt-hero__nav">
          <Nav ctaHref={ctaHref} />
        </div>
        <span className="dt-chip dt-chip--eyebrow">{eyebrow}</span>
        <h1 className="display" style={{ maxWidth: titleMaxWidth }}>
          {title}
        </h1>
        {sub && <p className="dt-hero__sub">{sub}</p>}
        {children}
      </section>
    </div>
  );
}
