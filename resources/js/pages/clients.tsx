import { CLIENT_GROUPS } from '@/Data/copy';
import {
    CtaBand,
    Eyebrow,
    Hl,
    PageHero,
    Reveal,
    Section,
    usePageTitle,
} from '@/components/site/ui';
import { useLang } from '@/lib/site/i18n';

export default function Clients() {
    const { t, L: pick } = useLang();
    const c = t.clientsPage;
    usePageTitle(c.crumb);
    return (
        <>
            <PageHero
                crumbs={[[t.nav.home, '/'], [c.crumb]]}
                title={
                    <>
                        {c.h1a}
                        <Hl>{c.h1b}</Hl>
                        {c.h1c}
                    </>
                }
                lead={c.lead}
            />
            <Section>
                <div className="grid gap-10">
                    {CLIENT_GROUPS.map((g) => (
                        <Reveal key={g.en}>
                            <h4 className="mb-4 border-b border-line pb-2.5 font-mono text-[13px] font-medium tracking-[.12em] text-dim uppercase rtl:font-arabic">
                                {pick(g)}
                            </h4>
                            <div className="grid grid-cols-[repeat(auto-fill,minmax(170px,1fr))] gap-3">
                                {g.names.map((n) => (
                                    <div
                                        key={n}
                                        className="grid h-[84px] place-items-center rounded-[10px] border border-line p-2 text-center font-display text-base font-extrabold text-grey-400 transition hover:border-orange hover:text-fg"
                                    >
                                        {n}
                                    </div>
                                ))}
                            </div>
                        </Reveal>
                    ))}
                    <p className="font-mono text-[13px] text-dim rtl:font-arabic">
                        {c.note}
                    </p>
                </div>
            </Section>
            <Section tone="dark">
                <div className="grid max-w-[900px] gap-6">
                    <Eyebrow>{c.quoteEyebrow}</Eyebrow>
                    <blockquote className="font-display text-[clamp(22px,3vw,36px)] leading-snug font-extrabold rtl:font-arabic rtl:leading-relaxed">
                        {c.quote}
                    </blockquote>
                    <p className="font-mono text-sm text-grey-400 rtl:font-arabic">
                        {c.quoteBy}
                    </p>
                </div>
            </Section>
            <CtaBand title={c.ctaTitle} btn={c.ctaBtn} to="/contact" />
        </>
    );
}
