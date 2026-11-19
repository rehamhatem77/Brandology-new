import { useEffect, useRef } from "react";
import type { ReactNode, RefObject } from "react";
import { usePage } from "@inertiajs/react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, initPageMotion, prefersReducedMotion } from "../../lib/motion";

export default function MotionProvider({ children }: { children: ReactNode }) {
  const root = useRef<HTMLElement | null>(null);
  const { url } = usePage();
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const lenis = new Lenis({ smoothWheel: true, lerp: 0.09 });
    lenis.on("scroll", ScrollTrigger.update);
    const ticker = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);
    return () => { gsap.ticker.remove(ticker); lenis.destroy(); };
  }, []);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
    const cleanup = initPageMotion(root.current);
    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 250);
    return () => { window.clearTimeout(refresh); cleanup(); };
  }, [url]);
  return <main ref={root as RefObject<HTMLElement>} className="page-content">{children}</main>;
}
