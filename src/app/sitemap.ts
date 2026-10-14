import type { MetadataRoute } from "next";
import { cases } from "@/content/cases";
import { siteConfig } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/about", "/services", "/works", "/blog", "/contact", ...cases.map((c) => `/works/${c.slug}`)];
  return paths.map((p) => ({
    url: `${siteConfig.url}${p}`,
    changeFrequency: "monthly",
    priority: p === "" ? 1 : 0.7,
  }));
}
