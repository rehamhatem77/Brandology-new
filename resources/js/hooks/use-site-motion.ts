import { usePage } from '@inertiajs/react';
import Lenis from 'lenis';
import { useEffect, useLayoutEffect } from 'react';
import type { RefObject } from 'react';
import { initGlobal, initMotion } from '@/lib/site/motion';
import {
    ScrollTrigger,
    gsap,
    initReveals,
    prefersReduced,
} from '@/lib/site/reveals';

/**
 * Motion for the public site: smooth scrolling kept in step with ScrollTrigger, and
 * every page's entrance / scroll animations (armed on arrival, cleaned up on leave).
 */
export function useSiteMotion(main: RefObject<HTMLElement | null>) {
    const { url } = usePage();
    const path = url.split(/[?#]/)[0];

    useEffect(() => {
        if (prefersReduced()) return;
        const lenis = new Lenis({ lerp: 0.1 });
        window.__lenis = lenis;
        lenis.on('scroll', () => ScrollTrigger.update());
        const tick = (t: number) => lenis.raf(t * 1000);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);
        return () => {
            gsap.ticker.remove(tick);
            lenis.destroy();
            window.__lenis = null;
        };
    }, []);

    useLayoutEffect(() => {
        const hash = window.location.hash;
        const target = hash ? document.querySelector<HTMLElement>(hash) : null;
        let jump: number | undefined;
        if (target) {
            jump = window.setTimeout(
                () =>
                    window.__lenis
                        ? window.__lenis.scrollTo(target, { offset: -90 })
                        : target.scrollIntoView(),
                400,
            );
        } else if (window.__lenis) {
            window.__lenis.scrollTo(0, { immediate: true });
        } else {
            window.scrollTo(0, 0);
        }
        initGlobal({ gsap, ScrollTrigger });
        const stopMotion = initMotion({
            gsap,
            ScrollTrigger,
            root: main.current,
            ready: window.BRD_READY || Promise.resolve(),
        });
        const stopReveals = initReveals(main.current);
        const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 300);
        return () => {
            window.clearTimeout(refresh);
            window.clearTimeout(jump);
            stopMotion();
            stopReveals();
        };
    }, [path, main]);
}
