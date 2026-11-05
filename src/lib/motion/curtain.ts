import { gsap } from "./gsap";
import { pixelCells } from "./pixelGrid";

/**
 * Page-transition curtain (markup in Motion.astro, persisted across swaps).
 * On exit the mosaic cells pop in at random until the screen is a dark
 * pixel grid, then a violet pixel blinks in the center while the next page
 * loads. On enter the cells dissolve away at random.
 *
 * The cells are built here on the first navigation: each is a night square,
 * and some carry a violet tint picked with the same seeded formula as
 * PixelGrid, so a covered screen reads as one of the site's dark heroes.
 */
const COLS = 24;
const ROWS = 24;
const SEED = 7;
const HI = 0.05;
const LO = 0.015;

const DISSOLVE = {
  duration: 0.14,
  ease: "none",
  stagger: { amount: 0.5, from: "random" },
} as const;

const SVG_NS = "http://www.w3.org/2000/svg";

function buildCells(svg: SVGSVGElement): void {
  const tints = new Map(
    pixelCells(SEED, COLS, ROWS, HI, LO).map((c) => [c.y * COLS + c.x, c.o]),
  );
  svg.setAttribute("viewBox", `0 0 ${COLS} ${ROWS}`);
  const frag = document.createDocumentFragment();
  for (let i = 0; i < COLS * ROWS; i++) {
    const x = i % COLS;
    const y = Math.floor(i / COLS);
    const g = document.createElementNS(SVG_NS, "g");
    g.style.opacity = "0";
    g.setAttribute("data-curtain-cell", "");
    const base = document.createElementNS(SVG_NS, "rect");
    base.setAttribute("x", String(x));
    base.setAttribute("y", String(y));
    base.setAttribute("width", "1.02");
    base.setAttribute("height", "1.02");
    base.setAttribute("fill", "var(--color-night)");
    g.appendChild(base);
    const tint = tints.get(i);
    if (tint) {
      const violet = document.createElementNS(SVG_NS, "rect");
      violet.setAttribute("x", String(x));
      violet.setAttribute("y", String(y));
      violet.setAttribute("width", "1");
      violet.setAttribute("height", "1");
      violet.setAttribute("fill", "var(--color-violet-soft)");
      violet.setAttribute("opacity", String(tint));
      g.appendChild(violet);
    }
    frag.appendChild(g);
  }
  svg.appendChild(frag);
}

function parts(build = false) {
  const curtain = document.querySelector<HTMLElement>("[data-curtain]");
  if (!curtain) return null;
  const svg = curtain.querySelector<SVGSVGElement>("[data-curtain-grid]");
  if (build && svg && svg.childElementCount === 0) buildCells(svg);
  return {
    curtain,
    cells: curtain.querySelectorAll("[data-curtain-cell]"),
    mark: curtain.querySelector("[data-curtain-mark]"),
  };
}

/** Covers the viewport. Resolves once the screen is fully hidden. */
export function coverCurtain(): Promise<unknown> {
  const p = parts(true);
  if (!p) return Promise.resolve();
  return gsap
    .timeline()
    .set(p.curtain, { pointerEvents: "auto" })
    .fromTo(p.cells, { opacity: 0 }, { opacity: 1, ...DISSOLVE })
    .fromTo(
      p.mark,
      { autoAlpha: 0, scale: 0 },
      { autoAlpha: 1, scale: 1, duration: 0.25, ease: "back.out(2.5)" },
      "-=0.05",
    )
    .then();
}

/**
 * Lifts the curtain if a navigation left it down. Returns false when the
 * curtain was not covering the page (first load, reduced motion).
 */
export function liftCurtain(): boolean {
  const p = parts();
  if (
    !p ||
    p.cells.length === 0 ||
    Number(gsap.getProperty(p.cells[0], "opacity")) === 0
  ) {
    return false;
  }
  gsap
    .timeline()
    .to(p.mark, { autoAlpha: 0, scale: 0, duration: 0.2, ease: "power2.in" })
    .to(p.cells, { opacity: 0, ...DISSOLVE })
    .set(p.curtain, { pointerEvents: "none" });
  return true;
}
