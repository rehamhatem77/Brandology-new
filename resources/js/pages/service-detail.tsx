import { SERVICES } from '@/Data/content';
import { PlateCard } from '@/components/site/Cards';
import {
    Button,
    Checks,
    CtaBand,
    Eyebrow,
    NotFound,
    PageHero,
    Reveal,
    Section,
    SectionHead,
    Tag,
    img,
    usePageTitle,
} from '@/components/site/ui';
import { useLang } from '@/lib/site/i18n';
import { useQuote } from '@/lib/site/quote';
import { ProcessSection } from '@/pages/services';

/** Props come from routes/site.php: /services/{id} */
export default function ServiceDetail({ id }: { id: string }) {
    const { t, L: pick } = useLang();
    const { add, toast } = useQuote();
    const s = SERVICES.find((x) => x.id === id);
    const d = t.serviceDetail;
    usePageTitle(s ? pick(s.title) : null);
    if (!s) return <NotFound back="/services" />;

    const related = SERVICES.filter((x) => x.id !== s.id && x.line === s.line)
        .concat(SERVICES.filter((x) => x.line !== s.line))
        .slice(0, 3);
    const addSvc = () => {
        add({ kind: 'service', id: s.id, qty: 1 });
        toast(`${t.common.added}: ${pick(s.title)}`);
    };

    return (
        <>
            <PageHero
                small
                crumbs={[
                    [t.nav.home, '/'],
                    [t.nav.services, '/services'],
                    [pick(s.title)],
                ]}
                title={pick(s.title)}
                lead={pick(s.intro)}
            >
                {{
                    before: <Tag line={s.line}>{t.common.line[s.line]}</Tag>,
                    after: (
                        <div className="flex flex-wrap gap-3">
                            {s.id === 'signs' && (
                                <Button to="/safety-signs" arrow>
                                    {d.catalogue}
                                </Button>
                            )}
                            <Button
                                variant={
                                    s.id === 'signs' ? 'outlineDark' : 'primary'
                                }
                                onClick={addSvc}
                            >
                                {d.addSvc}
                            </Button>
                        </div>
                    ),
                }}
            </PageHero>
            <div data-parallax="">
                <img
                    src={img(s.img, 1600, 640)}
                    alt=""
                    className="aspect-[5/2] w-full object-cover"
                />
            </div>

            <Section>
                <div className="grid items-start gap-10 md:grid-cols-2 md:gap-16">
                    <Reveal className="grid gap-6">
                        <Eyebrow>{d.whatIn}</Eyebrow>
                        <Checks items={pick(s.features)} one />
                    </Reveal>
                    <Reveal
                        data-tilt=""
                        className="grid gap-5 rounded-[10px] bg-black p-9 text-white"
                    >
                        <Eyebrow>{d.deliver}</Eyebrow>
                        <ol className="grid gap-3.5">
                            {pick(s.deliverables).map((x: any, i: any) => (
                                <li
                                    key={x}
                                    className="flex items-baseline gap-3.5 text-[17px]"
                                >
                                    <span className="font-mono text-[13px] text-orange">
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                    {x}
                                </li>
                            ))}
                        </ol>
                    </Reveal>
                </div>
            </Section>

            <ProcessSection />

            <Section>
                <div className="grid items-start gap-10 md:grid-cols-2 md:gap-16">
                    <SectionHead eyebrow={d.faq} title={d.faq} />
                    <Reveal className="grid gap-3">
                        {s.faq.map((f) => (
                            <details
                                key={pick(f.q)}
                                className="group rounded-[10px] border-2 border-fg px-5"
                            >
                                <summary className="flex cursor-pointer list-none justify-between gap-4 py-[18px] font-display text-[17px] font-bold rtl:font-arabic [&::-webkit-details-marker]:hidden">
                                    {pick(f.q)}
                                    <span className="text-2xl leading-none text-orange group-open:hidden">
                                        +
                                    </span>
                                    <span className="hidden text-2xl leading-none text-orange group-open:inline">
                                        −
                                    </span>
                                </summary>
                                <p className="pb-[18px] text-dim">
                                    {pick(f.a)}
                                </p>
                            </details>
                        ))}
                    </Reveal>
                </div>
            </Section>

            <Section tone="paper">
                <SectionHead eyebrow={d.related} />
                <div className="grid gap-6 md:grid-cols-3">
                    {related.map((r) => (
                        <PlateCard
                            key={r.id}
                            line={r.line}
                            title={pick(r.title)}
                            link={`/services/${r.id}`}
                            cta={t.common.view}
                        />
                    ))}
                </div>
            </Section>

            <CtaBand title={d.ctaTitle} btn={d.ctaBtn} />
        </>
    );
}
