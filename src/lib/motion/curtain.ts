import { gsap } from "./gsap";

/**
 * Page-transition curtain (markup in Motion.astro, persisted across swaps).
 * Each column holds a violet and a night layer: on exit the violet layer
 * sweeps up and the night layer chases it, then a violet pixel blinks in
 * the center while the next page loads. On enter the layers lift off the
 * top in reverse order.
 */
const SWEEP = { duration: 0.5, ease: "power3.inOut", stagger: 0.04 };

function parts() {
  const curtain = document.querySelector<HTMLElement>("[data-curtain]");
  if (!curtain) return null;
  return {
    curtain,
    violet: curtain.querySelectorAll("[data-curtain-violet]"),
    night: curtain.querySelectorAll("[data-curtain-night]"),
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
    .fromTo(
      p.violet,
      { scaleY: 0, transformOrigin: "50% 100%" },
      { scaleY: 1, ...SWEEP },
    )
    .fromTo(
      p.night,
      { scaleY: 0, transformOrigin: "50% 100%" },
      { scaleY: 1, ...SWEEP },
      "<0.12",
    )
    .fromTo(
      p.mark,
      { autoAlpha: 0, scale: 0 },
      { autoAlpha: 1, scale: 1, duration: 0.25, ease: "back.out(2.5)" },
      "-=0.1",
    )
    .then();
}

/**
 * Lifts the curtain if a navigation left it down. Returns false when the
 * curtain was not covering the page (first load, reduced motion).
 */
export function liftCurtain(): boolean {
  const p = parts();
  if (!p || Number(gsap.getProperty(p.night[0], "scaleY")) === 0) {
    return false;
  }
  gsap
    .timeline()
    .to(p.mark, { autoAlpha: 0, scale: 0, duration: 0.2, ease: "power2.in" })
    .to(p.night, { scaleY: 0, transformOrigin: "50% 0%", ...SWEEP })
    .to(p.violet, { scaleY: 0, transformOrigin: "50% 0%", ...SWEEP }, "<0.1")
    .set(p.curtain, { pointerEvents: "none" });
  return true;
}
