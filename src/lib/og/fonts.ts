import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { Font } from "satori";

/**
 * The site's own faces, read from the installed @fontsource packages so the
 * OG images use the exact fonts the pages render with. Satori reads WOFF (not
 * WOFF2) and embeds the glyph outlines, so the rasteriser needs no fonts.
 * Resolved from the project root: the build runs there and the package's
 * `exports` map does not expose the font files.
 */
const fontsDir = (pkg: string) =>
  join(process.cwd(), "node_modules", "@fontsource", pkg, "files");

let fonts: Font[] | undefined;

export function loadOgFonts(): Font[] {
  fonts ??= [
    {
      name: "Manrope",
      data: readFileSync(
        join(fontsDir("manrope"), "manrope-latin-400-normal.woff"),
      ),
      weight: 400,
      style: "normal",
    },
    {
      name: "Manrope",
      data: readFileSync(
        join(fontsDir("manrope"), "manrope-latin-800-normal.woff"),
      ),
      weight: 800,
      style: "normal",
    },
    {
      name: "JetBrains Mono",
      data: readFileSync(
        join(
          fontsDir("jetbrains-mono"),
          "jetbrains-mono-latin-500-normal.woff",
        ),
      ),
      weight: 500,
      style: "normal",
    },
  ];
  return fonts;
}
