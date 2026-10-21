import { locales, defaultLang, type Lang } from "./ui";

/** Prefixes a site-relative path (e.g. "/projects/kairos-cms") with the locale segment. */
export function getLocalizedPath(path: string, lang: Lang): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `/${lang}${clean === "/" ? "" : clean}`;
}

/** hreflang alternates for the current path, keyed by locale, plus x-default. */
export function getAlternates(
  pathWithoutLangPrefix: string,
): Record<string, string> {
  const alternates: Record<string, string> = {};
  for (const lang of locales) {
    alternates[lang] = getLocalizedPath(pathWithoutLangPrefix, lang);
  }
  alternates["x-default"] = getLocalizedPath(
    pathWithoutLangPrefix,
    defaultLang,
  );
  return alternates;
}
