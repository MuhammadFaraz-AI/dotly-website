import type { IconName } from "@/components/ui/Icon";

export const processSteps: { icon: IconName; title: string; time: string; text: string }[] = [
  {
    icon: "search",
    title: "Audit",
    time: "1 to 3 days",
    text: "We map how the work happens today and find the automation with the biggest payoff.",
  },
  {
    icon: "zap",
    title: "Prototype",
    time: "3 to 7 days",
    text: "A working first version on your real data, so you see results early.",
  },
  {
    icon: "layers",
    title: "Build and test",
    time: "1 to 3 weeks",
    text: "Production build with retries, error alerts, and human approval where it matters.",
  },
  {
    icon: "shield-check",
    title: "Launch and support",
    time: "After launch",
    text: "Handover, simple documentation, and monitoring so it keeps working.",
  },
];

export const proofStats: { value: string; label: string; small?: boolean }[] = [
  { value: "Days to minutes", label: "Product image production for a DTC clothing brand", small: true },
  { value: "2+ years", label: "Building with n8n and AI agents" },
  { value: "3", label: "Certifications: n8n Quickstart, n8n101 Essentials, Hermes Agent Setup" },
  { value: "13", label: "Workflows open source on GitHub from the n8n Quickstart program" },
];

export const hubFeatures: {
  left: { icon: IconName; title: string; text: string }[];
  right: { icon: IconName; title: string; text: string }[];
} = {
  left: [
    { icon: "workflow", title: "Built for real clients", text: "Our workflows run on live stores, not demos." },
    { icon: "bot", title: "Reliable by design", text: "Retries, validation, and alerts so nothing fails silently." },
    { icon: "globe", title: "Plain English, clear scope", text: "You know exactly what you get before we start." },
  ],
  right: [
    { icon: "share-2", title: "You own your system", text: "Documentation and handover are included." },
    { icon: "megaphone", title: "Direct access", text: "You work with the person building your system." },
    { icon: "aperture", title: "Honest advice", text: "If something should not be automated, we say so." },
  ],
};

export const values: { icon: IconName; title: string; text: string }[] = [
  { icon: "target", title: "Clear scope", text: "You know what you get before we start." },
  { icon: "message-square", title: "Reliable builds", text: "Retries, validation, and alerts are part of every workflow." },
  { icon: "check", title: "Honest advice", text: "If something should not be automated, we say so." },
  { icon: "shield-check", title: "Real numbers only", text: "If a result is not confirmed, we do not claim it." },
];

export const credentials: { icon: IconName; title: string; sub: string; year: string }[] = [
  { icon: "badge-check", title: "n8n Quickstart certificate", sub: "13 workflows published on GitHub", year: "[Year]" },
  { icon: "badge-check", title: "n8n101 Essentials certification", sub: "Awarded September 9, 2026", year: "2026" },
  { icon: "badge-check", title: "Hermes Agent Setup certificate", sub: "FreeAcademy.ai", year: "2026" },
  { icon: "calendar-clock", title: "About 2 years of experience", sub: "Building with n8n and AI agents", year: "2+ years" },
];

export const stack = ["n8n", "LangChain", "LangGraph", "FastAPI", "MCP servers"] as const;

export const contactSteps = [
  { n: "01", title: "We reply within one business day", text: "You get a personal reply with next steps." },
  { n: "02", title: "A free 30 minute audit call", text: "We learn your goal and look at your current setup." },
  { n: "03", title: "You get a written plan", text: "Scope, timeline and a fixed quote." },
] as const;

export const needOptions = ["AI automation", "Website", "Social media", "Marketing"] as const;
