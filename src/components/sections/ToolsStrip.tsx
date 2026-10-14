import { tools } from "@/content/site";

export function ToolsStrip() {
  // The track is duplicated so the CSS marquee can loop seamlessly.
  const loop = [...tools, ...tools];
  return (
    <section className="wrap" style={{ paddingTop: 32, paddingBottom: 32 }}>
      <div className="dt-strip">
        <p className="dt-muted small">Built with the tools real businesses run on</p>
        <div className="dt-marquee">
          <div className="dt-marquee__track">
            {loop.map((t, i) => (
              <span className="dt-marquee__item" key={`${t}-${i}`} aria-hidden={i >= tools.length ? true : undefined}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
