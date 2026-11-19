import { useEffect } from "react";
import { finePointer, prefersReducedMotion, gsap } from "../../../lib/motion";
export default function CustomCursor() {
  useEffect(() => {
    if (!finePointer() || prefersReducedMotion()) return;
    const dot = document.querySelector<HTMLElement>(".cursor-dot");
    const ring = document.querySelector<HTMLElement>(".cursor-ring");
    if (!dot || !ring) return;
    const move = (e: MouseEvent) => { gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.08 }); gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.22, ease: "power2.out" }); };
    const hover = (e: Event) => { const target = e.target as HTMLElement; if (target.closest("a,button,[data-cursor]")) ring.classList.add("cursor-hover"); else ring.classList.remove("cursor-hover"); };
    window.addEventListener("mousemove", move); document.addEventListener("mouseover", hover);
    return () => { window.removeEventListener("mousemove", move); document.removeEventListener("mouseover", hover); };
  }, []);
  return <><div className="cursor-dot" aria-hidden="true"/><div className="cursor-ring" aria-hidden="true"/></>;
}
