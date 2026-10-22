import { initMagnetic } from "./emphasis";
import {
  FINE_POINTER,
  gsap,
  prefersReducedMotion,
  REDUCED_MOTION,
} from "./gsap";
import { initHomeHero, initPageHero } from "./hero";
import { initReveal } from "./reveal";
import { initScrollProgress } from "./scroll";

let mm: gsap.MatchMedia | null = null;

/** Builds every animation for the current page inside one revertible matchMedia. */
function setupPage(): void {
  mm?.revert();
  mm = gsap.matchMedia();
  mm.add({ reduce: REDUCED_MOTION, finePointer: FINE_POINTER }, (ctx) => {
    // Under reduced motion global.css never hides anything, so skip it all.
    if (ctx.conditions?.reduce) return;
    // Top-to-bottom order, so ScrollTriggers refresh in page order.
    initHomeHero();
    initPageHero();
    initReveal();
    initScrollProgress();
    // Hover effects only where a real pointer can hover.
    if (ctx.conditions?.finePointer) return initMagnetic();
  });
}

/**
 * Fades the outgoing page's content up and out. Sections holding a
 * `transition:name` element are left alone: fading them would make the
 * browser morph an invisible snapshot into the new page's title.
 */
function playExit(): Promise<unknown> {
  const targets = gsap.utils
    .toArray<HTMLElement>("main > *")
    .filter((el) => !el.querySelector("[data-astro-transition-scope]"));
  if (targets.length === 0) return Promise.resolve();
  return gsap
    .to(targets, {
      autoAlpha: 0,
      y: -12,
      duration: 0.25,
      stagger: 0.03,
      ease: "power2.in",
      overwrite: true,
    })
    .then();
}

/**
 * Runs the exit animation in parallel with the next page's fetch, so the
 * transition never waits longer than the slower of the two.
 */
function onBeforePreparation(event: Event): void {
  if (prefersReducedMotion()) return;
  const prep = event as Event & { loader: () => Promise<void> };
  const load = prep.loader;
  prep.loader = async () => {
    await Promise.all([playExit(), load()]);
  };
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
  document.addEventListener("astro:before-preparation", onBeforePreparation);
  document.addEventListener("astro:before-swap", teardownPage);
}
