import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import {
  ogResponse,
  renderPageOg,
  type PageOgOptions,
} from "../../../lib/og/render";
import { getLocalizedPath } from "../../../lib/i18n/routes";
import { locales } from "../../../lib/i18n/ui";

export async function getStaticPaths() {
  const services = await getCollection("services");
  return locales.flatMap((lang) =>
    services.map((entry) => ({
      params: { slug: `${entry.id}-${lang}` },
      props: {
        title: `/${entry.data[lang].title}`,
        subtitle: entry.data[lang].desc,
        path: getLocalizedPath(`/services/${entry.id}`, lang),
      },
    })),
  );
}

export const GET: APIRoute<PageOgOptions> = async ({ props }) => {
  const buffer = await renderPageOg(props);
  return ogResponse(buffer);
};
