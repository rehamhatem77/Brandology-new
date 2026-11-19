import {
    CtaBand,
    Eyebrow,
    Hl,
    ImgFrame,
    PageHero,
    Reveal,
    Section,
    SectionHead,
    Tag,
    img,
    usePageTitle,
} from '@/components/site/ui';
import { useLang } from '@/lib/site/i18n';

export default function About() {
    const { t } = useLang();
    const a = t.about;
    usePageTitle(a.crumb);
    return (
        <>
            <PageHero
                crumbs={[[t.nav.home, '/'], [a.crumb]]}
                title={
                    <>
                        {a.h1a}
                        <Hl>{a.h1b}</Hl>
                    </>
                }
                lead={a.lead}
            />

            <Section>
                <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
                    <Reveal>
                        <ImgFrame src={img('brandology-studio')} alt="" />
                    </Reveal>
                    <Reveal className="grid gap-5">
                        <Eyebrow>{a.storyEyebrow}</Eyebrow>
                        <h2
                            data-split=""
                            className="text-h2 font-extrabold uppercase"
                        >
                            {a.storyTitle}
                        </h2>
                        <p className="lead">{a.story}</p>
                    </Reveal>
                </div>
            </Section>

            <Section tone="dark">
                <SectionHead eyebrow={a.mvbEyebrow} title={a.mvbTitle} />
                <div className="grid gap-6 md:grid-cols-3">
                    {a.mvb.map(([tag, title, text]: any) => (
                        <Reveal
                            key={tag}
                            data-tilt=""
                            className="grid content-start gap-3.5 rounded-[10px] border border-ink-2 bg-ink p-8"
                        >
                            <Tag line="signs">{tag}</Tag>
                            <h3 className="text-[22px] font-extrabold">
                                {title}
                            </h3>
                            <p className="text-grey-400">{text}</p>
                        </Reveal>
                    ))}
                </div>
            </Section>

            <Section>
                <div className="grid items-start gap-10 md:grid-cols-2 md:gap-16">
                    <SectionHead
                        eyebrow={a.timeEyebrow}
                        title={a.timeTitle}
                        lead={a.timeLead}
                    />
                    <Reveal data-line="" className="ms-2 border-s-2 border-fg">
                        {a.timeline.map(([year, title, text]: any) => (
                            <div
                                key={year}
                                className="relative grid gap-1.5 ps-8 pb-9"
                            >
                                <span className="absolute -start-[9px] top-1 h-4 w-4 rounded-full border-[3px] border-white bg-orange" />
                                <b className="font-mono text-sm font-medium text-orange">
                                    {year}
                                </b>
                                <h3 className="text-[22px] font-extrabold">
                                    {title}
                                </h3>
                                <p className="text-dim">{text}</p>
                            </div>
                        ))}
                    </Reveal>
                </div>
            </Section>

            <Section tone="paper">
                <SectionHead eyebrow={a.teamEyebrow} title={a.teamTitle} />
                <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
                    {a.team.map(([role, sub]: any, i: any) => (
                        <Reveal key={role} className="group">
                            <img
                                src={img(`team-${i + 1}`, 400, 500)}
                                alt=""
                                loading="lazy"
                                className="aspect-[4/5] w-full rounded-[10px] object-cover grayscale transition group-hover:grayscale-0"
                            />
                            <h3 className="mt-3.5 text-lg font-extrabold">
                                {role}
                            </h3>
                            <span className="font-mono text-[13px] text-dim rtl:font-arabic">
                                {sub}
                            </span>
                        </Reveal>
                    ))}
                </div>
            </Section>

            <CtaBand title={a.ctaTitle} btn={a.ctaBtn} to="/contact" />
        </>
    );
}
