import { Icon, type IconName } from "@/components/ui/Icon";
import { hubFeatures } from "@/content/pages";
import { Reveal } from "@/components/ui/Reveal";
import { HubConnectors } from "./HubConnectors";
import { HubTile } from "./HubTile";
import { Opener } from "./Opener";

function Column({ items }: { items: { icon: IconName; title: string; text: string }[] }) {
  return (
    <div className="dt-hubgrid__col">
      {items.map((f, i) => (
        <Reveal as="article" className="dt-feature dt-feature--sm" key={f.title} index={i} stagger={80}>
          <span className="dt-tile">
            <Icon name={f.icon} />
          </span>
          <h3 className="h3">{f.title}</h3>
          <p>{f.text}</p>
        </Reveal>
      ))}
    </div>
  );
}

export function FeatureHub() {
  return (
    <div className="wrap">
      <div className="dt-panel-white" style={{ marginBottom: 48 }}>
        <section style={{ padding: 0 }}>
          <Opener eyebrow="Why Dotly" title="Why brands work with Dotly">
            One builder, real client proof, and systems that do not fail silently.
          </Opener>
          <div className="dt-hubgrid">
            <HubConnectors />
            <Column items={hubFeatures.left} />
            <HubTile />
            <Column items={hubFeatures.right} />
          </div>
        </section>
      </div>
    </div>
  );
}
