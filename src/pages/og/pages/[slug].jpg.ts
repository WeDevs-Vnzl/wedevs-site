import type { APIRoute } from "astro";
import {
  ogPageKeys,
  ogPageOptions,
  type OgPageKey,
} from "../../../lib/og/pages";
import { ogResponse, renderPageOg } from "../../../lib/og/render";
import { locales, type Lang } from "../../../lib/i18n/ui";

export function getStaticPaths() {
  return locales.flatMap((lang) =>
    ogPageKeys.map((key) => ({
      params: { slug: `${key}-${lang}` },
      props: { key, lang },
    })),
  );
}

interface Props {
  key: OgPageKey;
  lang: Lang;
}

export const GET: APIRoute<Props> = async ({ props }) => {
  const buffer = await renderPageOg(ogPageOptions(props.key, props.lang));
  return ogResponse(buffer);
};
