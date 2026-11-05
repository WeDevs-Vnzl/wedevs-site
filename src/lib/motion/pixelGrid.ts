import { gsap } from "./gsap";

const SVG_NS = "http://www.w3.org/2000/svg";

/**
 * Seeded cell lottery shared with PixelGrid.astro and the OG mosaic
 * (src/lib/og/render.ts): the same seed always yields the same pattern.
 */
export function pixelCells(
  seed: number,
  cols: number,
  rows: number,
  hi: number,
  lo: number,
): { x: number; y: number; o: number }[] {
  let s = seed;
  const rand = () => (s = (s * 9301 + 49297) % 233280) / 233280;
  const cells: { x: number; y: number; o: number }[] = [];
  for (let i = 0; i < cols * rows; i++) {
    const v = rand();
    const o = v > 0.82 ? +(0.02 + rand() * hi).toFixed(3) : v > 0.6 ? lo : 0;
    if (o > 0) cells.push({ x: i % cols, y: Math.floor(i / cols), o });
  }
  return cells;
}

/**
 * Builds the cell rects of every PixelGrid that is still empty. The markup
 * ships without them (a few hundred rects per band weigh more than the rest
 * of the page), so this runs before any entrance queries the rects. The
 * cells are decorative: without JavaScript the hairlines and glow remain.
 */
export function fillPixelGrids(root: ParentNode = document): void {
  root
    .querySelectorAll<SVGSVGElement>(".pixel-grid-cells[data-seed]")
    .forEach((svg) => {
      if (svg.childElementCount > 0) return;
      const d = svg.dataset;
      const cells = pixelCells(
        Number(d.seed),
        Number(d.cols),
        Number(d.rows),
        Number(d.hi),
        Number(d.lo),
      );
      const frag = document.createDocumentFragment();
      for (const c of cells) {
        const rect = document.createElementNS(SVG_NS, "rect");
        rect.setAttribute("x", String(c.x));
        rect.setAttribute("y", String(c.y));
        rect.setAttribute("width", "1");
        rect.setAttribute("height", "1");
        rect.setAttribute("opacity", String(c.o));
        frag.appendChild(rect);
      }
      svg.appendChild(frag);
    });
}

/**
 * Entrance of one PixelGrid (src/components/ui/PixelGrid.astro): the cells
 * flicker on in random order, then the glow, when the grid has one, lights
 * up underneath. Shared by the hero intros and the scroll-triggered grids so
 * every band gets the same gesture.
 */
export function gridEntrance(grid: Element): gsap.core.Timeline {
  const tl = gsap.timeline();
  tl.from(grid.querySelectorAll("rect"), {
    opacity: 0,
    duration: 0.3,
    stagger: { amount: 0.9, from: "random" },
  });
  const glow = grid.querySelector(".pixel-grid-glow");
  if (glow) tl.from(glow, { autoAlpha: 0, duration: 1.2 }, 0.2);
  return tl;
}

/**
 * Scroll-triggered entrance for every PixelGrid outside a hero (the heroes
 * run theirs inside their intro timelines, see hero.ts). Each grid plays
 * once, when the band it decorates reaches the lower part of the viewport.
 */
export function initPixelGrids(): void {
  gsap.utils
    .toArray<HTMLElement>("[data-pixel-grid]")
    .filter((grid) => !grid.closest("[data-hero], [data-page-hero]"))
    .forEach((grid) => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: grid.parentElement ?? grid,
            start: "top 85%",
            once: true,
          },
        })
        .add(gridEntrance(grid));
    });
}
