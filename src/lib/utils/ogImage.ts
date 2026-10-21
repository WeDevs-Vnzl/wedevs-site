import sharp from "sharp";

function escapeXml(text: string): string {
  return text.replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&apos;",
      })[c]!,
  );
}

function truncate(text: string, max: number): string {
  return text.length > max ? `${text.slice(0, max - 1)}…` : text;
}

/** Renders a 1200x630 PNG OG image with a title/subtitle, matching scripts/generate-og.mjs's look. */
export function renderOgImage(
  title: string,
  subtitle: string,
): Promise<Buffer> {
  const svg = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#0e0f12"/>
  <g transform="translate(60 70) scale(1.4)">
    <polyline points="6,16 17,48 28,26 39,48 50,16" fill="none" stroke="#f6f5f2" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
    <line x1="62" y1="10" x2="54" y2="54" stroke="#6b80ff" stroke-width="6" stroke-linecap="round"/>
  </g>
  <rect x="60" y="320" width="1080" height="4" fill="#6b80ff"/>
  <text x="60" y="230" font-family="Manrope, system-ui, sans-serif" font-size="52" font-weight="800" letter-spacing="-2" fill="#f6f5f2">${escapeXml(truncate(title, 48))}</text>
  <text x="60" y="285" font-family="Manrope, system-ui, sans-serif" font-size="26" font-weight="400" fill="#a9aab0">${escapeXml(truncate(subtitle, 80))}</text>
  <text x="60" y="380" font-family="JetBrains Mono, monospace" font-size="18" fill="#a9aab0">wedevs.page</text>
</svg>
`);
  return sharp(svg).png().toBuffer();
}
