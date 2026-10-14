import type { ImageRef } from "@/lib/media";

export const postCategories = ["Automation", "AI Agents", "Ecommerce", "Guides"] as const;
export type PostCategory = (typeof postCategories)[number];

export interface Post {
  category: PostCategory;
  title: string;
  excerpt: string;
  /** Decorative cover image shown in the .post__media slot. */
  image?: ImageRef;
}

export const posts: Post[] = [
  {
    category: "Automation",
    title: "How to automate product photography with n8n and AI",
    excerpt:
      "Why model shoots do not scale, and the four stage workflow that replaces them: input, generate, check, deliver.",
    image: { src: "/images/blog/product-photography-n8n.webp", alt: "" },
  },
  {
    category: "AI Agents",
    title: "AI agent vs chatbot vs automation: what is the difference?",
    excerpt: "Plain definitions, a comparison table, and when a small business should use each one.",
    image: { src: "/images/blog/agent-vs-chatbot-vs-automation.webp", alt: "" },
  },
  {
    category: "Guides",
    title: "How to choose an AI automation agency: a checklist",
    excerpt: "Ten questions to ask, the red flags to watch for, and what a good audit looks like.",
    image: { src: "/images/blog/choose-ai-automation-agency.webp", alt: "" },
  },
  {
    category: "Guides",
    title: "n8n vs Zapier vs Make for small businesses",
    excerpt: "Hosting, flexibility, cost model and learning curve compared, and who each tool suits.",
    image: { src: "/images/blog/n8n-vs-zapier-vs-make.webp", alt: "" },
  },
  {
    category: "AI Agents",
    title: "What is a RAG chatbot and does your business need one?",
    excerpt:
      "How a chatbot answers from your own documents, good and bad use cases, and how answers are tested.",
    image: { src: "/images/blog/rag-chatbot.webp", alt: "" },
  },
  {
    category: "Ecommerce",
    title: "7 workflows every ecommerce brand should automate first",
    excerpt:
      "Lead follow up, product images, order updates, support triage, review requests, reporting and inventory alerts.",
    image: { src: "/images/blog/ecommerce-workflows.webp", alt: "" },
  },
];

export const popularTopics = ["n8n", "AI agents", "Product images", "Ecommerce", "Workflows"] as const;
