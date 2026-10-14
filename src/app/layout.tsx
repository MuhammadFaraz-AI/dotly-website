import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "@fontsource/urbanist/400.css";
import "@fontsource/urbanist/500.css";
import "@fontsource/urbanist/600.css";
import "@/styles/tokens.css";
import "@/styles/components.css";
import "@/styles/site.css";
import { siteConfig } from "@/content/site";

const DEFAULT_TITLE = "Dotly | AI Automation and AI Agents Studio";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: DEFAULT_TITLE, template: "%s | Dotly" },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: DEFAULT_TITLE,
    description: siteConfig.description,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: siteConfig.description }],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: siteConfig.description,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: siteConfig.description }],
  },
};

export const viewport: Viewport = {
  themeColor: "#ededec",
  width: "device-width",
  initialScale: 1,
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  logo: `${siteConfig.url}/logo.png`,
  founder: { "@type": "Person", name: siteConfig.founder },
  areaServed: "Worldwide",
  sameAs: [siteConfig.socials.github],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
