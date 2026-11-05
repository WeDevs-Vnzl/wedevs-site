import { existsSync } from "node:fs";
import { join } from "node:path";

const EXTENSIONS = ["webp", "png", "jpg", "jpeg"];

/**
 * Dedicated OG artwork for a case study or article, when its folder ships
 * one: public/images/<collection>/<slug>/og.<ext>, cropped by the author
 * for the 1200x630 frame. Returns the absolute file path, or undefined so
 * the caller falls back to the text card.
 */
export function findOgCover(
  collection: "projects" | "blog",
  slug: string,
): string | undefined {
  const dir = join(process.cwd(), "public", "images", collection, slug);
  return EXTENSIONS.map((ext) => join(dir, `og.${ext}`)).find((file) =>
    existsSync(file),
  );
}
