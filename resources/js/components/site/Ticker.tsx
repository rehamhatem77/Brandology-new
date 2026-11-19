import { useLayoutEffect, useRef } from 'react';
import { gsap, ScrollTrigger, prefersReduced } from '@/lib/site/reveals';
import { useLang } from '@/lib/site/i18n';
import { cx } from '@/components/site/ui';

export const Star = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
        <path
            d="M12 0c1 7 5 11 12 12-7 1-11 5-12 12-1-7-5-11-12-12 7-1 11-5 12-12z"
            fill="currentColor"
        />
    </svg>
);

/** A band of words that never stops. Scrolling fast makes it speed up, then it settles back. */
export default function Ticker({
    items,
    reverse = false,
    className,
    speed = 28,
}: {
    items: string[];
    reverse?: boolean;
    className?: string;
    speed?: number;
}) {
    const { ar } = useLang();
    const track = useRef<HTMLDivElement>(null);
    useLayoutEffect(() => {
        if (prefersReduced() || !track.current) return;
        const el = track.current;
        const left = (ar ? -1 : 1) * (reverse ? -1 : 1) >= 0; // true: travels toward the start edge
        gsap.set(el, { xPercent: left ? 0 : -50 });
        const tween = gsap.to(el, {
            xPercent: left ? -50 : 0,
            duration: speed,
            ease: 'none',
            repeat: -1,
        });
        let ts = 1,
            boost = 1;
        const st = ScrollTrigger.create({
            onUpdate: (s) => {
                boost = Math.max(
                    boost,
                    1 + Math.min(7, Math.abs(s.getVelocity()) / 300),
                );
            },
        });
        const tick = () => {
            boost += (1 - boost) * 0.05;
            ts += (boost - ts) * 0.12;
            tween.timeScale(ts);
        };
        gsap.ticker.add(tick);
        return () => {
            gsap.ticker.remove(tick);
            st.kill();
            tween.kill();
            gsap.set(el, { clearProps: 'transform' });
        };
    }, [ar, reverse, speed]);

    const run = (k: string) =>
        items.map((w, i) => (
            <span
                key={`${k}${i}`}
                className="flex shrink-0 items-center gap-8 pe-8"
            >
                <span className="font-display text-[clamp(22px,3vw,38px)] leading-none font-black uppercase rtl:font-bold rtl:normal-case">
                    {w}
                </span>
                <Star className="h-7 w-7 shrink-0 md:h-9 md:w-9" />
            </span>
        ));
    return (
        <div className={cx('overflow-hidden py-4 md:py-5', className)}>
            <div ref={track} className="flex w-max items-center">
                {run('a')}
                {run('b')}
            </div>
        </div>
    );
}
