import fs from "node:fs";
import path from "node:path";

const PUBLIC_DIR = path.join(process.cwd(), "public");

/**
 * Server-only: checks whether a public-relative path (e.g. "/images/works/foo.webp")
 * exists on disk. Uses `fs`, so only call this from server components/pages — client
 * components (ServicesAccordion, BlogExplorer) can't use it directly and must receive
 * the resolved result as a prop from their server parent instead.
 */
export function mediaExists(publicPath: string): boolean {
  return fs.existsSync(path.join(PUBLIC_DIR, publicPath.replace(/^\//, "")));
}

export interface ImageRef {
  src: string;
  alt: string;
}

export interface ResolvedImage extends ImageRef {
  exists: boolean;
}

/** Looks up whether an optional content image actually exists on disk. Server-only. */
export function resolveImage(image?: ImageRef): ResolvedImage | undefined {
  if (!image) return undefined;
  return { ...image, exists: mediaExists(image.src) };
}
