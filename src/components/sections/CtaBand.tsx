import Link from "next/link";

export function CtaBand() {
  return (
    <section className="wrap" style={{ paddingBottom: 48 }}>
      <div className="dt-hero" style={{ minHeight: 360, padding: "64px 24px", alignContent: "center" }}>
        <div className="dt-hero__bg" />
        <span className="dt-chip dt-chip--eyebrow">Free audit</span>
        <h2 className="h2" style={{ maxWidth: 720 }}>
          Not sure what to automate first?
        </h2>
        <p className="dt-hero__sub">
          Book a free 30 minute audit. We look at your workflow, show you the highest value automation,
          and give you a written plan, even if we never work together.
        </p>
        <Link className="dt-btn dt-btn--primary" href="/contact">
          Book a free automation audit
        </Link>
      </div>
    </section>
  );
}
