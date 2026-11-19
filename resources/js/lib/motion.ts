import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
export { gsap, ScrollTrigger };
export const prefersReducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
export const finePointer = () => typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

export function initPageMotion(root: HTMLElement | null) {
  if (!root || prefersReducedMotion()) return () => undefined;
  const ctx = gsap.context(() => {
    root.querySelectorAll<HTMLElement>("[data-rise]").forEach((el) => {
      gsap.from(el, { yPercent: 110, duration: 1, ease: "power4.out", scrollTrigger: { trigger: el, start: "top 92%", once: true } });
    });
    root.querySelectorAll<HTMLElement>("[data-up]").forEach((el) => {
      gsap.from(el, { y: 32, autoAlpha: 0, duration: 0.85, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 92%", once: true } });
    });
    root.querySelectorAll<HTMLElement>("[data-stag]").forEach((group) => {
      gsap.from([...group.children], { y: 55, autoAlpha: 0, duration: 0.85, ease: "power3.out", stagger: 0.1, scrollTrigger: { trigger: group, start: "top 86%", once: true } });
    });
    root.querySelectorAll<HTMLElement>("[data-img]").forEach((el) => {
      gsap.fromTo(el, { clipPath: "inset(10% 10% 10% 10%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "power3.out", clearProps: "clipPath", scrollTrigger: { trigger: el, start: "top 92%", once: true } });
    });
  }, root);
  return () => ctx.revert();
}
