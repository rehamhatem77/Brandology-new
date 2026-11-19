import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
export { gsap, ScrollTrigger };

export const prefersReduced = (): boolean =>
    matchMedia('(prefers-reduced-motion: reduce)').matches;
export const finePointer = (): boolean =>
    matchMedia('(hover: hover) and (pointer: fine)').matches;

/** Resolves when the preloader is gone and any page transition has begun to open, so entrances play where they can be seen. */
export const whenReady = (): Promise<unknown> =>
    Promise.all([
        window.BRD_READY || Promise.resolve(),
        window.__brdHold || Promise.resolve(),
    ]);

/** Scroll reveals for one page. Elements opt in with data attributes:
 *  data-rise  heading slides up out of a mask      data-up   fades and lifts
 *  data-stag  children arrive one after another    data-img  image opens from a cropped frame
 *  Returns a cleanup function. */
export function initReveals(root: HTMLElement | null): () => void {
    if (!root || prefersReduced()) return () => {};
    const ctx = gsap.context(() => {
        gsap.utils
            .toArray<HTMLElement>('[data-rise]', root)
            .forEach((el) =>
                gsap.from(el, {
                    yPercent: 108,
                    duration: 1.1,
                    ease: 'power4.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 92%',
                        once: true,
                    },
                }),
            );
        gsap.utils
            .toArray<HTMLElement>('[data-up]', root)
            .forEach((el) =>
                gsap.from(el, {
                    y: 36,
                    autoAlpha: 0,
                    duration: 0.9,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 92%',
                        once: true,
                    },
                }),
            );
        gsap.utils
            .toArray<HTMLElement>('[data-stag]', root)
            .forEach((group) => {
                gsap.from([...group.children], {
                    y: 80,
                    rotate: (i: number) => (i % 2 ? 2.5 : -2.5),
                    autoAlpha: 0,
                    duration: 1,
                    ease: 'power3.out',
                    stagger: 0.11,
                    scrollTrigger: {
                        trigger: group,
                        start: 'top 86%',
                        once: true,
                    },
                });
            });
        gsap.utils
            .toArray<HTMLElement>('[data-img]', root)
            .forEach((el) =>
                gsap.fromTo(
                    el,
                    { clipPath: 'inset(12% 12% 12% 12% round 48px)' },
                    {
                        clipPath: 'inset(0% 0% 0% 0% round 0px)',
                        duration: 1.3,
                        ease: 'power3.out',
                        clearProps: 'clipPath',
                        scrollTrigger: {
                            trigger: el,
                            start: 'top 92%',
                            once: true,
                        },
                    },
                ),
            );
    }, root);
    return () => ctx.revert();
}

/** Pointer tilt for cards that carry onPointerMove={tilt} onPointerLeave={untilt}. */
export function tilt(e: React.PointerEvent<HTMLElement>): void {
    if (e.pointerType !== 'mouse') return;
    const el = e.currentTarget,
        r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5,
        y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${(-y * 5).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg) translateY(-8px)`;
}
export function untilt(e: React.PointerEvent<HTMLElement>): void {
    e.currentTarget.style.transform = '';
}
