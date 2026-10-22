import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";

// Single registration point: every motion module imports gsap from here.
gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);

// Same curve as --ease-signature in global.css, so CSS and GSAP motion match.
CustomEase.create("signature", "0.22,1,0.36,1");
gsap.defaults({ ease: "signature", duration: 0.5 });

export const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
export const FINE_POINTER = "(hover: hover) and (pointer: fine)";

export function prefersReducedMotion(): boolean {
  return window.matchMedia(REDUCED_MOTION).matches;
}

export { gsap, ScrollTrigger, SplitText };
