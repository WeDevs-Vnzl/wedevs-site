import { gsap, REDUCED_MOTION } from "./gsap";
import { initReveal } from "./reveal";

let mm: gsap.MatchMedia | null = null;

/** Builds every animation for the current page inside one revertible matchMedia. */
function setupPage(): void {
  mm?.revert();
  mm = gsap.matchMedia();
  mm.add({ reduce: REDUCED_MOTION }, (ctx) => {
    // Under reduced motion global.css never hides anything, so skip it all.
    if (ctx.conditions?.reduce) return;
    initReveal();
  });
}

/** Kills the old page's tweens and ScrollTriggers before the DOM is swapped. */
function teardownPage(): void {
  mm?.revert();
  mm = null;
}

/**
 * Wires the motion lifecycle to Astro's ClientRouter. `astro:page-load` also
 * fires on the first load. Waiting for fonts keeps text measurements (and
 * therefore trigger positions and text splits) stable.
 */
export function initPageMotion(): void {
  document.addEventListener("astro:page-load", () => {
    document.fonts.ready.then(setupPage);
  });
  document.addEventListener("astro:before-swap", teardownPage);
}
