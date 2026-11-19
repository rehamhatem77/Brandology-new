import { SERVICES } from '@/Data/content';
import {
    Button,
    Checks,
    CtaBand,
    Hl,
    ImgFrame,
    L,
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

export function ProcessSection() {
    const { t } = useLang();
    return (
        <Section tone="dark">
            <SectionHead eyebrow={t.process.eyebrow} title={t.process.title} />
            <Reveal className="grid gap-y-6 sm:grid-cols-2 md:grid-cols-4">
                {t.process.steps.map(([title, text]: any, i: any) => (
                    <div
                        key={title}
                        className="grid content-start gap-2.5 border-s-2 border-orange px-6 py-7"
                    >
                        <b className="font-mono text-[13px] font-medium text-orange">
                            0{i + 1}
                        </b>
                        <h3 className="text-[22px] font-extrabold">{title}</h3>
                        <p className="text-[15px] text-grey-400">{text}</p>
                    </div>
                ))}
            </Reveal>
        </Section>
    );
}

export default function Services() {
    const { t, L: pick } = useLang();
    const { add, toast } = useQuote();
    const s = t.servicesPage;
    usePageTitle(s.crumb);
    return (
        <>
            <PageHero
                crumbs={[[t.nav.home, '/'], [s.crumb]]}
                title={
                    <>
                        {s.h1a}
                        <Hl>{s.h1b}</Hl>
                        {s.h1c}
                    </>
                }
                lead={s.lead}
            />
            <Section tone="white">
                {SERVICES.map((svc, i) => (
                    <div
                        key={svc.id}
                        id={svc.id}
                        className="grid items-center gap-8 border-b border-line py-[72px] md:grid-cols-2 md:gap-16"
                    >
                        <Reveal className="grid gap-[18px]">
                            <Tag line={svc.line}>{t.common.line[svc.line]}</Tag>
                            <h2 className="text-h2 font-extrabold uppercase">
                                {pick(svc.title)}
                            </h2>
                            <p className="lead">{pick(svc.intro)}</p>
                            <Checks items={pick(svc.features).slice(0, 4)} />
                            <div className="flex flex-wrap gap-3">
                                <Button to={`/services/${svc.id}`} arrow>
                                    {t.common.view}
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        add({
                                            kind: 'service',
                                            id: svc.id,
                                            qty: 1,
                                        });
                                        toast(
                                            `${t.common.added}: ${pick(svc.title)}`,
                                        );
                                    }}
                                >
                                    {t.common.add}
                                </Button>
                            </div>
                        </Reveal>
                        <Reveal className={i % 2 ? 'md:-order-1' : ''}>
                            <L
                                to={`/services/${svc.id}`}
                                tabIndex={-1}
                                aria-hidden="true"
                            >
                                <ImgFrame src={img(svc.img)} />
                            </L>
                        </Reveal>
                    </div>
                ))}
            </Section>
            <ProcessSection />
            <CtaBand title={s.ctaTitle} btn={s.ctaBtn} />
        </>
    );
}
