import type { ImageRef } from "@/lib/media";

export interface Service {
  title: string;
  /** Short copy used on the home page accordion. */
  summary: string;
  summaryTags: string[];
  /** Long copy used on the services page accordion. */
  details: string;
  detailTags: string[];
  /** Decorative visual shown in the details accordion's .svc-media slot. */
  image?: ImageRef;
}

export const services: Service[] = [
  {
    title: "Workflow automation (n8n)",
    summary:
      "Connect your tools and remove copy and paste work. Leads get followed up, orders sync, and reports send themselves.",
    summaryTags: ["n8n", "Google Workspace", "Slack"],
    details:
      "Connect your tools and remove copy and paste work. Leads get followed up, orders sync, reports send themselves. We build lead intake and follow up flows, CRM and calendar sync, email and message automations, and reporting and data cleanup. Good fit: your team repeats the same steps in several apps every day.",
    detailTags: ["n8n", "Google Workspace", "Slack", "CRMs", "Webhooks and APIs"],
    image: { src: "/images/services/workflow-automation.webp", alt: "" },
  },
  {
    title: "AI agents and chatbots",
    summary:
      "Assistants that answer questions from your own documents and hand over to a human when needed.",
    summaryTags: ["LangGraph", "OpenAI", "RAG"],
    details:
      "Assistants that answer questions from your own documents and hand over to a human when needed. We build RAG knowledge assistants, support agents, internal helpers, and lead qualification agents. Good fit: customers or staff ask the same questions again and again.",
    detailTags: ["LangGraph", "LangChain", "OpenAI", "Claude", "Vector databases", "FastAPI"],
    image: { src: "/images/services/ai-agents.webp", alt: "" },
  },
  {
    title: "AI content and image pipelines",
    summary:
      "Turn product data and photos into finished visuals automatically. This is where Dotly has live client proof.",
    summaryTags: ["n8n", "Image generation", "Quality checks"],
    details:
      "Turn product data and photos into finished visuals automatically. This is where Dotly has live client proof. We build shirt on model image workflows, product image generation with quality checks, and listing and caption generation. Good fit: every new product means a new photoshoot or hours of editing.",
    detailTags: ["n8n", "Image generation models", "Cloud storage", "Review steps"],
    image: { src: "/images/services/content-pipelines.webp", alt: "" },
  },
  {
    title: "Websites that convert",
    summary:
      "Fast, clear websites with the SEO groundwork built in and forms that feed your automations.",
    summaryTags: ["Landing pages", "Structured data", "GA4"],
    details:
      "Fast, clear websites with the SEO groundwork built in and forms that feed your automations. We build marketing sites, landing pages for ads, structured data, and contact forms connected to n8n. Good fit: you need a credible site or a landing page for ads.",
    detailTags: ["HTML or Framer", "GSAP animation", "Search Console", "GA4"],
    image: { src: "/images/services/websites.webp", alt: "" },
  },
  {
    title: "Social media and marketing automation",
    summary:
      "Set up your social pages and automate the repeat work behind content, outreach, and lead capture.",
    summaryTags: ["n8n", "LinkedIn", "Google Sheets"],
    details:
      "Set up your social pages and automate the repeat work behind content, outreach, and lead capture. We build page setup and content calendars, content drafting and scheduling workflows, lead capture and follow up, and simple reporting. Automated posting follows each platform's rules, with a human review step. Good fit: you want consistent marketing without a full time team.",
    detailTags: ["n8n", "LinkedIn and platform APIs", "Google Sheets", "AI writing with review"],
    image: { src: "/images/services/social-marketing.webp", alt: "" },
  },
  {
    title: "Custom AI apps and integrations",
    summary:
      "When off the shelf tools are not enough, we build secure backends and connect AI to your systems.",
    summaryTags: ["FastAPI", "MCP", "Docker"],
    details:
      "When off the shelf tools are not enough, we build secure backends and connect AI to your systems. We build FastAPI services, MCP servers, tool calling agents, and integrations with internal systems. Good fit: you need something specific that no ready made tool does.",
    detailTags: ["Python", "FastAPI", "Docker", "MCP", "Supabase"],
    image: { src: "/images/services/custom-apps.webp", alt: "" },
  },
];
