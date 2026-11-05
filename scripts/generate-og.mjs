import sharp from "sharp";
import { mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "..", "public");
const iconsDir = join(publicDir, "icons");
mkdirSync(iconsDir, { recursive: true });

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
  for (const { name, size } of icons) {
    await sharp(iconSvg).resize(size, size).png().toFile(join(iconsDir, name));
    console.log(`✓ ${name} generated successfully`);
  }
} catch (err) {
  console.error("Failed to generate images:", err.message);
  process.exit(1);
}
