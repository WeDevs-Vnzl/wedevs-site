import { t, type Lang } from "../i18n/ui";
import { getLocalizedPath } from "../i18n/routes";
import type { PageOgOptions } from "./render";

/**
 * Static pages that get their own OG card at /og/pages/<key>-<lang>.jpg.
 * The card shows the page as a route ("/Projects", "/Proyectos"); the home
 * shows the brand itself. Any other path falls back to the home card.
 */
const pages = {
  home: { path: "/", title: null, subtitle: "home.seoDescription" },
  projects: {
    path: "/projects",
    title: "nav.projects",
    subtitle: "projectsPage.seoDescription",
  },
  services: {
    path: "/services",
    title: "nav.services",
    subtitle: "services.seoDescription",
  },
  blog: { path: "/blog", title: "nav.blog", subtitle: "blog.seoDescription" },
  about: {
    path: "/about",
    title: "nav.about",
    subtitle: "aboutPage.seoDescription",
  },
  contact: {
    path: "/contact",
    title: "nav.contact",
    subtitle: "contactPage.seoDescription",
  },
} as const;

export type OgPageKey = keyof typeof pages;

export const ogPageKeys = Object.keys(pages) as OgPageKey[];

/** Card content for one static page in one language. */
export function ogPageOptions(key: OgPageKey, lang: Lang): PageOgOptions {
  const page = pages[key];
  return {
    title: page.title ? `/${t(lang, page.title)}` : "/Wedevs",
    subtitle: t(lang, page.subtitle),
    path: getLocalizedPath(page.path, lang),
  };
}

/** Site-relative OG image for a page path ("/projects"), home card otherwise. */
export function ogPageImage(path: string, lang: Lang): string {
  const clean = path.replace(/\/+$/, "") || "/";
  const key = ogPageKeys.find((k) => pages[k].path === clean) ?? "home";
  return `/og/pages/${key}-${lang}.jpg`;
}
