import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection } from "astro:content";
import sharp from "sharp";
import { COVER_WIDTHS, coverSource } from "../../../../lib/images/covers";

/**
 * Resized copies of each project cover (see src/lib/images/covers.ts). The
 * original stays untouched in public/; these are what the pages' srcset
 * points to. Smaller than the source only: never upscaled.
 */
export const getStaticPaths = (async () => {
  const projects = await getCollection("projects");
  return projects.flatMap((project) => {
    const source = coverSource(project);
    if (!source) return [];
    return COVER_WIDTHS.map((width) => ({
      params: { slug: project.id, width: String(width) },
      props: { source },
    }));
  });
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ params, props }) => {
  const webp = await sharp(props.source as string)
    .resize({ width: Number(params.width), withoutEnlargement: true })
    .webp({ quality: 80 })
    .toBuffer();
  return new Response(webp as unknown as Uint8Array<ArrayBuffer>, {
    headers: {
      "Content-Type": "image/webp",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
