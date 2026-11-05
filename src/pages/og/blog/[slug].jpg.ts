import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { findOgCover } from "../../../lib/og/cover";
import {
  ogResponse,
  renderCoverOg,
  renderPageOg,
} from "../../../lib/og/render";
import { getLocalizedPath } from "../../../lib/i18n/routes";
import { getPostSlug } from "../../../lib/utils/blog";

export async function getStaticPaths() {
  const posts = await getCollection("blog");
  return posts.map((entry) => {
    const slug = getPostSlug(entry.id);
    return {
      params: { slug },
      props: {
        cover: findOgCover("blog", slug),
        title: `/${entry.data.title}`,
        subtitle: entry.data.excerpt,
        path: getLocalizedPath(`/blog/${slug}`, entry.data.lang),
      },
    };
  });
}

interface Props {
  cover?: string;
  title: string;
  subtitle: string;
  path: string;
}

export const GET: APIRoute<Props> = async ({ props }) => {
  const buffer = props.cover
    ? await renderCoverOg(props.cover)
    : await renderPageOg(props);
  return ogResponse(buffer);
};
