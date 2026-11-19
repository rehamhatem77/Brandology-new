import { useEffect, useRef } from 'react';
import { finePointer, gsap, prefersReduced } from '@/lib/site/reveals';

/** Cursor bubble: shows a label over anything that carries data-cursor="..." (mouse only). */
export default function CustomCursor() {
    const el = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const bubble = el.current;
        if (!bubble || !finePointer() || prefersReduced()) return;
        const x = gsap.quickTo(bubble, 'x', { duration: 0.35, ease: 'power3' });
        const y = gsap.quickTo(bubble, 'y', { duration: 0.35, ease: 'power3' });
        let on = false;
        const move = (e: PointerEvent) => {
            x(e.clientX);
            y(e.clientY);
            const target = (e.target as HTMLElement).closest?.(
                '[data-cursor]',
            ) as HTMLElement | null;
            if (target && !on) {
                on = true;
                bubble.textContent = target.dataset.cursor ?? '';
                gsap.to(bubble, {
                    scale: 1,
                    opacity: 1,
                    duration: 0.35,
                    ease: 'back.out(2)',
                });
            } else if (!target && on) {
                on = false;
                gsap.to(bubble, { scale: 0, opacity: 0, duration: 0.25 });
            } else if (
                target &&
                on &&
                bubble.textContent !== target.dataset.cursor
            ) {
                bubble.textContent = target.dataset.cursor ?? '';
            }
        };
        window.addEventListener('pointermove', move);
        return () => window.removeEventListener('pointermove', move);
    }, []);
    return <div ref={el} className="cursor-bubble" aria-hidden="true" />;
}
