import { gsap } from "./gsap";

// Fraction of the pointer's distance from the center the element follows.
const PULL = 0.3;

/**
 * Magnetic hover for [data-magnetic] CTAs: the element leans toward the
 * pointer and springs back on leave. Returns a cleanup that removes the
 * listeners, for matchMedia to call on revert.
 */
export function initMagnetic(): () => void {
  const cleanups = gsap.utils
    .toArray<HTMLElement>("[data-magnetic]")
    .map((el) => {
      const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3" });

      const onMove = (e: PointerEvent) => {
        const rect = el.getBoundingClientRect();
        xTo((e.clientX - (rect.left + rect.width / 2)) * PULL);
        yTo((e.clientY - (rect.top + rect.height / 2)) * PULL);
      };
      const onLeave = () => {
        xTo(0);
        yTo(0);
      };

      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);
      return () => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
      };
    });

  return () => cleanups.forEach((cleanup) => cleanup());
}
