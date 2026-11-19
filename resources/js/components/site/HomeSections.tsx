import { useLayoutEffect, useRef } from 'react';
import { HOME_EXTRA } from '@/Data/home-extra';
import { PHOTO } from '@/Data/images';
import { useLang } from '@/lib/site/i18n';
import { gsap, prefersReduced, tilt, untilt } from '@/lib/site/reveals';
import type { PlateData } from '@/types/site';
import { PlateShape } from '@/components/site/Cards';
import Ticker from '@/components/site/Ticker';
import {
    Button,
    Icon,
    L,
    Photo,
    Polaroid,
    Section,
    SectionHead,
    cx,
} from '@/components/site/ui';

/** Two tilted tapes that cross under the hero and lead into the About sheet. */
export function Straps() {
    const { lang } = useLang();
    const x = HOME_EXTRA[lang];
    return (
        <div
            aria-hidden="true"
            className="relative h-[190px] overflow-hidden bg-black md:h-[250px]"
        >
            <div className="absolute inset-x-[-6%] top-3 -rotate-[2.5deg] bg-orange text-black md:top-6">
                <Ticker items={x.ticker2} reverse speed={22} />
            </div>
            <div className="absolute inset-x-[-6%] top-[72px] rotate-[2deg] bg-white text-black md:top-[104px]">
                <Ticker items={x.ticker} speed={34} />
            </div>
        </div>
    );
}

function Squiggle() {
    return (
        <svg
            viewBox="0 0 220 14"
            fill="none"
            stroke="#f99d1b"
            strokeWidth="4"
            strokeLinecap="round"
            className="-mt-1 h-3 w-44"
            aria-hidden="true"
        >
            <path d="M3 9c14-10 24 8 38 0s24 8 38 0 24 8 38 0 24 8 38 0 24 8 38 0" />
        </svg>
    );
}

/** About: story + three polaroids that drop onto the table as you arrive. */
export function AboutIntro() {
    const { lang } = useLang();
    const a = HOME_EXTRA[lang].about;
    const stack = useRef<HTMLDivElement>(null);
    useLayoutEffect(() => {
        if (prefersReduced() || !stack.current) return;
        const ctx = gsap.context(() => {
            gsap.from('[data-pol]', {
                y: 90,
                rotate: (i: number) => (i - 1) * 14,
                autoAlpha: 0,
                duration: 1,
                ease: 'back.out(1.6)',
                stagger: 0.14,
                scrollTrigger: {
                    trigger: stack.current,
                    start: 'top 78%',
                    once: true,
                },
            });
        }, stack);
        return () => ctx.revert();
    }, []);
    const pol =
        'absolute transition-transform duration-500 hover:z-30 hover:-translate-y-2 hover:!rotate-0';
    return (
        <Section tone="paper" className="overflow-hidden">
            <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
                <div className="grid gap-6">
                    <div className="grid gap-4">
                        <div data-up="">
                            <span className="eyebrow">{a.eyebrow}</span>
                        </div>
                        <div className="-mb-[.12em] overflow-hidden pb-[.12em]">
                            <h2
                                data-rise=""
                                className="max-w-[14ch] text-h2 font-extrabold uppercase"
                            >
                                {a.title}
                            </h2>
                        </div>
                        <Squiggle />
                    </div>
                    {a.text.map((p) => (
                        <p
                            key={p}
                            data-up=""
                            className="max-w-[48ch] text-[clamp(17px,1.4vw,20px)] leading-relaxed text-dim"
                        >
                            {p}
                        </p>
                    ))}
                    <div
                        data-up=""
                        className="flex flex-wrap items-center gap-4"
                    >
                        <Button to="/about" variant="black" arrow>
                            {a.cta}
                        </Button>
                        <Button to="/services" variant="outline">
                            {a.cta2}
                        </Button>
                    </div>
                    <p className="hand w-fit -rotate-3 rounded-[6px] bg-yellow px-4 py-2 text-[24px] text-black shadow-[3px_3px_0_#16171c]">
                        {a.note}
                    </p>
                </div>
                <div
                    ref={stack}
                    className="relative mx-auto h-[420px] w-full max-w-[560px] sm:h-[500px]"
                >
                    <div
                        data-pol=""
                        className={cx(pol, 'start-0 top-4 w-[62%]')}
                    >
                        <Polaroid
                            photo={PHOTO.teamMeeting}
                            rot={-6}
                            caption={a.captions[0]}
                        />
                    </div>
                    <div
                        data-pol=""
                        className={cx(pol, 'end-0 top-0 z-10 w-[54%]')}
                    >
                        <Polaroid
                            photo={PHOTO.pressMan}
                            rot={5}
                            caption={a.captions[1]}
                        />
                    </div>
                    <div
                        data-pol=""
                        className={cx(pol, 'bottom-0 start-[20%] z-20 w-[58%]')}
                    >
                        <Polaroid
                            photo={PHOTO.installer}
                            rot={-2}
                            caption={a.captions[2]}
                        />
                    </div>
                </div>
            </div>
        </Section>
    );
}

const CARD: Record<
    string,
    { card: string; btn: string; badge: string; photo: number }
