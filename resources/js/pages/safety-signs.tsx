import { useState } from 'react';
import { MATERIALS, SECTORS, SIGN_TYPES, SIGNS } from '@/Data/content';
import { ProductCard } from '@/components/site/Cards';
import {
    Button,
    Eyebrow,
    Hl,
    ImgFrame,
    PageHero,
    Reveal,
    Section,
    img,
    usePageTitle,
} from '@/components/site/ui';
import { useLang } from '@/lib/site/i18n';

export default function SafetySigns() {
    const { t, L: pick } = useLang();
    const s = t.signsPage;
    usePageTitle(s.crumb);
    const [f, setF] = useState<Record<'type' | 'mat' | 'sec', string[]>>({
        type: [],
        mat: [],
        sec: [],
    });
    const toggle = (group: 'type' | 'mat' | 'sec', v: string) =>
        setF((prev) => ({
            ...prev,
            [group]: prev[group].includes(v)
                ? prev[group].filter((x: any) => x !== v)
                : [...prev[group], v],
        }));
    const list = SIGNS.filter(
        (x) =>
            (!f.type.length || f.type.includes(x.type)) &&
            (!f.mat.length || f.mat.some((m) => x.mats.includes(m))) &&
            (!f.sec.length || f.sec.some((k) => x.sec.includes(k))),
    );

    const groups: Array<
        ['type' | 'mat' | 'sec', string, Array<[string, any]>]
    > = [
        ['type', s.type, Object.entries(SIGN_TYPES)],
        ['mat', s.material, Object.entries(MATERIALS)],
        ['sec', s.sector, Object.entries(SECTORS)],
    ];

    return (
        <>
            <PageHero
                crumbs={[[t.nav.home, '/'], [s.crumb]]}
                title={
                    <>
                        {s.h1a}
                        <Hl>{s.h1b}</Hl>
                    </>
                }
                lead={s.lead}
            />
            <Section>
                <div className="grid items-start gap-10 lg:grid-cols-[260px_1fr]">
                    <aside
                        aria-label={s.crumb}
                        className="grid gap-7 rounded-[10px] border-2 border-fg p-6 lg:sticky lg:top-24"
                    >
                        {groups.map(([key, legend, opts]) => (
                            <fieldset key={key} className="grid gap-2.5">
                                <legend className="mb-2.5 font-mono text-xs tracking-[.12em] text-dim uppercase rtl:font-arabic">
                                    {legend}
                                </legend>
                                {opts.map(([v, label]: any) => (
                                    <label
                                        key={v}
                                        className="flex min-h-7 cursor-pointer items-center gap-2.5 text-[15px]"
                                    >
                                        <input
                                            type="checkbox"
                                            className="h-[18px] w-[18px] accent-orange"
                                            checked={f[key].includes(v)}
                                            onChange={() => toggle(key, v)}
                                        />
                                        {pick(label)}
                                    </label>
                                ))}
                            </fieldset>
                        ))}
                    </aside>
                    <div>
                        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                            <h2 className="text-[28px] font-extrabold uppercase">
                                {s.allSigns}
                            </h2>
                            <span
                                aria-live="polite"
                                className="font-mono text-[13px] text-dim rtl:font-arabic"
                            >
                                {s.count(list.length, SIGNS.length)}
                            </span>
                        </div>
                        <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-5">
                            {list.map((x) => (
                                <ProductCard key={x.code} sign={x} />
                            ))}
                        </div>
                    </div>
                </div>
            </Section>

            <Section tone="dark">
                <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
                    <Reveal className="grid gap-5">
                        <Eyebrow>{s.customEyebrow}</Eyebrow>
                        <h2
                            data-split=""
                            className="text-h2 font-extrabold uppercase"
                        >
                            {s.customTitle}
                        </h2>
                        <p className="lead text-grey-400">{s.customLead}</p>
                        <Button
                            to="/quote"
                            arrow
                            className="justify-self-start"
                        >
                            {s.customBtn}
                        </Button>
                    </Reveal>
                    <Reveal>
                        <ImgFrame src={img('sign-factory')} badge={s.madeIn} />
                    </Reveal>
                </div>
            </Section>
        </>
    );
}
