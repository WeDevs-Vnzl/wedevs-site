import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { renderOgImage } from "../../../lib/utils/ogImage";
import { getPostSlug } from "../../../lib/utils/blog";

export async function getStaticPaths() {
  const posts = await getCollection("blog");
  return posts.map((entry) => ({
    params: { slug: getPostSlug(entry.id) },
    props: { title: entry.data.title, subtitle: entry.data.excerpt },
  }));
}

interface Props {
  title: string;
  subtitle: string;
}

export const GET: APIRoute<Props> = async ({ props }) => {
  const buffer = await renderOgImage(props.title, props.subtitle);
  return new Response(buffer, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
