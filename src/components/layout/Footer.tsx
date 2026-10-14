import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { footerLinks, siteConfig } from "@/content/site";

export function Footer() {
  const { socials } = siteConfig;
  return (
    <Reveal as="footer" className="wrap dt-footer">
      <div className="dt-footer__ghost" aria-hidden="true">
        Dotly
      </div>
      <Image src="/logo.png" alt="Dotly" width={64} height={64} style={{ borderRadius: 14 }} />
      <p>Dotly, AI automation studio</p>
      <div className="dt-socials">
        <a className="dt-btn dt-btn--secondary" href={socials.linkedin}>
          LinkedIn
        </a>
        <a className="dt-btn dt-btn--secondary" href={socials.upwork}>
          Upwork
        </a>
        <a className="dt-btn dt-btn--secondary" href={socials.github} rel="noopener noreferrer">
          GitHub
        </a>
      </div>
      <div className="dt-footer__bar">
        <nav className="dt-footer__links" aria-label="Footer">
          {footerLinks.map((l) => (
            <Link key={l.label} href={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>
        <span className="dt-footer__copy">&copy; {new Date().getFullYear()} Dotly. All rights reserved.</span>
        <a className="dt-footer__top" href="#">
          Back to top &uarr;
        </a>
      </div>
    </Reveal>
  );
}
