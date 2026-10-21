import { defineConfig } from "astro/config";
import { loadEnv } from "vite";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

const { BASE_URL } = loadEnv(process.env.NODE_ENV || "", process.cwd(), "");
const site = BASE_URL || "https://wedevs.page";

export default defineConfig({
  site,
  output: "static",
  build: {
    inlineStylesheets: "always",
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    sitemap({
      // Excludes the "/" redirect stub — only /en/ and /es/ (its real targets) are indexable.
      filter: (page) => new URL(page).pathname !== "/",
      i18n: {
        defaultLocale: "en",
        locales: { en: "en", es: "es" },
      },
    }),
  ],
});
