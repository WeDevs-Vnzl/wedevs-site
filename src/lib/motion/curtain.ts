import { gsap } from "./gsap";

/**
 * Page-transition curtain (markup in Motion.astro, persisted across swaps).
 * On exit the mosaic cells pop in at random until the screen is a dark
 * pixel grid, then a violet pixel blinks in the center while the next page
 * loads. On enter the cells dissolve away at random.
 */
const DISSOLVE = {
  duration: 0.14,
  ease: "none",
  stagger: { amount: 0.5, from: "random" },
} as const;

function parts() {
  const curtain = document.querySelector<HTMLElement>("[data-curtain]");
  if (!curtain) return null;
  return {
    curtain,
    cells: curtain.querySelectorAll("[data-curtain-cell]"),
    mark: curtain.querySelector("[data-curtain-mark]"),
  };
}

/** Covers the viewport. Resolves once the screen is fully hidden. */
export function coverCurtain(): Promise<unknown> {
  const p = parts();
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
  if (!p || Number(gsap.getProperty(p.cells[0], "opacity")) === 0) {
    return false;
  }
  gsap
    .timeline()
    .to(p.mark, { autoAlpha: 0, scale: 0, duration: 0.2, ease: "power2.in" })
    .to(p.cells, { opacity: 0, ...DISSOLVE })
    .set(p.curtain, { pointerEvents: "none" });
  return true;
}
