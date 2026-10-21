import en from "./en.json";
import es from "./es.json";

export const languages = { en, es } as const;
export type Lang = keyof typeof languages;
export const locales: Lang[] = ["en", "es"];
export const defaultLang: Lang = "en";

type Dict = typeof en;

/** Resolves a dot-notation path inside a locale's dictionary (e.g. "home.h1"). */
export function t(lang: Lang, path: string): string {
  const value = path
    .split(".")
    .reduce<unknown>(
      (obj, key) => (obj as Record<string, unknown>)?.[key],
      languages[lang],
    );
  if (typeof value !== "string") {
    throw new Error(`Missing i18n key "${path}" for locale "${lang}"`);
  }
  return value;
}

/** Bound translator for a given locale, and direct access to its full dictionary. */
export function useTranslations(lang: Lang) {
  return { t: (path: string) => t(lang, path), dict: languages[lang] as Dict };
}
