import {
    CtaBand,
    Eyebrow,
    Hl,
    PageHero,
    Reveal,
    Section,
    SectionHead,
    Tag,
    img,
    usePageTitle,
} from '@/components/site/ui';
import { useLang } from '@/lib/site/i18n';

export default function CaseStudy() {
    const { t } = useLang();
    const c = t.caseStudy;
    usePageTitle(`${c.h1a}${c.h1b}`);
    return (
        <>
            <PageHero
                crumbs={[
                    [t.nav.home, '/'],
                    [t.nav.projects, '/projects'],
                    [c.crumb],
                ]}
                title={
                    <>
                        {c.h1a}
                        <Hl>{c.h1b}</Hl>
                    </>
                }
                lead={c.lead}
            >
                {{
                    before: <Tag line="signs">{c.tag}</Tag>,
                    after: (
                        <div className="mt-4 flex flex-wrap gap-8 border-t border-ink-2 pt-6">
                            {c.meta.map(([k, v]: any) => (
                                <div key={k} className="grid gap-1">
                                    <span className="font-mono text-xs tracking-[.1em] text-grey-400 uppercase rtl:font-arabic">
                                        {k}
                                    </span>
                                    {v}
                                </div>
                            ))}
                        </div>
                    ),
                }}
            </PageHero>
            <div data-parallax="">
                <img
                    src={img('cs-hero', 1600, 700)}
                    alt=""
                    className="aspect-[16/7] w-full object-cover"
                />
            </div>

            <Section>
                <div className="grid gap-10 md:grid-cols-3">
                    {c.cols.map(([eyebrow, title, text]: any) => (
                        <Reveal
                            key={eyebrow}
                            className="grid content-start gap-3"
                        >
                            <Eyebrow>{eyebrow}</Eyebrow>
                            <h3 className="text-[22px] font-extrabold">
                                {title}
                            </h3>
                            <p className="text-dim">{text}</p>
                        </Reveal>
                    ))}
                </div>
            </Section>

            <Section tone="dark">
                <SectionHead eyebrow={c.resEyebrow} title={c.resTitle} />
                <Reveal className="grid gap-6 md:grid-cols-3">
                    {c.results.map(([n, label]: any) => (
                        <div
                            key={label}
                            className="border-t-[3px] border-orange pt-5"
                        >
                            <b
                                data-count=""
                                className="block font-display text-[clamp(44px,5vw,64px)] leading-none font-black text-orange"
                            >
                                {n}
                            </b>
                            <span className="text-grey-400">{label}</span>
                        </div>
                    ))}
                </Reveal>
            </Section>

            <Section>
                <div className="grid gap-4 md:grid-cols-[2fr_1fr]">
                    <img
                        src={img('cs-g1', 1000, 760)}
                        alt=""
                        loading="lazy"
                        className="h-full w-full rounded-[10px] object-cover"
                    />
                    <div className="grid gap-4">
                        <img
                            src={img('cs-g2', 600, 370)}
                            alt=""
                            loading="lazy"
                            className="h-full w-full rounded-[10px] object-cover"
                        />
                        <img
                            src={img('cs-g3', 600, 370)}
                            alt=""
                            loading="lazy"
                            className="h-full w-full rounded-[10px] object-cover"
                        />
                    </div>
                </div>
            </Section>

            <CtaBand title={c.ctaTitle} btn={c.ctaBtn} />
        </>
    );
}
