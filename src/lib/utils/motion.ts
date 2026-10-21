import { animate, inView, stagger } from "motion";

// Reuses the project's only easing token (see --ease-signature in global.css).
// motion@11's `animate` takes `ease` as a cubic-bezier array, not a CSS string.
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const DURATION = 0.5;
const STAGGER_DELAY = 0.06;
// Base pause before any entrance starts, so the reader has time to notice it
// instead of it firing the instant the element crosses the viewport edge.
const BASE_DELAY = 0.15;

/** Extra seconds an element/group can opt into via `data-reveal-delay="0.5"`. */
function extraDelay(el: HTMLElement): number {
  const raw = el.dataset.revealDelay;
  const parsed = raw ? Number(raw) : 0;
  return Number.isFinite(parsed) ? parsed : 0;
}

export function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

let stopObserving: (() => void)[] = [];

/**
 * Wires up scroll-triggered entrance animations for [data-reveal] (single
 * elements) and [data-reveal-group] (containers whose direct children get a
 * staggered entrance) within `root`. Each element reveals once, then its
 * inView observer is stopped.
 *
 * Initial opacity:0 is set here via inline style rather than in global.css,
 * since this file owns the whole reveal contract and nothing else needs to
 * know about it.
 */
export function initScrollReveal(root: ParentNode = document): void {
  const singles = Array.from(
    root.querySelectorAll<HTMLElement>("[data-reveal]"),
  ).filter((el) => !el.closest("[data-reveal-group]"));
  const groups = Array.from(
    root.querySelectorAll<HTMLElement>("[data-reveal-group]"),
  );

  if (prefersReducedMotion()) {
    singles.forEach((el) => (el.style.opacity = "1"));
    groups.forEach((group) => {
      Array.from(group.children).forEach((child) => {
        (child as HTMLElement).style.opacity = "1";
      });
    });
    return;
  }

  singles.forEach((el) => {
    el.style.opacity = "0";
    const stop = inView(el, () => {
      animate(
        el,
        { opacity: [0, 1], y: [16, 0] },
        { duration: DURATION, delay: BASE_DELAY + extraDelay(el), ease: EASE },
      );
      stop();
    });
    stopObserving.push(stop);
  });

  groups.forEach((group) => {
    const children = Array.from(group.children) as HTMLElement[];
    if (children.length === 0) return;
    children.forEach((child) => (child.style.opacity = "0"));
    const stop = inView(group, () => {
      animate(
        children,
        { opacity: [0, 1], y: [16, 0] },
        {
          duration: DURATION,
          delay: stagger(STAGGER_DELAY, {
            startDelay: BASE_DELAY + extraDelay(group),
          }),
          ease: EASE,
        },
      );
      stop();
    });
    stopObserving.push(stop);
  });
}

/** Stops any observers left over from the previous page, before a View Transitions swap. */
export function stopScrollReveal(): void {
  stopObserving.forEach((stop) => stop());
  stopObserving = [];
}
