import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Item with a title and a lower-hierarchy description (tools, features, results)
export const namedItem = z.object({ name: z.string(), reason: z.string() });

export const projectTranslation = z.object({
  title: z.string(),
  client: z.string(),
  period: z.string(),
  role: z.string(),
  resultHeadline: z.string(),
  // Search snippet overrides: title ≤60 chars, description 140–160 chars.
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  // Card/list view (used by ProjectCard)
  summary: z.string().optional(),
  highlights: z.array(z.string()).optional(),
  // Extended detail sections
  context: z.string().optional(),
  conditions: z.string().optional(),
  solution: z.string().optional(),
  tools: z.array(namedItem).optional(),
  features: z.array(namedItem).optional(),
  results: z.array(namedItem).optional(),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    order: z.number(),
    // Work done as an employee is not shown as studio work.
    type: z.enum(["own", "client"]),
    stack: z.array(z.string()),
    // Image paths under /public, shared across languages
    coverImage: z.string().optional(),
    gallery: z.array(z.string()).optional(),
    preview_url: z.string().optional(),
    en: projectTranslation,
    es: projectTranslation,
  }),
});

export const faqItem = z.object({ q: z.string(), a: z.string() });

export const serviceTranslation = z.object({
  title: z.string(),
  problem: z.string(),
  desc: z.string(),
  // Search snippet overrides: title ≤60 chars, description 140–160 chars.
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  deliverables: z.array(z.string()),
  faq: z.array(faqItem),
});

const services = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/services" }),
  schema: z.object({
    order: z.number(),
    stack: z.array(z.string()),
    relatedProjectIds: z.array(z.string()).optional(),
    en: serviceTranslation,
    es: serviceTranslation,
  }),
});

// One markdown file per language (body is long-form prose, unlike `projects`).
const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    lang: z.enum(["en", "es"]),
    title: z.string(),
    excerpt: z.string(),
    // Search snippet overrides: title ≤60 chars, description 140–160 chars.
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    date: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()),
    coverImage: z.string().optional(),
  }),
});

export const collections = { projects, blog, services };
