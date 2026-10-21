import sharp from "sharp";
import { mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "..", "public");
const imagesDir = join(publicDir, "images");
const iconsDir = join(publicDir, "icons");
mkdirSync(imagesDir, { recursive: true });
mkdirSync(iconsDir, { recursive: true });

const siteHostname = (
  process.env.BASE_URL || "https://wedevs.page"
).replace(/^https?:\/\//, "");

const ogSvg = (tagline) =>
  Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#0e0f12"/>
  <g transform="translate(60 70) scale(1.4)">
    <polyline points="6,16 17,48 28,26 39,48 50,16" fill="none" stroke="#f6f5f2" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
    <line x1="62" y1="10" x2="54" y2="54" stroke="#6b80ff" stroke-width="6" stroke-linecap="round"/>
  </g>
  <rect x="60" y="320" width="1080" height="4" fill="#6b80ff"/>
  <text x="60" y="230" font-family="Manrope, system-ui, sans-serif" font-size="64" font-weight="800" letter-spacing="-2" fill="#f6f5f2">WedevsVnzla</text>
  <text x="60" y="285" font-family="Manrope, system-ui, sans-serif" font-size="28" font-weight="400" fill="#a9aab0">${tagline}</text>
  <text x="60" y="380" font-family="JetBrains Mono, monospace" font-size="18" fill="#a9aab0">${siteHostname}</text>
</svg>
`);

// One default OG image per locale; BaseLayout picks it by page language.
const ogImages = [
  { name: "og.png", tagline: "Custom software, built with precision" },
  { name: "og-es.png", tagline: "Software a la medida, con precisión técnica" },
];

const iconSvg = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#0e0f12"/>
  <g transform="translate(86 96) scale(5)">
    <polyline points="6,16 17,48 28,26 39,48 50,16" fill="none" stroke="#f6f5f2" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
    <line x1="62" y1="10" x2="54" y2="54" stroke="#6b80ff" stroke-width="6" stroke-linecap="round"/>
  </g>
</svg>
`);

const icons = [
  { name: "apple-touch-icon.png", size: 180 },
  { name: "favicon-32x32.png", size: 32 },
  { name: "favicon-16x16.png", size: 16 },
  { name: "android-chrome-192x192.png", size: 192 },
  { name: "android-chrome-512x512.png", size: 512 },
];

try {
  for (const { name, tagline } of ogImages) {
    await sharp(ogSvg(tagline)).png().toFile(join(imagesDir, name));
    console.log(`✓ ${name} generated successfully`);
  }

  for (const { name, size } of icons) {
    await sharp(iconSvg).resize(size, size).png().toFile(join(iconsDir, name));
    console.log(`✓ ${name} generated successfully`);
  }
} catch (err) {
  console.error("Failed to generate images:", err.message);
  process.exit(1);
}
