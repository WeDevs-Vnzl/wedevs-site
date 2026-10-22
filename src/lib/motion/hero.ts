import { gsap, SplitText } from "./gsap";

/**
 * Home hero entrance: title words rise out of a mask, then the emphasis
 * phrase shifts from the title color to violet, then copy and CTAs follow.
 */
export function initHomeHero(): void {
  const hero = document.querySelector<HTMLElement>("[data-hero]");
  if (!hero) return;
  const title = hero.querySelector<HTMLElement>("[data-hero-title]");
  const emphasis = hero.querySelector<HTMLElement>("[data-hero-emphasis]");
  const copy = hero.querySelectorAll<HTMLElement>("[data-hero-copy]");
  if (!title) return;

  const split = SplitText.create(title, { type: "words", mask: "words" });
  const tl = gsap.timeline({ defaults: { duration: 0.8 }, delay: 0.1 });

  tl.set(hero.querySelectorAll("[data-hero-item]"), { autoAlpha: 1 })
    .addLabel("intro")
    .from(split.words, { yPercent: 110, stagger: 0.05 }, "intro")
    .addLabel("copy", "-=0.4");

  if (emphasis) {
    tl.from(
      emphasis,
      { color: getComputedStyle(title).color, duration: 0.6 },
      "copy-=0.2",
    );
  }

  tl.from(copy, { autoAlpha: 0, y: 16, stagger: 0.1 }, "copy");
}

/**
 * Subpage hero entrance (PageHero): eyebrow slides in, title lines rise out
 * of a mask, support copy follows. The pixel grid drifts slower than the
 * page while the hero scrolls away.
 */
export function initPageHero(): void {
  const hero = document.querySelector<HTMLElement>("[data-page-hero]");
  if (!hero) return;
  const eyebrow = hero.querySelector("[data-hero-eyebrow]");
  const title = hero.querySelector<HTMLElement>("[data-hero-title]");
  const support = hero.querySelector<HTMLElement>("[data-hero-support]");
  if (!title) return;

  const split = SplitText.create(title, { type: "lines", mask: "lines" });
  const tl = gsap.timeline({ defaults: { duration: 0.8 }, delay: 0.05 });

  tl.set(hero.querySelectorAll("[data-hero-item]"), { autoAlpha: 1 })
    .addLabel("intro")
    .from(eyebrow, { autoAlpha: 0, x: -12, duration: 0.5 }, "intro")
    .from(split.lines, { yPercent: 105, stagger: 0.08, duration: 0.9 }, "<0.1")
    .addLabel("copy", "-=0.5");

  if (support) {
    tl.from(
      support.children,
      { autoAlpha: 0, y: 16, stagger: 0.08 },
      "copy",
    );
  }

  const grid = hero.querySelector(":scope > svg");
  if (grid) {
    gsap.to(grid, {
      yPercent: 12,
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }
}
