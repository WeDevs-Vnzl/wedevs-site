import { existsSync } from "node:fs";
import { join } from "node:path";
import type { CollectionEntry } from "astro:content";

/**
 * Responsive variants of a project's cover, resized at build time by the
 * endpoint src/pages/images/projects/[slug]/cover-[width].webp.ts from the
 * original in public/. Authors keep dropping one large cover per project;
 * the pages get a srcset and the visitor downloads the size they need.
 */
export const COVER_WIDTHS = [480, 768, 1024, 1440, 1844] as const;

/** The showcase column is ~58vw from the lg breakpoint, full width below. */
export const COVER_SIZES = "(min-width: 1024px) 58vw, 100vw";

/** Default `src`: the middle size, for clients without srcset support. */
export const COVER_DEFAULT_WIDTH = 1024;

export function coverVariant(slug: string, width: number): string {
  return `/images/projects/${slug}/cover-${width}.webp`;
}

export function coverSrcset(slug: string): string {
  return COVER_WIDTHS.map((w) => `${coverVariant(slug, w)} ${w}w`).join(", ");
}

/** Absolute path of the project's cover in public/, if it ships one. */
export function coverSource(
  project: CollectionEntry<"projects">,
): string | undefined {
  const rel = project.data.coverImage ?? project.data.gallery?.[0];
  if (!rel) return undefined;
  const file = join(process.cwd(), "public", rel);
  return existsSync(file) ? file : undefined;
}
