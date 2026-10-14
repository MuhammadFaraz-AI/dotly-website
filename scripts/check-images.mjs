#!/usr/bin/env node
// Checks the expected site images under public/: existence, pixel size, file size,
// and aspect ratio against the slot each one is meant to fill. Re-run any time with
// `npm run check:images`. Informational only — never fails the build.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

let sharp;
try {
  ({ default: sharp } = await import("sharp"));
} catch {
  console.error(
    "Could not load sharp (it ships as an optional dependency of Next.js — run `npm install` again if this keeps happening).",
  );
  process.exit(1);
}

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC_DIR = path.join(ROOT, "public");

const SIZE_WARN_BYTES = 300 * 1024;
const RATIO_TOLERANCE = 0.08; // 8%: flag anything further off than this from its slot

// Real ratios read from the CSS/components, not assumed ones — see README's
// "Images" section for where each was measured.
const SLOTS = {
  "works-card": { w: 16, h: 10, note: ".dt-case__media on /works and home (CaseCard aspectRatio=16/10)" },
  "works-hero": { w: 21, h: 9, note: ".dt-case__media hero on /works/[slug] (aspectRatio=21/9)" },
  "works-workflow": { w: 21, h: 9, note: ".dt-case__media canvas on /works/[slug] (aspectRatio=21/9)" },
  services: { w: 4, h: 3, note: ".svc-media in the services accordion (no ratio was set in CSS before this change — 4:3 is now the defined slot)" },
  blog: { w: 3, h: 2, note: ".post__media on /blog (no ratio was set in CSS before this change — 3:2 is now the defined slot, close to its old 260x180 min-size)" },
  team: { w: 1, h: 1, note: ".dt-team__photo on /about and home (CSS aspect-ratio:1 — square, not the assumed 4:5)" },
  og: { w: 1200, h: 630, note: "Open Graph / Twitter card convention" },
};

const EXPECTED = [
  { file: "images/works/shirt-on-model-card.webp", slot: "works-card" },
  { file: "images/works/shirt-on-model-hero.webp", slot: "works-hero" },
  { file: "images/works/shirt-on-model-workflow.webp", slot: "works-workflow" },
  { file: "images/works/healthcare-images-card.webp", slot: "works-card" },
  { file: "images/works/healthcare-images-hero.webp", slot: "works-hero" },
  { file: "images/works/healthcare-images-workflow.webp", slot: "works-workflow" },
  { file: "images/works/job-discovery-bot-card.webp", slot: "works-card" },
  { file: "images/works/n8n-quickstart-card.webp", slot: "works-card" },
  { file: "images/services/workflow-automation.webp", slot: "services" },
  { file: "images/services/ai-agents.webp", slot: "services" },
  { file: "images/services/content-pipelines.webp", slot: "services" },
  { file: "images/services/websites.webp", slot: "services" },
  { file: "images/services/social-marketing.webp", slot: "services" },
  { file: "images/services/custom-apps.webp", slot: "services" },
  { file: "images/blog/product-photography-n8n.webp", slot: "blog" },
  { file: "images/blog/agent-vs-chatbot-vs-automation.webp", slot: "blog" },
  { file: "images/blog/choose-ai-automation-agency.webp", slot: "blog" },
  { file: "images/blog/n8n-vs-zapier-vs-make.webp", slot: "blog" },
  { file: "images/blog/rag-chatbot.webp", slot: "blog" },
  { file: "images/blog/ecommerce-workflows.webp", slot: "blog" },
  { file: "images/team/founder.webp", slot: "team" },
  { file: "og-image.png", slot: "og" },
];

function fmtBytes(n) {
  return n > 1024 * 1024 ? `${(n / 1024 / 1024).toFixed(2)} MB` : `${(n / 1024).toFixed(1)} KB`;
}

function gcd(a, b) {
  return b ? gcd(b, a % b) : a;
}

function ratioStr(w, h) {
  const g = gcd(Math.round(w), Math.round(h));
  return `${Math.round(w / g)}:${Math.round(h / g)}`;
}

console.log("\nSlots (from CSS/components):");
for (const [key, s] of Object.entries(SLOTS)) {
  console.log(`  ${key.padEnd(14)} ${ratioStr(s.w, s.h).padEnd(6)} ${s.note}`);
}

let foundCount = 0;
let missingCount = 0;
let warnCount = 0;
const rows = [];

for (const item of EXPECTED) {
  const abs = path.join(PUBLIC_DIR, item.file);
  const rel = path.join("public", item.file);
  if (!fs.existsSync(abs)) {
    missingCount++;
    rows.push({ status: "missing", file: rel });
    continue;
  }
  foundCount++;
  const stat = fs.statSync(abs);
  const meta = await sharp(abs).metadata();
  const { width: w, height: h } = meta;
  const expected = SLOTS[item.slot];
  const actualRatio = w / h;
  const expectedRatio = expected.w / expected.h;
  const diff = Math.abs(actualRatio - expectedRatio) / expectedRatio;

  const warnings = [];
  if (stat.size > SIZE_WARN_BYTES) warnings.push(`over 300 KB (${fmtBytes(stat.size)})`);
  if (diff > RATIO_TOLERANCE) {
    warnings.push(`ratio ${ratioStr(w, h)} is ${(diff * 100).toFixed(0)}% off the ${ratioStr(expected.w, expected.h)} slot (${item.slot})`);
  }
  if (warnings.length) warnCount++;

  rows.push({
    status: "ok",
    file: rel,
    dims: `${w}x${h}`,
    ratio: ratioStr(w, h),
    size: fmtBytes(stat.size),
    warnings,
  });
}

console.log(`\nImages — ${foundCount} found, ${missingCount} missing, ${warnCount} with warnings:\n`);
for (const r of rows) {
  if (r.status === "missing") {
    console.log(`  —  ${r.file}  (missing — placeholder stays)`);
  } else {
    const warn = r.warnings.length ? `  ⚠ ${r.warnings.join("; ")}` : "";
    console.log(`  ✓  ${r.file}  ${r.dims}  ratio ${r.ratio}  ${r.size}${warn}`);
  }
}
console.log("");
