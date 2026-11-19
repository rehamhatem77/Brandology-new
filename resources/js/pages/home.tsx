import { POSTS } from '@/Data/content';
import { CLIENT_GROUPS, PROJECTS } from '@/Data/copy';
import { PostCard, ProjectCard } from '@/components/site/Cards';
import { AboutIntro, ServiceFan, Straps } from '@/components/site/HomeSections';
import Particles from '@/components/site/Particles';
import {
    ArrowLink,
    Button,
    CtaBand,
    Eyebrow,
    Hl,
    ImgFrame,
    Reveal,
    Section,
    SectionHead,
    img,
    usePageTitle,
} from '@/components/site/ui';
import { useLang } from '@/lib/site/i18n';

const SECTOR_ICONS = [
    <path key="o" d="M12 2s6 7 6 12a6 6 0 0 1-12 0c0-5 6-12 6-12Z" />,
    <path key="f" d="M4 21V9l8-6 8 6v12M9 21v-6h6v6" />,
    <path key="m" d="M12 3v14M5 12a7 7 0 0 0 14 0M3 21c3-2 6-2 9 0s6 2 9 0" />,
    <g key="r">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" />
    </g>,
];

export default function Home() {
    const { t, L: pick } = useLang();
    const h = t.home;
    usePageTitle(null);

    return (
        <>
            <section className="overflow-hidden bg-black text-white">
                <div className="container-site grid items-center gap-10 pt-32 pb-16 md:grid-cols-[1.15fr_.85fr] md:pt-44 md:pb-24">
                    <div>
                        <div data-hero-item="">
                            <Eyebrow>{h.eyebrow}</Eyebrow>
                        </div>
                        <h1
                            data-hero-title=""
                            className="mt-5 text-h1 font-black uppercase"
                        >
                            {h.h1a}
                            <Hl>{h.h1b}</Hl>
                            <br />
                            {h.h1c}
                        </h1>
                        <p
                            data-hero-item=""
                            className="lead mt-6 text-grey-400"
                        >
                            {h.lead}
                        </p>
                        <div
                            data-hero-item=""
                            className="mt-10 flex flex-wrap gap-3.5"
                        >
                            <Button to="/projects" arrow>
                                {h.cta1}
                            </Button>
                            <Button to="/safety-signs" variant="outlineDark">
                                {h.cta2}
                            </Button>
                        </div>
                    </div>
                    <Particles className="-order-1 aspect-square w-full max-w-[340px] justify-self-center md:order-none md:max-w-[520px] md:justify-self-end" />
                </div>
            </section>

            <div className="bg-black pb-10">
                <div className="container-site">
                    <div className="grid grid-cols-2 overflow-hidden rounded-[28px] border border-ink-2 bg-ink md:grid-cols-4">
                        {h.stats.map(([n, label]: any, i: any) => (
                            <div
                                key={label}
                                className={`grid gap-1 border-ink-2 px-6 py-[22px] ${i < 3 ? 'md:border-e' : ''} ${i % 2 === 0 ? 'border-e' : ''} ${i < 2 ? 'border-b md:border-b-0' : ''}`}
                            >
                                <b
                                    data-count=""
                                    className="font-display text-[34px] font-extrabold text-orange tabular-nums"
                                >
                                    {n}
                                </b>
                                <span className="font-mono text-xs tracking-[.1em] text-grey-400 uppercase rtl:font-arabic">
                                    {label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Straps />
            <AboutIntro />
            <ServiceFan
                eyebrow={h.whatEyebrow}
                title={h.whatTitle}
                lead={h.whatLead}
                plates={h.plates}
            />

            <Section tone="paper">
                <SectionHead
                    eyebrow={h.workEyebrow}
                    title={h.workTitle}
                    action={
                        <Button to="/projects" variant="outline" arrow>
                            {h.allProjects}
                        </Button>
                    }
                />
                <div className="grid gap-6 md:grid-cols-3">
                    {PROJECTS.slice(0, 3).map((p) => (
                        <ProjectCard key={p.img} p={p} />
                    ))}
                </div>
            </Section>

            <Section tone="dark">
                <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
                    <Reveal className="grid gap-5">
                        <Eyebrow>{h.safetyEyebrow}</Eyebrow>
                        <h2
                            data-split=""
                            className="text-h2 font-extrabold uppercase"
                        >
                            {h.safetyTitle}
                        </h2>
                        <p className="lead text-grey-400">{h.safetyLead}</p>
                        <div className="mt-2 flex flex-wrap gap-2.5">
                            {h.materials.map((m: any) => (
                                <span
                                    key={m}
                                    className="rounded-full border border-grey-600 px-4 py-2 font-mono text-[13px] rtl:font-arabic"
                                >
                                    {m}
                                </span>
                            ))}
                        </div>
                        <div className="mt-3 flex flex-wrap gap-3.5">
                            <Button to="/safety-signs" arrow>
                                {h.browse}
                            </Button>
                            <Button to="/quote" variant="outlineDark">
                                {h.survey}
                            </Button>
                        </div>
                    </Reveal>
                    <Reveal>
                        <ImgFrame
                            src={img('industrial-site')}
                            badge="ISO 7010 · W001"
                        />
                    </Reveal>
                </div>
                <div className="mt-[72px] grid grid-cols-2 gap-4 md:grid-cols-4">
                    {h.sectors.map(([title, text]: any, i: any) => (
                        <Reveal
                            key={title}
                            data-tilt=""
                            className="grid gap-3 rounded-[28px] border border-ink-2 bg-ink p-6 transition-colors duration-500 hover:border-orange"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="h-9 w-9 text-yellow"
                            >
                                {SECTOR_ICONS[i]}
                            </svg>
                            <h4 className="text-[17px] font-extrabold uppercase">
                                {title}
                            </h4>
                            <p className="text-sm text-grey-400">{text}</p>
                        </Reveal>
                    ))}
                </div>
            </Section>

            <Section>
                <SectionHead
                    eyebrow={h.clientsEyebrow}
                    title={h.clientsTitle}
                />
                <div className="grid gap-10">
                    {CLIENT_GROUPS.slice(0, 3).map((g) => (
                        <Reveal key={g.en}>
                            <h4 className="mb-4 border-b border-line pb-2.5 font-mono text-[13px] font-medium tracking-[.12em] text-dim uppercase rtl:font-arabic">
                                {pick(g)}
                            </h4>
                            <div className="grid grid-cols-[repeat(auto-fill,minmax(170px,1fr))] gap-3">
                                {g.names.map((n) => (
                                    <div
                                        key={n}
                                        className="grid h-[84px] place-items-center rounded-[16px] border border-line p-2 text-center font-display text-base font-extrabold text-grey-400 transition hover:border-orange hover:text-fg"
                                    >
                                        {n}
                                    </div>
                                ))}
                            </div>
                        </Reveal>
                    ))}
                </div>
                <div className="mt-10">
                    <ArrowLink to="/clients">{h.allClients}</ArrowLink>
                </div>
            </Section>

            <Section tone="paper">
                <SectionHead eyebrow={h.whyEyebrow} title={h.whyTitle} />
                <Reveal className="grid gap-6 border-t-2 border-fg sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
                    {h.why.map(([n, title, text]: any) => (
                        <div
                            key={n}
                            className="grid content-start gap-2.5 pe-6 pt-8"
                        >
                            <b className="font-mono text-[13px] font-medium text-orange rtl:font-arabic">
                                {n}
                            </b>
                            <h3 className="text-[22px] font-extrabold">
                                {title}
                            </h3>
                            <p className="text-[15px] text-dim">{text}</p>
                        </div>
                    ))}
                </Reveal>
            </Section>

            <Section>
                <SectionHead
                    eyebrow={h.blogEyebrow}
                    title={h.blogTitle}
                    action={
                        <Button to="/blog" variant="outline" arrow>
                            {h.allPosts}
                        </Button>
                    }
                />
                <div className="grid gap-6 md:grid-cols-3">
                    {POSTS.slice(0, 3).map((p) => (
                        <PostCard key={p.id} post={p} compact />
                    ))}
                </div>
            </Section>

            <CtaBand title={h.ctaTitle} btn={h.ctaBtn} />
        </>
    );
}
