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

  const split = SplitText.create(title, {
    type: "words",
    mask: "words",
    wordsClass: "split-mask",
  });
  // Un-hide before building the tweens: each .from() renders its start
  // state immediately, so later items stay hidden until their turn. Doing
  // this inside the timeline would re-show them when it starts playing.
  gsap.set(hero.querySelectorAll("[data-hero-item]"), { autoAlpha: 1 });
  const tl = gsap.timeline({ defaults: { duration: 0.8 }, delay: 0.1 });

  tl.addLabel("intro")
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
 * Subpage hero entrance (PageHero and detail heroes): eyebrow slides in, title lines rise out
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

  const split = SplitText.create(title, {
    type: "lines",
    mask: "lines",
    linesClass: "split-mask",
  });
  // Un-hide before building the tweens: each .from() renders its start
  // state immediately, so later items stay hidden until their turn. Doing
  // this inside the timeline would re-show them when it starts playing.
  gsap.set(hero.querySelectorAll("[data-hero-item]"), { autoAlpha: 1 });
  const tl = gsap.timeline({ defaults: { duration: 0.8 }, delay: 0.05 });

  tl.addLabel("intro")
    .from(eyebrow, { autoAlpha: 0, x: -12, duration: 0.5 }, "intro")
    .from(split.lines, { yPercent: 105, stagger: 0.08, duration: 0.9 }, "<0.1")
    .addLabel("copy", "-=0.5");

  // PageHero groups its copy in one support slot; detail heroes (project,
  // service, post) mark each block with data-hero-fade instead.
  const copy = [
    ...(support ? Array.from(support.children) : []),
    ...hero.querySelectorAll("[data-hero-fade]"),
  ];
  if (copy.length > 0) {
    tl.from(copy, { autoAlpha: 0, y: 16, stagger: 0.08 }, "copy");
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
