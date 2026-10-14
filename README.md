# Dotly website

Next.js 16 (App Router) and TypeScript port of the Dotly design canvas. Pages are server components,
only interactive pieces (nav menu, accordions, FAQ, blog filter, contact form, admin) are client components.

## Run

```bash
cp .env.example .env.local   # set ADMIN_USER, ADMIN_PASSWORD, NEXT_PUBLIC_SITE_URL
npm install
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
npm run lint && npm run typecheck
```

Docker:

```bash
docker build --build-arg NEXT_PUBLIC_SITE_URL=https://yourdomain.com -t dotly .
docker run -p 3000:3000 -v dotly-data:/data -e ADMIN_USER=you -e ADMIN_PASSWORD=strong dotly
```

## Structure

```
src/
  app/                 routes: / /about /services /works /works/[slug] /blog /contact /thank-you /admin
    api/contact/       POST handler: validation (zod), honeypot, rate limit, optional attachment
  components/
    layout/            Nav (client), PageHero, Footer, SiteShell
    sections/          reusable page sections (CaseCard, FaqList, ServicesAccordion, StepSlider, ...)
    admin/             AdminApp (client) and sample data
    ui/Icon.tsx        typed Lucide icon registry
  content/             all copy as typed data: services, faqs, cases, posts, site config
  lib/                 leads schema, lead store (file adapter), rate limiter, media.ts (image existence check)
  styles/              tokens.css + components.css (design system), site.css, admin.css
  proxy.ts             Basic auth for /admin (Next 16 replacement for middleware.ts)
scripts/
  check-images.mjs     npm run check:images — size/ratio report for public/images (see "Images" below)
```

To change copy, edit `src/content/*`. To add a case study, add an entry to `cases.ts` and the page,
sitemap and static params follow automatically.

## Images

Real photography/renders live under `public/images/` (plus `public/og-image.png`). Every slot is wired
through a `{ src, alt }` field on the matching content entry (`cases.ts`, `services.ts`, `posts.ts`,
`site.ts`'s `founderImage`) — `src/lib/media.ts#resolveImage` checks on the server whether the file
actually exists, and the shared `<Media>` component (`src/components/sections/Media.tsx`) renders a real
`next/image` when it does, or falls back to the original bracketed placeholder text when it doesn't. So
nothing breaks if a file listed below hasn't been added yet — just drop it in at the path shown and it
replaces the placeholder automatically, no code changes needed.

Run `npm run check:images` any time to see which of these exist, their real pixel size and file size, and
whether they're over 300 KB or far off the ratio their slot expects.

| File | Ratio | Target size | Replaces |
| --- | --- | --- | --- |
| `public/images/works/shirt-on-model-card.webp` | 16:10 | < 300 KB | Case card thumbnail on `/` and `/works` |
| `public/images/works/shirt-on-model-hero.webp` | 21:9 | < 300 KB | Hero image on `/works/shirt-on-model` |
| `public/images/works/shirt-on-model-workflow.webp` | 21:9 | < 300 KB | Workflow canvas image on `/works/shirt-on-model` |
| `public/images/works/healthcare-images-card.webp` | 16:10 | < 300 KB | Case card thumbnail on `/` and `/works` |
| `public/images/works/healthcare-images-hero.webp` | 21:9 | < 300 KB | Hero image on `/works/healthcare-images` |
| `public/images/works/healthcare-images-workflow.webp` | 21:9 | < 300 KB | Workflow canvas image on `/works/healthcare-images` |
| `public/images/works/job-discovery-bot-card.webp` | 16:10 | < 300 KB | "Job discovery bot" card on `/works` |
| `public/images/works/n8n-quickstart-card.webp` | 16:10 | < 300 KB | "n8n Quickstart workflows" card on `/works` |
| `public/images/services/workflow-automation.webp` | 4:3 | < 300 KB | Service visual, `/services` accordion |
| `public/images/services/ai-agents.webp` | 4:3 | < 300 KB | Service visual, `/services` accordion |
| `public/images/services/content-pipelines.webp` | 4:3 | < 300 KB | Service visual, `/services` accordion |
| `public/images/services/websites.webp` | 4:3 | < 300 KB | Service visual, `/services` accordion |
| `public/images/services/social-marketing.webp` | 4:3 | < 300 KB | Service visual, `/services` accordion |
| `public/images/services/custom-apps.webp` | 4:3 | < 300 KB | Service visual, `/services` accordion |
| `public/images/blog/product-photography-n8n.webp` | 3:2 | < 300 KB | Post cover, `/blog` |
| `public/images/blog/agent-vs-chatbot-vs-automation.webp` | 3:2 | < 300 KB | Post cover, `/blog` |
| `public/images/blog/choose-ai-automation-agency.webp` | 3:2 | < 300 KB | Post cover, `/blog` |
| `public/images/blog/n8n-vs-zapier-vs-make.webp` | 3:2 | < 300 KB | Post cover, `/blog` |
| `public/images/blog/rag-chatbot.webp` | 3:2 | < 300 KB | Post cover, `/blog` |
| `public/images/blog/ecommerce-workflows.webp` | 3:2 | < 300 KB | Post cover, `/blog` |
| `public/images/team/founder.jpg` | 1:1 (square) | < 300 KB | Founder photo on `/` and `/about` |
| `public/og-image.png` | 1200×630 (1.91:1) | < 300 KB | Default Open Graph / Twitter card image |

Two ratios differ from what you'd naturally assume looking at the design, so regenerate to these if your
source images are a different shape:

- **Founder photo is square (1:1), not portrait.** `.dt-team__photo`'s CSS is `aspect-ratio:1`.
- **Services and blog slots had no ratio set in the CSS at all** before `<Media>` needed one to size `fill`
  images — 4:3 (services) and 3:2 (blog) are new, not a pre-existing constraint, chosen close to each
  slot's old `min-height`/column-width box. Case card/hero/workflow images are 16:10 and 21:9 as you'd
  expect, matching the `aspectRatio` already passed into each slot.

A missing or over-ratio image doesn't break the page — the placeholder (or a cover-cropped version of a
slightly-off image) just shows instead. `npm run check:images` is informational only and never fails the
build.

## Before going live

- Replace placeholders: `[hello@yourdomain]`, `[number]`, LinkedIn and Upwork links (`src/content/site.ts`),
  blog dates, privacy and terms pages. Founder photo and case study/service/blog images: see "Images" above —
  drop the file in at the listed path, no code change needed.
- Add `public/og-image.png` (1200×630) — the default share image is wired up in `src/app/layout.tsx` but the
  file itself isn't in the repo yet.
- Set `NEXT_PUBLIC_SITE_URL`, `ADMIN_USER`, `ADMIN_PASSWORD` (the admin returns 503 in production without them).
- Leads are saved as JSON lines under `LEADS_DATA_DIR` (default `.data/`). That suits one server or a Docker
  volume. On serverless hosting implement `LeadStore` in `src/lib/lead-store.ts` with a database (for example Supabase).
- Add a notification on new leads (email or an n8n webhook call inside `api/contact/route.ts`).
- The admin dashboard is a design with sample data and Basic auth. Connect it to the lead store and a real
  auth provider before relying on it.
- The in memory rate limiter is per instance. Use a shared store if you scale out.
