import { gsap } from "./gsap";

/**
 * Entrance of one PixelGrid (src/components/ui/PixelGrid.astro): the cells
 * flicker on in random order, then the glow, when the grid has one, lights
 * up underneath. Shared by the hero intros and the scroll-triggered grids so
 * every band gets the same gesture.
 */
export function gridEntrance(grid: Element): gsap.core.Timeline {
  const tl = gsap.timeline();
  tl.from(grid.querySelectorAll("rect"), {
    opacity: 0,
    duration: 0.3,
    stagger: { amount: 0.9, from: "random" },
  });
  const glow = grid.querySelector(".pixel-grid-glow");
  if (glow) tl.from(glow, { autoAlpha: 0, duration: 1.2 }, 0.2);
  return tl;
}

/**
 * Scroll-triggered entrance for every PixelGrid outside a hero (the heroes
 * run theirs inside their intro timelines, see hero.ts). Each grid plays
 * once, when the band it decorates reaches the lower part of the viewport.
 */
export function initPixelGrids(): void {
  gsap.utils
    .toArray<HTMLElement>("[data-pixel-grid]")
    .filter((grid) => !grid.closest("[data-hero], [data-page-hero]"))
    .forEach((grid) => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: grid.parentElement ?? grid,
            start: "top 85%",
            once: true,
          },
        })
        .add(gridEntrance(grid));
    });
}
