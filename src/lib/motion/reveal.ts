import { gsap, ScrollTrigger } from "./gsap";

const STAGGER_DELAY = 0.06;
// Base pause before any entrance starts, so the reader has time to notice it
// instead of it firing the instant the element crosses the viewport edge.
const BASE_DELAY = 0.15;
const START = "top 90%";
const FROM = { autoAlpha: 0, y: 16 };
const TO = { autoAlpha: 1, y: 0 };

/** Extra seconds an element/group can opt into via `data-reveal-delay="0.5"`. */
function extraDelay(el: HTMLElement): number {
  const raw = el.dataset.revealDelay;
  const parsed = raw ? Number(raw) : 0;
  return Number.isFinite(parsed) ? parsed : 0;
}

/**
 * Scroll-triggered entrances for [data-reveal] (single elements) and
 * [data-reveal-group] (containers whose direct children get a staggered
 * entrance). The hidden initial state lives in global.css so there is no
 * flash before this runs; each element reveals once.
 */
export function initReveal(): void {
  const singles = gsap.utils
    .toArray<HTMLElement>("[data-reveal]")
    .filter((el) => !el.closest("[data-reveal-group]"));

  singles.forEach((el) => {
    gsap.fromTo(el, FROM, {
      ...TO,
      delay: BASE_DELAY + extraDelay(el),
      scrollTrigger: { trigger: el, start: START, once: true },
    });
  });

  gsap.utils.toArray<HTMLElement>("[data-reveal-group]").forEach((group) => {
    const children = Array.from(group.children) as HTMLElement[];
    if (children.length === 0) return;
    // Batch instead of one trigger per group, so long lists reveal row by row
    // as they scroll in rather than all at once when the group's top enters.
    ScrollTrigger.batch(children, {
      start: START,
      once: true,
      onEnter: (batch) =>
        gsap.fromTo(batch, FROM, {
          ...TO,
          stagger: STAGGER_DELAY,
          delay: BASE_DELAY + extraDelay(group),
          overwrite: true,
        }),
    });
  });
}
