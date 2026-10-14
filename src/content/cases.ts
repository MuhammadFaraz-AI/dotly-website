import type { IconName } from "@/components/ui/Icon";
import type { ImageRef } from "@/lib/media";

export interface CaseStep {
  icon: IconName;
  title: string;
  text: string;
}

export interface CaseStudy {
  slug: string;
  number: string;
  title: string;
  /** Eyebrow-free short title used on cards. */
  cardTitle: string;
  client: string;
  problem: string;
  /** Short solution used on the Works page. */
  solutionShort: string;
  solution: string;
  resultShort: string;
  result: string;
  tools: string;
  metrics: string[];
  cardMedia: string;
  heroMedia: string;
  canvasMedia: string;
  cardImage?: ImageRef;
  heroImage?: ImageRef;
  canvasImage?: ImageRef;
  detail: {
    metaTitle: string;
    title: string;
    sub: string;
    hardPart: { title: string; text: string };
    how: { title: string; text: string };
    steps: CaseStep[];
  };
}

export const cases: CaseStudy[] = [
  {
    slug: "shirt-on-model",
    number: "01",
    title: "Shirt on model automation",
    cardTitle: "Shirt on model automation",
    client: "DTC clothing brand",
    problem:
      "Every new color or design meant booking a model and a shoot, which was slow and costly.",
    solutionShort:
      "An n8n workflow places the shirt on the model with AI, and a check step catches bad outputs.",
    solution:
      "An n8n workflow takes a product image and a model image, AI generates the shirt on the model, a check step catches bad outputs, and the final image lands in the product folder.",
    resultShort: "Days of shooting became minutes.",
    result: "Days of shooting became minutes, and the images are used on the live store.",
    tools: "n8n, AI image generation, cloud storage [exact tools to confirm]",
    metrics: ["Days to minutes", "No model booked per color", "Live on the store"],
    cardMedia: "[CASE-1-card: before and after sample output]",
    heroMedia: "[CASE-1-hero: before and after of the shirt on model]",
    canvasMedia: "[CASE-1-canvas: n8n workflow screenshot, client data blurred]",
    cardImage: {
      src: "/images/works/shirt-on-model-card.webp",
      alt: "Stylized 3D render of a folded t-shirt and the same shirt worn on a mannequin, linked by a glowing line through an AI processing icon",
    },
    heroImage: {
      src: "/images/works/shirt-on-model-hero.webp",
      alt: "Illustration of a folded shirt becoming a shirt worn on a mannequin, connected through a glowing AI processing icon",
    },
    canvasImage: {
      src: "/images/works/shirt-on-model-workflow.webp",
      alt: "Screenshot of the n8n workflow that places the shirt on the model, with client data blurred",
    },
    detail: {
      metaTitle: "Case study: shirt on model automation",
      title: "Shirt on model images in minutes, not model shoots",
      sub: "How a DTC clothing brand replaced model shoots with an n8n workflow that places shirts on models in minutes.",
      hardPart: {
        title: "Making the output trustworthy",
        text: "Generating an image was easy. Making the output consistent enough to trust without checking each one by hand was the real work.",
      },
      how: {
        title: "Four steps from input to store",
        text: "A product image and a model image go in, and a clean, store ready image comes out.",
      },
      steps: [
        { icon: "search", title: "Input", text: "A product image and a model image." },
        { icon: "zap", title: "Generate", text: "AI places the shirt on the model." },
        { icon: "layers", title: "Check", text: "A check step catches bad or unusable outputs." },
        { icon: "shield-check", title: "Deliver", text: "The final image lands in the product folder." },
      ],
    },
  },
  {
    slug: "healthcare-images",
    number: "02",
    title: "Healthcare product image pipeline",
    cardTitle: "Healthcare product image pipeline",
    client: "Healthcare product brand",
    problem: "Each new product listing needed photographers, editing and a long turnaround.",
    solutionShort:
      "An n8n pipeline generates consistent on brand images, validates data and retries failures.",
    solution:
      "An n8n pipeline takes product details, generates consistent on brand images with AI, validates the data, and retries failures.",
    resultShort: "Image production cut from days to minutes.",
    result: "Image production cut from days to minutes, with no photoshoot per new product.",
    tools: "n8n, AI image generation [exact tools to confirm]",
    metrics: ["Days to minutes", "No photoshoot per product", "Retries and validation"],
    cardMedia: "[CASE-2-card: product image set]",
    heroMedia: "[CASE-2-hero: product image set, no health claims]",
    canvasMedia: "[CASE-2-canvas: n8n workflow screenshot, client data blurred]",
    cardImage: {
      src: "/images/works/healthcare-images-card.webp",
      alt: "Stylized 3D render of skincare bottles, jars and a pouch on pedestals, with one pedestal marked by a glowing checkmark",
    },
    heroImage: {
      src: "/images/works/healthcare-images-hero.webp",
      alt: "Illustration of amber and white product containers on pedestals, with a glowing checkmark marking the approved image",
    },
    canvasImage: {
      src: "/images/works/healthcare-images-workflow.webp",
      alt: "Screenshot of the n8n pipeline that generates and validates the product images, with client data blurred",
    },
    detail: {
      metaTitle: "Case study: healthcare product image pipeline",
      title: "On brand product images, generated automatically",
      sub: "An n8n pipeline that generates consistent, on brand product images for a healthcare brand, cutting production from days to minutes.",
      hardPart: {
        title: "Consistent quality at scale",
        text: "Keeping style, lighting, and quality consistent across many products without a person checking each image.",
      },
      how: {
        title: "Built to not break",
        text: "Data validation and retries mean a bad input or a failed generation does not stop the batch.",
      },
      steps: [
        { icon: "search", title: "Input", text: "Product details go into the pipeline." },
        { icon: "zap", title: "Generate", text: "AI creates consistent on brand images." },
        { icon: "layers", title: "Validate", text: "Data is checked and failed generations are retried." },
        { icon: "shield-check", title: "Deliver", text: "Files come out ready to use." },
      ],
    },
  },
];

