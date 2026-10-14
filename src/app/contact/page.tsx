import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { SiteShell } from "@/components/layout/SiteShell";
import { ContactForm } from "@/components/sections/ContactForm";
import { FaqList } from "@/components/sections/FaqList";
import { Opener } from "@/components/sections/Opener";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { contactFaqs } from "@/content/faqs";
import { contactSteps } from "@/content/pages";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: { absolute: "Contact Dotly | Book a Free AI Automation Audit" },
};

const info: { icon: IconName; title: string; text: string }[] = [
  { icon: "mail", title: "Email", text: siteConfig.contact.email },
  { icon: "phone", title: "WhatsApp", text: siteConfig.contact.phone },
  { icon: "map-pin", title: "Location", text: "Based in Karachi, Pakistan, working with clients worldwide" },
];

export default function ContactPage() {
  const { socials } = siteConfig;
  return (
    <SiteShell>
      <PageHero
        eyebrow="Contact"
        title="Let's build something that runs itself"
        sub="Tell us what slows your team down. We reply within one business day."
        ctaHref="#form"
      />

      <section className="wrap" style={{ paddingTop: 48 }}>
        <div className="info-grid">
          {info.map((i, idx) => (
            <Reveal as="article" className="dt-feature info" key={i.title} index={idx} stagger={80}>
              <span className="dt-tile"><Icon name={i.icon} /></span>
              <h3 className="h3" style={{ fontSize: 22 }}>{i.title}</h3>
              <p>{i.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <Reveal as="section" id="form" className="wrap sec">
        <div className="contact-grid">
          <div className="contact-copy">
            <span className="dt-chip dt-chip--eyebrow">Free audit</span>
            <h2 className="h2">Book a free automation audit</h2>
            <p className="body-lg dt-muted">
              Tell us what you want to build or automate. Book a free 30 minute audit and leave with a clear
              next step, even if we never work together.
            </p>
            <ol className="steps">
              {contactSteps.map((s) => (
                <li key={s.n}>
                  <span className="dt-step__num" style={{ fontSize: 28 }}>{s.n}</span>
                  <div>
                    <h3 className="h3" style={{ fontSize: 20 }}>{s.title}</h3>
                    <p className="dt-muted">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="dt-muted">
              Prefer to pick a time?{" "}
              <a href="#" style={{ color: "inherit", textDecoration: "underline" }}>Book here</a> [calendar link to add].
            </p>
            <div className="dt-row">
              <a className="dt-btn dt-btn--secondary" href={socials.linkedin}>LinkedIn</a>
              <a className="dt-btn dt-btn--secondary" href={socials.upwork}>Upwork</a>
              <a className="dt-btn dt-btn--secondary" href={socials.github} rel="noopener noreferrer">GitHub</a>
            </div>
          </div>
          <ContactForm />
        </div>
      </Reveal>

      <Reveal as="section" className="wrap sec" style={{ paddingTop: 0 }}>
        <Opener eyebrow="FAQs" title="Frequently asked questions">
          Straight answers before you book.
        </Opener>
        <FaqList items={contactFaqs} />
      </Reveal>
    </SiteShell>
  );
}
