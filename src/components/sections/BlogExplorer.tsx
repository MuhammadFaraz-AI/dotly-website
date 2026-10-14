"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { Media } from "./Media";
import { Reveal } from "@/components/ui/Reveal";
import { popularTopics, postCategories, type Post } from "@/content/posts";
import type { ResolvedImage } from "@/lib/media";

type Filter = "All" | (typeof postCategories)[number];

/** The server parent resolves each post's image (fs isn't available here, a client
 * component) and passes the result in via this field. */
export type PostWithImage = Post & { resolvedImage?: ResolvedImage };

export function BlogExplorer({ posts }: { posts: PostWithImage[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const filters: Filter[] = ["All", ...postCategories];
  const countFor = (f: Filter) => (f === "All" ? posts.length : posts.filter((p) => p.category === f).length);
  const visible = filter === "All" ? posts : posts.filter((p) => p.category === filter);

  return (
    <div className="blog-grid">
      <div className="posts">
        {visible.map((p, i) => (
          <Reveal as="article" className="dt-case post" key={p.title} index={i} stagger={80}>
            <Media
              label="[Cover image]"
              className="post__media"
              decorative
              src={p.resolvedImage?.src}
              alt={p.resolvedImage?.alt}
              exists={p.resolvedImage?.exists}
              sizes="(min-width: 811px) 260px, 100vw"
            />
            <div className="post__body">
              <span className="dt-chip">{p.category}</span>
              <h3 className="h3" style={{ fontSize: 24 }}>{p.title}</h3>
              <p className="dt-muted">{p.excerpt}</p>
              <div className="post__foot">
                <a className="dt-btn dt-btn--secondary" href="#">
                  Read more <Icon name="arrow-up-right" />
                </a>
                <span className="dt-muted small">[date]</span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      <aside className="side" aria-label="Filter posts">
        <h2 className="h3" style={{ fontSize: 24 }}>Categories</h2>
        <div className="cats">
          {filters.map((f) => (
            <button type="button" className="cat" key={f} aria-pressed={filter === f} onClick={() => setFilter(f)}>
              <span>{f}</span>
              <span className="dt-muted">{countFor(f)}</span>
            </button>
          ))}
        </div>
        <h2 className="h3" style={{ fontSize: 24, marginTop: 16 }}>Popular topics</h2>
        <div className="dt-row">
          {popularTopics.map((t) => (
            <span className="dt-chip" key={t}>{t}</span>
          ))}
        </div>
      </aside>
    </div>
  );
}
