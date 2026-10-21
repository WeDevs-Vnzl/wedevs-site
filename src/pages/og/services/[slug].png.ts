import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { renderOgImage } from "../../../lib/utils/ogImage";
import { locales, type Lang } from "../../../lib/i18n/ui";

export async function getStaticPaths() {
  const services = await getCollection("services");
  return locales.flatMap((lang) =>
    services.map((entry) => ({
      params: { slug: `${entry.id}-${lang}` },
      props: { title: entry.data[lang].title, subtitle: entry.data[lang].desc },
    })),
  );
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
