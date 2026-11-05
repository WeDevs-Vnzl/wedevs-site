import { coverCurtain, liftCurtain } from "./curtain";
import { initMagnetic } from "./emphasis";
import { FINE_POINTER, FULL_MOTION, gsap, prefersReducedMotion } from "./gsap";
import { initHomeHero, initPageHero } from "./hero";
import { fillPixelGrids, initPixelGrids } from "./pixelGrid";
import { initReveal } from "./reveal";
import { initScrollProgress } from "./scroll";

let mm: gsap.MatchMedia | null = null;
let firstLoad = true;

/**
 * Hero entrances are worth watching only when they start promptly. Past this
 * point after navigation start, a first-load visitor has already waited for
 * the page: show the hero at once instead of hiding it a moment longer.
 */
const INTRO_BUDGET_MS = 1200;

/** Longest wait for web fonts before the entrances start anyway. */
const FONTS_TIMEOUT_MS = 350;

/** Builds every animation for the current page inside one revertible matchMedia. */
function setupPage(): void {
  const html = document.documentElement;
  // Also skip when the inline deadline script in BaseLayout.astro already
  // showed the hero: animating it now would hide visible content again.
  const skipIntro =
    firstLoad &&
    (performance.now() > INTRO_BUDGET_MS ||
      html.hasAttribute("data-hero-late"));
  firstLoad = false;
  html.setAttribute("data-motion-ready", "");
  // The grids' cells ship empty (see PixelGrid.astro); build them before any
  // entrance queries the rects, and under reduced motion too.
  fillPixelGrids();
  mm?.revert();
  mm = gsap.matchMedia();
  // A conditions object only runs when at least one query matches, so
  // `motion` must be listed too: touch devices match neither of the others.
  const current = mm;
  mm.add({ motion: FULL_MOTION, finePointer: FINE_POINTER }, (ctx) => {
    // Under reduced motion global.css never hides anything, so skip it all.
    if (!ctx.conditions?.motion) return;
    // The hero is what the visitor is looking at: build it now.
    initHomeHero(skipIntro);
    initPageHero(skipIntro);
    // Everything below the fold waits one task, so the hero's first frame
    // is not stuck behind ScrollTrigger setup for the whole page. ctx.add()
    // records the late tweens in this context so mm.revert() still clears
    // them on navigation; if the page was torn down meanwhile, do nothing.
    setTimeout(() => {
      if (mm !== current) return;
      ctx.add(() => {
        // Top-to-bottom order, so ScrollTriggers refresh in page order.
        // Grids first: they trigger on the band itself, above its content.
        initPixelGrids();
        initReveal();
        initScrollProgress();
        // Hover effects only where a real pointer can hover.
        if (ctx.conditions?.finePointer) initMagnetic();
      });
    }, 0);
  });
}

/**
 * Drops the curtain in parallel with the next page's fetch, so the
 * transition never waits longer than the slower of the two.
 */
function onBeforePreparation(event: Event): void {
  if (prefersReducedMotion()) return;
  const prep = event as Event & { loader: () => Promise<void> };
  const load = prep.loader;
  prep.loader = async () => {
    await Promise.all([coverCurtain(), load()]);
  };
}

/** Kills the old page's tweens and ScrollTriggers before the DOM is swapped. */
function teardownPage(): void {
  mm?.revert();
  mm = null;
}

/**
 * Fonts are preloaded with `font-display: swap`, so they are normally ready
 * before this resolves. On a slow connection the wait is capped: a late font
 * swap is cheaper than a hero that stays hidden.
 */
function fontsReadyOrTimeout(): Promise<void> {
  return Promise.race([
    document.fonts.ready.then(() => undefined),
    new Promise<void>((resolve) => setTimeout(resolve, FONTS_TIMEOUT_MS)),
  ]);
}

function onPageLoad(): void {
  fontsReadyOrTimeout().then(() => {
    // After a navigation, start the entrances as the curtain clears.
    if (liftCurtain()) gsap.delayedCall(0.35, setupPage);
    else setupPage();
  });
}

/**
 * Wires the motion lifecycle to Astro's ClientRouter. `astro:page-load` also
 * fires on the first load; when this module was imported after that event
 * (see MotionScript.astro), `pageAlreadyLoaded` runs the handler at once.
 * Waiting for fonts keeps text measurements (and therefore trigger positions
 * and text splits) stable.
 */
export function initPageMotion(pageAlreadyLoaded = false): void {
  document.addEventListener("astro:page-load", onPageLoad);
  if (pageAlreadyLoaded) onPageLoad();
  document.addEventListener("astro:before-preparation", onBeforePreparation);
  document.addEventListener("astro:before-swap", teardownPage);
}
