import Link from "next/link";
import { Media } from "./Media";
import { stack } from "@/content/pages";
import { siteConfig } from "@/content/site";
import { resolveImage } from "@/lib/media";

interface TeamCardProps {
  photoLabel: string;
  role: string;
  bio: string;
  showAbout?: boolean;
  showGithub?: boolean;
}

export function TeamCard({ photoLabel, role, bio, showAbout, showGithub }: TeamCardProps) {
  const { socials } = siteConfig;
  const photo = resolveImage(siteConfig.founderImage);
  return (
    <article className="dt-team">
      <Media
        label={photoLabel}
        className="dt-team__photo"
        src={photo?.src}
        alt={photo?.alt}
        exists={photo?.exists}
        sizes="(min-width: 811px) 320px, 100vw"
      />
      <div className="dt-team__body">
        <h3 className="h2">{siteConfig.founder}</h3>
        <p className="dt-team__role body-lg">{role}</p>
        <p className="dt-muted">{bio}</p>
        <div className="dt-row">
          {stack.map((s) => (
            <span className="dt-chip" key={s}>
              {s}
            </span>
          ))}
        </div>
        <div className="dt-row">
          <a className="dt-btn dt-btn--secondary" href={socials.linkedin}>
            LinkedIn
          </a>
          <a className="dt-btn dt-btn--secondary" href={socials.upwork}>
            Upwork
          </a>
          {showGithub && (
            <a className="dt-btn dt-btn--secondary" href={socials.github} rel="noopener noreferrer">
              GitHub
            </a>
          )}
          {showAbout && (
            <Link className="dt-btn dt-btn--secondary" href="/about">
              About me
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
