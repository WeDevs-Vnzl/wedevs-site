import { locales, defaultLang, type Lang } from "./ui";

/**
 * Prefixes a site-relative path (e.g. "/projects/my-project") with the locale
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
  const paths: Partial<Record<Lang, string>> = {};
  for (const lang of locales) paths[lang] = pathWithoutLangPrefix;
  return getAlternatesFor(paths);
}

/**
 * hreflang alternates when each language has its own path (blog posts).
 * Languages without a path are left out; x-default is the default language
 * when it exists, else the first listed.
 */
export function getAlternatesFor(
  paths: Partial<Record<Lang, string>>,
): Record<string, string> {
  const alternates: Record<string, string> = {};
  for (const lang of locales) {
    const path = paths[lang];
    if (path) alternates[lang] = getLocalizedPath(path, lang);
  }
  const fallback = locales.find((lang) => paths[lang]);
  const xDefault = paths[defaultLang] ? defaultLang : fallback;
  if (xDefault) alternates["x-default"] = alternates[xDefault];
  return alternates;
}