> = {
    digital: {
        card: 'bg-orange text-black hover:bg-black hover:text-orange',
        btn: 'bg-black text-orange group-hover:bg-orange group-hover:text-black',
        badge: 'bg-white',
        photo: PHOTO.laptopDesign,
    },
    print: {
        card: 'bg-yellow text-black hover:bg-black hover:text-yellow',
        btn: 'bg-black text-yellow group-hover:bg-yellow group-hover:text-black',
        badge: 'bg-white',
        photo: PHOTO.pressClose,
    },
    signs: {
        card: 'bg-black text-white hover:bg-yellow hover:text-black',
        btn: 'bg-yellow text-black group-hover:bg-black group-hover:text-yellow',
        badge: 'bg-yellow',
        photo: PHOTO.signHighVoltage,
    },
};

/** Services: three cards fan in as you arrive, then change shape on hover and reveal their list. */
export function ServiceFan({
    eyebrow,
    title,
    lead,
    plates,
}: {
    eyebrow: string;
    title: string;
    lead: string;
    plates: PlateData[];
}) {
    const { lang, ar, t } = useLang();
    const x = HOME_EXTRA[lang];
    const grid = useRef<HTMLDivElement>(null);
    useLayoutEffect(() => {
        const mm = gsap.matchMedia();
        mm.add(
            '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
            () => {
                const cards = gsap.utils.toArray<HTMLElement>(
                        '[data-fan]',
                        grid.current,
                    ),
                    dir = ar ? -1 : 1;
                gsap.fromTo(
                    cards,
                    {
                        x: (i: number) => (1 - i) * dir * 330,
                        y: 90,
                        rotate: (i: number) => (i - 1) * 9 * dir,
                        scale: 0.92,
                    },
                    {
                        x: 0,
                        y: 0,
                        rotate: 0,
                        scale: 1,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: grid.current,
                            start: 'top 92%',
                            end: 'top 38%',
                            scrub: 0.7,
                        },
                    },
                );
            },
        );
        return () => mm.revert();
    }, [ar]);
    return (
        <Section tone="white" className="overflow-hidden">
            <SectionHead eyebrow={eyebrow} title={title} lead={lead} />
            <div ref={grid} className="grid gap-6 lg:grid-cols-3">
                {plates.map((p) => {
                    const st = CARD[p.line];
                    return (
                        <L
                            key={p.line}
                            to={p.link}
                            data-fan=""
                            data-cursor={p.cta}
                            onPointerMove={tilt}
                            onPointerLeave={untilt}
                            className={cx(
                                'group relative isolate flex flex-col justify-between gap-6 overflow-hidden rounded-[64px_18px_64px_18px] p-5 no-underline transition-[border-radius,transform,background-color,color] duration-700 ease-[cubic-bezier(.2,.8,.2,1)] hover:-translate-y-2 hover:rotate-[-1.2deg] hover:rounded-[18px_64px_18px_64px] focus-visible:rounded-[18px_64px_18px_64px] md:p-6',
                                st.card,
                            )}
                        >
                            <div className="relative">
                                <Photo
                                    id={st.photo}
                                    w={800}
                                    h={560}
                                    className="aspect-[16/11] rounded-[48px_12px_48px_12px] transition-[border-radius] duration-700 group-hover:rounded-[12px_48px_12px_48px] [&_img]:transition-transform [&_img]:duration-700 group-hover:[&_img]:scale-110"
                                />
                                <span
                                    className={cx(
                                        'absolute -bottom-6 end-4 grid h-[76px] w-[76px] place-items-center rounded-full border-2 border-black shadow-[3px_3px_0_#16171c] transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110',
                                        st.badge,
                                    )}
                                >
                                    <span className="origin-center scale-[.72]">
                                        <PlateShape line={p.line} />
                                    </span>
                                </span>
                            </div>
                            <div className="grid gap-3 px-2">
                                <h3 className="text-[clamp(24px,2.4vw,32px)] leading-[1.06] font-black uppercase rtl:normal-case">
                                    {p.title}
                                </h3>
                                <p className="max-w-[34ch] text-[16px] leading-snug opacity-90">
                                    {x.serviceText[p.line]}
                                </p>
                                <ul className="grid gap-1.5 overflow-hidden transition-all duration-500 ease-out group-hover:max-h-44 group-hover:opacity-100 group-focus-visible:max-h-44 group-focus-visible:opacity-100 [@media(hover:hover)]:max-h-0 [@media(hover:hover)]:opacity-0">
                                    {p.items?.map((it, i) => (
                                        <li
                                            key={it}
                                            style={{
                                                transitionDelay: `${i * 70}ms`,
                                            }}
                                            className="flex items-center gap-3 text-[15px] font-semibold"
                                        >
                                            <span className="h-2 w-2 rounded-full bg-current" />
                                            {it}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex items-center justify-between gap-3 px-2 pb-1">
                                <span className="font-mono text-[13px] font-medium tracking-[.08em] uppercase rtl:font-arabic">
                                    {t.common.line[p.line]}
                                </span>
                                <span
                                    className={cx(
                                        'grid h-14 w-14 shrink-0 place-items-center rounded-full transition-all duration-500 group-hover:-rotate-45 group-hover:scale-110',
                                        st.btn,
                                    )}
                                >
                                    <Icon.Arrow className="h-5 w-5" />
                                </span>
                            </div>
                        </L>
                    );
                })}
            </div>
        </Section>
    );
}
