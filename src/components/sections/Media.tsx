import Image from "next/image";
import type { CSSProperties } from "react";

interface MediaProps {
  src?: string;
  alt?: string;
  /** Whether `src` was confirmed to exist on disk (see src/lib/media.ts resolveImage). */
  exists?: boolean;
  /** Bracketed placeholder text shown when there is no image yet. */
  label: string;
  aspectRatio?: string;
  /** Required: pass the real responsive sizes for this slot's layout. */
  sizes: string;
  /** Only true for an image that is actually above the fold. Defaults to lazy. */
  priority?: boolean;
  /** Container class — keeps the slot's existing background, radius and shadow. */
  className?: string;
  /** True for a slot that is illustrative rather than meaningful content. */
  decorative?: boolean;
  style?: CSSProperties;
}

/**
 * Drop-in replacement for MediaPlaceholder: same container (class, aspect ratio,
 * radius, inset shadow, dark background) so nothing shifts, but shows a real
 * next/image (fill + cover) when one exists, falling back to the bracketed
 * placeholder text otherwise.
 */
export function Media({
  src,
  alt = "",
  exists,
  label,
  aspectRatio,
  sizes,
  priority = false,
  className = "dt-case__media",
  decorative = false,
  style,
}: MediaProps) {
  const containerStyle: CSSProperties = { aspectRatio, position: "relative", overflow: "hidden", ...style };
  const showImage = exists && !!src;

  return (
    <div className={className} style={containerStyle} aria-hidden={decorative ? true : undefined}>
      {showImage ? (
        <Image src={src} alt={decorative ? "" : alt} fill sizes={sizes} priority={priority} style={{ objectFit: "cover" }} />
      ) : (
        label
      )}
    </div>
  );
}
