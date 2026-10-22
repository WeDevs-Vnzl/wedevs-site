import { gsap } from "./gsap";

/** Rails ([data-scroll-progress]) that fill as their parent scrolls through view. */
export function initScrollProgress(): void {
  gsap.utils.toArray<HTMLElement>("[data-scroll-progress]").forEach((rail) => {
    gsap.fromTo(
      rail,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: rail.parentElement,
          start: "top 75%",
          end: "bottom 60%",
          scrub: 0.5,
        },
      },
    );
  });
}