export interface OtherWork {
  number: string;
  kind: string;
  title: string;
  media: string;
  image?: ImageRef;
  cta: { label: string; href: string };
  metrics: string[];
  fields: { label: string; value: string }[];
}

/** Works that do not have a full case study page yet. */
export const otherWorks: OtherWork[] = [
  {
    number: "03",
    kind: "Own project",
    title: "Job discovery bot",
    media: "[WORKS-3: workflow canvas or Sheet screenshot]",
    image: {
      src: "/images/works/job-discovery-bot-card.webp",
      alt: "Abstract 3D diagram of glossy nodes connected by glowing lines in a lattice, representing the job-listing scoring workflow",
    },
    cta: { label: "Read the write up", href: "#" },
    metrics: ["Runs unattended", "Scored by Claude", "Logged to Google Sheets"],
    fields: [
      {
        label: "What it does",
        value:
          "Pulls listings from the n8n Community board and n8ndevs.com, scores them with Claude, and logs the best to Google Sheets.",
      },
      { label: "Tools", value: "n8n, Claude, Google Sheets" },
    ],
  },
  {
    number: "04",
    kind: "Open source",
    title: "n8n Quickstart workflows",
    media: "[WORKS-4: GitHub repo screenshot]",
    image: {
      src: "/images/works/n8n-quickstart-card.webp",
      alt: "Screenshot of the published n8n Quickstart workflows repository on GitHub",
    },
    cta: { label: "View the repo", href: "https://github.com/MuhammadFaraz-AI" },
    metrics: ["13 workflows", "Public on GitHub", "n8n Quickstart"],
    fields: [
      {
        label: "What it is",
        value: "13 workflows built for the official n8n Quickstart certificate, published on GitHub.",
      },
      { label: "Tools", value: "n8n" },
    ],
  },
];

export function getCase(slug: string): CaseStudy | undefined {
  return cases.find((c) => c.slug === slug);
}
