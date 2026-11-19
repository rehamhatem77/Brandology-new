import { router } from '@inertiajs/react';
import { createContext, useCallback, useContext, useRef } from 'react';
import type { ReactNode } from 'react';
import { gsap, prefersReduced } from '@/lib/site/reveals';

interface TransitionApi {
    go: (to: string) => void;
}
const Ctx = createContext<TransitionApi | null>(null);
export const useTransition = () => useContext(Ctx);

const STRIPS = ['#fdca0f', '#f99d1b', '#16171c', '#f99d1b', '#fdca0f'];

/**
 * Page transition: five coloured strips rise over the screen, the page changes
 * underneath, then they lift away. Links call go(path). Page animations wait on
 * window.__brdHold until the strips start to open.
 */
export function TransitionProvider({ children }: { children: ReactNode }) {
    const root = useRef<HTMLDivElement>(null);
    const mark = useRef<HTMLDivElement>(null);
    const busy = useRef(false);

    const go = useCallback((to: string) => {
        const rootEl = root.current;
        if (busy.current || prefersReduced() || !rootEl) {
            router.visit(to);
            return;
        }
        busy.current = true;
        const strips = rootEl.querySelectorAll('[data-strip]');
        window.__brdHold = new Promise<void>((resolve) => {
            window.__brdRelease = resolve;
        });
        gsap.set(rootEl, { display: 'flex' });
        gsap.set(mark.current, { autoAlpha: 0, scale: 0.5, rotate: -20 });

        // Strips close over the page, then the visit runs underneath.
        const closed = new Promise<void>((resolve) => {
            gsap.timeline({ onComplete: resolve })
                .fromTo(
                    strips,
                    { yPercent: 101 },
                    {
                        yPercent: 0,
                        duration: 0.55,
                        ease: 'power3.inOut',
                        stagger: 0.06,
                    },
                )
                .to(
                    mark.current,
                    {
                        autoAlpha: 1,
                        scale: 1,
                        rotate: 0,
                        duration: 0.45,
                        ease: 'back.out(2.4)',
                    },
                    '-=0.3',
                );
        });
        const visited = closed.then(
            () =>
                new Promise<void>((resolve) => {
                    router.visit(to, { onFinish: () => resolve() });
                }),
        );

        // Then the mark leaves and the strips lift away.
        void visited.then(() => {
            gsap.timeline({
                onComplete: () => {
                    gsap.set(rootEl, { display: 'none' });
                    busy.current = false;
                },
            })
                .to(
                    mark.current,
                    {
                        autoAlpha: 0,
                        scale: 1.6,
                        duration: 0.35,
                        ease: 'power2.in',
                    },
                    '+=0.15',
                )
                .add(() => {
                    window.__brdRelease?.();
                    window.__brdHold = null;
                }, '-=0.15')
                .to(
                    strips,
                    {
                        yPercent: -101,
                        duration: 0.65,
                        ease: 'power3.inOut',
                        stagger: 0.06,
                    },
                    '-=0.1',
                );
        });
    }, []);

    return (
        <Ctx.Provider value={{ go }}>
            {children}
            <div
                ref={root}
                aria-hidden="true"
                className="pointer-events-none fixed inset-0 z-[95] hidden"
            >
                {STRIPS.map((c, i) => (
                    <div
                        key={i}
                        data-strip
                        className="h-full w-1/5"
                        style={{ background: c }}
                    />
                ))}
                <div
                    ref={mark}
                    className="absolute inset-0 grid place-items-center"
                >
                    <span className="grid h-24 w-24 place-items-center rounded-full bg-black font-display text-[48px] font-black text-orange shadow-[0_0_0_8px_#fdca0f]">
                        B
                    </span>
                </div>
            </div>
        </Ctx.Provider>
    );
}
