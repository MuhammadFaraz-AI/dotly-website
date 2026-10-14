export interface Faq {
  q: string;
  a: string;
}

const all = {
  what: {
    q: "What does Dotly do?",
    a: "Dotly is an AI automation studio. We build AI agents, n8n workflows, content pipelines, and websites that remove repetitive work for ecommerce and healthcare brands.",
  },
  timeline: {
    q: "How long does a first automation take?",
    a: "A working prototype usually takes 3 to 7 days after the audit, and a production version 1 to 3 weeks depending on the number of tools involved.",
  },
  needs: {
    q: "What do you need from us to start?",
    a: "A short description of the process, access to the tools involved, and one person who can answer questions.",
  },
  tools: {
    q: "Which tools do you use?",
    a: "n8n for workflows, OpenAI, Claude, and Gemini for the AI steps, LangGraph and FastAPI for custom agents and backends. We choose what fits your case.",
  },
  pricing: {
    q: "How do you price projects?",
    a: "Every project gets a fixed quote after the free audit, based on scope. There are no monthly plans or hourly surprises.",
  },
  costs: {
    q: "Are AI and tool costs included?",
    a: "Our fee covers the build. Usage costs from AI providers and tools are paid by you at cost, and we estimate them before you commit.",
  },
  data: {
    q: "Is my data safe?",
    a: "We use accounts and credentials in your name, limit access to what the workflow needs, and keep secrets out of code. We do not claim formal compliance certifications.",
  },
  support: {
    q: "Do you offer support after launch?",
    a: "Yes. Every project includes a handover and a support window, and optional ongoing support after that.",
  },
} satisfies Record<string, Faq>;

export const homeFaqs: Faq[] = [
  all.what, all.timeline, all.needs, all.tools, all.pricing, all.costs, all.data, all.support,
];
export const aboutFaqs: Faq[] = [all.what, all.timeline, all.needs, all.tools];
export const servicesFaqs: Faq[] = [all.timeline, all.pricing, all.costs, all.support];
export const contactFaqs: Faq[] = [all.needs, all.pricing, all.costs];
