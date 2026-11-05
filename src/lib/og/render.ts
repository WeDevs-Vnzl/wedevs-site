import { readFileSync } from "node:fs";
import { join } from "node:path";
import satori from "satori";
import sharp from "sharp";
import { loadOgFonts } from "./fonts";

/** Open Graph canvas: the 1.91:1 size every network renders without cropping. */
export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

/** Immutable PNG response shared by every /og route. */
export function pngResponse(png: Buffer): Response {
  // A Buffer is an ArrayBuffer-backed Uint8Array at runtime; lib.dom's
  // BodyInit only spells out the latter.
  return new Response(png as unknown as Uint8Array<ArrayBuffer>, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}

const NIGHT = "#111216";
const PAPER = "#fafaf7";
const VIOLET = "#4f55e8";
const VIOLET_SOFT = "#8f94ff";
const NIGHT_COPY = "#c5c8d2";
/** Cover fade: the right 40% goes transparent, violet, then solid ink. */
const COVER_TINT = "#6b80ff";
const COVER_INK = "#0e0f12";

const HOSTNAME = (import.meta.env.SITE ?? "https://we-devs.com").replace(
  /^https?:\/\//,
  "",
);

// ---------------------------------------------------------------------------
// Satori helpers. Satori lays out a React-like tree; every element with more
// than one child must be a flex container.

type Node = { type: string; props: Record<string, unknown> };

function h(
  type: string,
  props: Record<string, unknown>,
  ...children: (Node | string)[]
): Node {
  return { type, props: { ...props, children } };
}

/** The brand monogram, public/logo.svg, embedded as a data URI (read once). */
let monogramSrc: string | undefined;

function monogram(size: number): Node {
  monogramSrc ??= `data:image/svg+xml;utf8,${encodeURIComponent(
    readFileSync(join(process.cwd(), "public", "logo.svg"), "utf8"),
  )}`;
  return h("img", {
    src: monogramSrc,
    width: size,
    height: Math.round((size * 64) / 68),
  });
}

/** Monogram plus "edevs" wordmark, the same lock-up as the site header. */
function logo(size: number, ink: string): Node {
  return h(
    "div",
    { style: { display: "flex", alignItems: "center" } },
    monogram(size),
  );
}

async function rasterise(tree: Node): Promise<Buffer> {
  const svg = await satori(tree as never, {
    width: OG_WIDTH,
    height: OG_HEIGHT,
    fonts: loadOgFonts(),
  });
  return sharp(Buffer.from(svg)).png().toBuffer();
}

// ---------------------------------------------------------------------------
// Mosaic background: the PixelGrid atmosphere (src/components/ui/PixelGrid.astro)
// rendered once as a bitmap. Same cell lottery and lamp geometry, with the
// cells blurred so the mosaic reads as a soft texture behind the title.

function seedFrom(text: string): number {
  let s = 7;
  for (const ch of text) s = (s * 31 + ch.charCodeAt(0)) % 233280;
  return s;
}

function mosaicSvg(seedText: string): Buffer {
  const cols = 24;
  const cell = OG_WIDTH / cols;
  const rows = Math.ceil(OG_HEIGHT / cell);
  let s = seedFrom(seedText);
  const rand = () => (s = (s * 9301 + 49297) % 233280) / 233280;

  const cells: string[] = [];
  for (let i = 0; i < cols * rows; i++) {
    const v = rand();
    const o = v > 0.82 ? 0.05 + rand() * 0.13 : v > 0.6 ? 0.035 : 0;
    if (o === 0) continue;
    const x = (i % cols) * cell;
    const y = Math.floor(i / cols) * cell;
    cells.push(
      `<rect x="${x}" y="${y}" width="${cell}" height="${cell}" fill="${VIOLET_SOFT}" opacity="${o.toFixed(3)}"/>`,
    );
  }

  // The lamp box is 3:2 of the band height, anchored bottom left (see the
  // component's .pixel-grid-glow): identical proportions at 1200x630.
  const box = OG_HEIGHT * 1.5;
  const cx = (46 / 150) * box;
  const cy = 1.16 * OG_HEIGHT;
  const rx = (66 / 150) * box;
  const ry = 0.58 * OG_HEIGHT;

  return Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${OG_WIDTH}" height="${OG_HEIGHT}" viewBox="0 0 ${OG_WIDTH} ${OG_HEIGHT}">
  <defs>
    <filter id="soft" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="9"/></filter>
    <filter id="cloud" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="34"/></filter>
    <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter>
    <pattern id="lines" width="${cell}" height="${cell}" patternUnits="userSpaceOnUse">
      <path d="M ${cell} 0 L 0 0 0 ${cell}" fill="none" stroke="${VIOLET_SOFT}" stroke-opacity="0.12" stroke-width="1"/>
    </pattern>
    <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0.35" stop-color="#fff"/><stop offset="1" stop-color="#000"/>
    </linearGradient>
    <mask id="lines-mask"><rect width="${OG_WIDTH}" height="${OG_HEIGHT}" fill="url(#fade)"/></mask>
    <radialGradient id="light" cx="50%" cy="36%" r="62%" fx="50%" fy="36%">
      <stop offset="0" stop-color="${VIOLET_SOFT}"/>
      <stop offset="0.16" stop-color="${VIOLET}"/>
      <stop offset="0.45" stop-color="#3b40a4"/>
      <stop offset="1" stop-color="#3b40a4" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${OG_WIDTH}" height="${OG_HEIGHT}" fill="${NIGHT}"/>
  <g filter="url(#soft)">${cells.join("")}</g>
  <rect width="${OG_WIDTH}" height="${OG_HEIGHT}" fill="url(#lines)" mask="url(#lines-mask)"/>
  <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#light)" filter="url(#cloud)" opacity="0.28"/>
  <rect width="${OG_WIDTH}" height="${OG_HEIGHT}" filter="url(#grain)" opacity="0.06"/>
</svg>`);
}

// ---------------------------------------------------------------------------

export interface PageOgOptions {
  /** Shown as a route, e.g. "/Projects". */
  title: string;
  subtitle: string;
  /** Site-relative path printed under the rule, e.g. "/es/proyectos". */
  path: string;
}

/**
 * Text card for pages without a cover: the page title as a route over the
 * mosaic, its description, the violet rule and the URL, with the monogram
 * top left. The same structure as the previous OG images.
 */
export async function renderPageOg(options: PageOgOptions): Promise<Buffer> {
  const { title, subtitle, path } = options;
  // Everything is pinned to the frame: the title block grows upward from
  // the rule, so a two-line title never pushes the URL out of the canvas.
  const inset = 72;
  const layer = h(
    "div",
    {
      style: {
        width: OG_WIDTH,
        height: OG_HEIGHT,
        display: "flex",
        position: "relative",
        color: PAPER,
        fontFamily: "Manrope",
      },
    },
    h(
      "div",
      {
        style: { position: "absolute", top: 64, left: inset, display: "flex" },
      },
      monogram(60),
    ),
    h(
      "div",
      {
        style: {
          position: "absolute",
          left: inset,
          right: inset,
          bottom: 150,
          display: "flex",
          flexDirection: "column",
        },
      },
      h(
        "div",
        {
          style: {
            fontSize: 76,
            fontWeight: 800,
            letterSpacing: -3.8,
            lineHeight: 1,
            lineClamp: 2,
          },
        },
        title,
      ),
      h(
        "div",
        {
          style: {
            marginTop: 22,
            maxWidth: 880,
            fontSize: 27,
            fontWeight: 400,
            lineHeight: 1.4,
            color: NIGHT_COPY,
            lineClamp: 2,
          },
        },
        subtitle,
      ),
    ),
    h("div", {
      style: {
        position: "absolute",
        left: inset,
        right: inset,
        bottom: 110,
        height: 4,
        backgroundColor: VIOLET,
      },
    }),
    h(
      "div",
      {
        style: {
          position: "absolute",
          left: inset,
          bottom: 60,
          fontFamily: "JetBrains Mono",
          fontWeight: 500,
          fontSize: 19,
          letterSpacing: 0.8,
          color: NIGHT_COPY,
        },
      },
      `${HOSTNAME}${path}`,
    ),
  );

  const [background, foreground] = await Promise.all([
    sharp(mosaicSvg(title)).png().toBuffer(),
    rasterise(layer),
  ]);
  return sharp(background)
    .composite([{ input: foreground }])
    .png()
    .toBuffer();
}

/**
 * Cover card for case studies and articles: the dedicated `og` artwork cropped
 * to the OG frame, its right 40% fading from transparent through violet to
 * solid ink, and the logo bottom right on that ink. No title.
 */
export async function renderCoverOg(coverFile: string): Promise<Buffer> {
  const layer = h(
    "div",
    {
      style: {
        width: OG_WIDTH,
        height: OG_HEIGHT,
        display: "flex",
        position: "relative",
        backgroundImage: `linear-gradient(90deg, ${COVER_TINT}00 60%, ${COVER_TINT} 80%, ${COVER_INK} 100%)`,
      },
    },
    h(
      "div",
      {
        style: {
          position: "absolute",
          right: 44,
          bottom: 36,
          display: "flex",
        },
      },
      logo(36, PAPER),
    ),
  );

  const [cover, overlay] = await Promise.all([
    sharp(coverFile)
      .resize(OG_WIDTH, OG_HEIGHT, { fit: "cover", position: "centre" })
      .toBuffer(),
    rasterise(layer),
  ]);
  return sharp(cover)
    .composite([{ input: overlay }])
    .png()
    .toBuffer();
}
