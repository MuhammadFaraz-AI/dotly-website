export interface ContentItem {
  id: string;
  title: string;
  meta: string;
  live: boolean;
}

/** Sample data for the Content/Settings views, which aren't wired to real data yet. */
export const samplePages: ContentItem[] = [
  { id: "home", title: "Home", meta: "Main page", live: true },
  { id: "about", title: "About", meta: "Who we are", live: true },
  { id: "services", title: "Services", meta: "What we do", live: true },
  { id: "works", title: "Works", meta: "Case studies", live: true },
  { id: "blog", title: "Blog", meta: "Articles", live: true },
  { id: "contact", title: "Contact", meta: "Form and details", live: true },
];

export const samplePosts: ContentItem[] = [
  { id: "p1", title: "[Post title 1]", meta: "Automation", live: false },
  { id: "p2", title: "[Post title 2]", meta: "Websites", live: false },
  { id: "p3", title: "[Post title 3]", meta: "Social media", live: false },
  { id: "p4", title: "[Post title 4]", meta: "Marketing", live: false },
];

export const sampleServices: ContentItem[] = [
  { id: "s1", title: "Workflow automation (n8n)", meta: "Service", live: true },
  { id: "s2", title: "AI agents and chatbots", meta: "Service", live: true },
  { id: "s3", title: "AI content and image pipelines", meta: "Service", live: true },
  { id: "s4", title: "Websites that convert", meta: "Service", live: true },
  { id: "s5", title: "Social media and marketing automation", meta: "Service", live: true },
  { id: "s6", title: "Custom AI apps and integrations", meta: "Service", live: true },
];

export const sampleWorks: ContentItem[] = [
  { id: "w1", title: "01 Shirt on model automation", meta: "Case study", live: true },
  { id: "w2", title: "02 Healthcare product image pipeline", meta: "Case study", live: true },
];

export const weekVisits = [
  { day: "Mon", value: 40 },
  { day: "Tue", value: 55 },
  { day: "Wed", value: 48 },
  { day: "Thu", value: 72 },
  { day: "Fri", value: 90 },
  { day: "Sat", value: 35 },
  { day: "Sun", value: 60 },
];
