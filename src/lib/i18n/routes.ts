import { locales, defaultLang, type Lang } from "./ui";

/**
 * Prefixes a site-relative path (e.g. "/projects/kairos-cms") with the locale
 * segment. Always ends in "/" so links, canonicals and the sitemap share one
 * URL form (the static build emits directory/index.html pages).
 */
export function getLocalizedPath(path: string, lang: Lang): string {
  const clean = path.replace(/^\/*/, "/").replace(/\/+$/, "");
  return `/${lang}${clean}/`;
}

/** Absolute canonical URL for a path without the /en//es/ prefix. */
export function getCanonicalUrl(path: string, lang: Lang): string {
  return new URL(getLocalizedPath(path, lang), import.meta.env.SITE).toString();
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
