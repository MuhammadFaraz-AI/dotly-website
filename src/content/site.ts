export const siteConfig = {
  name: "Dotly",
  tagline: "AI automation studio",
  description:
    "Dotly builds AI agents and n8n workflows for ecommerce and healthcare brands. Product images in minutes, leads followed up automatically, support answered around the clock.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  founder: "Muhammad Faraz",
  founderImage: { src: "/images/team/founder.jpg", alt: "Muhammad Faraz, founder of Dotly" },
  location: "Karachi, Pakistan",
  socials: {
    linkedin: "#",
    upwork: "#",
    github: "https://github.com/MuhammadFaraz-AI",
  },
  contact: {
    email: "[hello@yourdomain]",
    phone: "[number]",
  },
} as const;

export interface NavLink {
  href: string;
  label: string;
}

export const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/works", label: "Works" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export const footerLinks: NavLink[] = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/works", label: "Works" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
  { href: "#", label: "Privacy" },
  { href: "#", label: "Terms" },
];

export const tools = [
  "n8n",
  "OpenAI",
  "Claude",
  "Gemini",
  "LangGraph",
  "LangChain",
  "FastAPI",
  "Supabase",
  "Docker",
  "Google Sheets",
  "Slack",
] as const;
