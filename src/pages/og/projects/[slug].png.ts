import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { findOgCover } from "../../../lib/og/cover";
import {
  pngResponse,
  renderCoverOg,
  renderPageOg,
} from "../../../lib/og/render";
import { getLocalizedPath } from "../../../lib/i18n/routes";
import { locales } from "../../../lib/i18n/ui";

export async function getStaticPaths() {
  const projects = await getCollection("projects");
  return locales.flatMap((lang) =>
    projects.map((entry) => ({
      params: { slug: `${entry.id}-${lang}` },
      props: {
        cover: findOgCover("projects", entry.id),
        title: `/${entry.data[lang].title}`,
        subtitle: entry.data[lang].resultHeadline,
        path: getLocalizedPath(`/projects/${entry.id}`, lang),
      },
    })),
  );
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
  return pngResponse(buffer);
};
