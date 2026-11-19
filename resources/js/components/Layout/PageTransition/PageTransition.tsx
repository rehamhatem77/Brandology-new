import { useEffect } from "react";
import { router } from "@inertiajs/react";
import { gsap, prefersReducedMotion } from "../../../lib/motion";
const COLORS = ["#fdca0f", "#f99d1b", "#16171c", "#f99d1b", "#fdca0f"];
export default function PageTransition() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const root = document.querySelector<HTMLElement>(".page-transition");
    if (!root) return;
    let timeline: gsap.core.Timeline | undefined;
    const start = router.on("start", () => {
      const strips = root.querySelectorAll("[data-transition-strip]");
      gsap.set(root, { display: "flex" });
      timeline?.kill();
      timeline = gsap.timeline().fromTo(strips, { yPercent: 101 }, { yPercent: 0, duration: 0.42, ease: "power3.inOut", stagger: 0.04 });
    });
    const finish = router.on("finish", () => {
      const strips = root.querySelectorAll("[data-transition-strip]");
      timeline?.to(strips, { yPercent: -101, duration: 0.5, ease: "power3.inOut", stagger: 0.04 }).set(root, { display: "none" });
    });
    return () => { start(); finish(); timeline?.kill(); };
  }, []);
  return <div className="page-transition" aria-hidden="true">{COLORS.map((color, i) => <div key={i} data-transition-strip style={{ backgroundColor: color }} />)}<div className="transition-mark">B</div></div>;
}
