import { useEffect, useState } from 'react';
import { MATERIALS, SECTORS, SIGN_TYPES, SIGNS } from '@/Data/content';
import { ProductCard, SignArt, sizesFor } from '@/components/site/Cards';
import {
    CtaBand,
    Crumbs,
    NotFound,
    Section,
    SectionHead,
    Tag,
    usePageTitle,
} from '@/components/site/ui';
import { useLang } from '@/lib/site/i18n';
import { useQuote } from '@/lib/site/quote';

/** Props come from routes/site.php: /safety-signs/{code} */
export default function SignDetail({ code = '' }: { code?: string }) {
    const { t, L: pick } = useLang();
    const { add, toast } = useQuote();
    const d = t.signDetail;
    const s = SIGNS.find((x) => x.code === code.toUpperCase());
    const [size, setSize] = useState('300×300 mm');
    const [mat, setMat] = useState(s?.mats[0]);
    const [qty, setQty] = useState(1);
    useEffect(() => {
        setSize('300×300 mm');
        setMat(s?.mats[0]);
        setQty(1);
    }, [code]); // reset when moving to another sign
    usePageTitle(s ? `${s.code} ${pick(s.name)}` : null);
    if (!s) return <NotFound back="/safety-signs" />;

    const ty = SIGN_TYPES[s.type];
    const related = SIGNS.filter((x) => x.type === s.type && x.code !== s.code)
        .concat(SIGNS.filter((x) => x.type !== s.type))
        .slice(0, 4);
    const clampQty = (v: any) =>
        Math.max(1, Math.min(9999, Math.round(+v) || 1));
    const submit = (e: any) => {
        e.preventDefault();
        const q = clampQty(qty);
        setQty(q);
        add({ kind: 'sign', id: s.code, size, material: mat, qty: q });
        toast(`${t.common.added}: ${s.code} × ${q}`);
    };
    const rows = [
        [d.std, `ISO 7010 · ${s.code}`],
        [d.type, pick(ty)],
        [d.shape, pick(ty.shape)],
        [
            d.mats,
            s.mats
                .map(
                    (m) => `${pick(MATERIALS[m])} — ${pick(MATERIALS[m].note)}`,
                )
                .join('\n'),
        ],
        [d.sizes, sizesFor(s).join(' · ')],
        [d.sectors, s.sec.map((x) => pick(SECTORS[x])).join(' · ')],
        [d.fixing, d.fixingVal],
    ];
    const label = 'field-label';

    return (
        <>
            <section className="bg-black text-white">
                <div className="container-site pt-[112px] pb-24 md:pb-28">
                    <Crumbs
                        items={[
                            [t.nav.home, '/'],
                            [t.nav.signs, '/safety-signs'],
                            [s.code],
                        ]}
                    />
                </div>
            </section>
            <Section>
                <div className="grid items-start gap-8 md:grid-cols-2 md:gap-16">
                    <div className="relative grid aspect-square w-full max-w-[420px] place-items-center justify-self-center rounded-[10px] border border-line bg-surface2 md:sticky md:top-[100px] md:max-w-none">
                        <SignArt
                            sign={s}
                            className="block h-[62%] w-[62%] [&>svg]:h-full [&>svg]:w-full"
                        />
                        <span className="absolute start-4 bottom-4 bg-black px-3 py-2 font-mono text-[13px] text-yellow">
                            ISO 7010 · {s.code}
                        </span>
                    </div>
                    <div className="grid min-w-0 gap-[22px]">
                        <Tag line={s.type === 'warning' ? 'signs' : 'none'}>
                            {pick(ty)}
                        </Tag>
                        <h1
                            data-split=""
                            className="text-h1-sm font-black uppercase"
                        >
                            {pick(s.name)}
                        </h1>
                        <p className="lead">{pick(s.use)}</p>

                        <form
                            onSubmit={submit}
                            className="grid items-end gap-4 rounded-[10px] border-2 border-fg p-6 sm:grid-cols-2"
                        >
                            <div className="grid gap-2">
                                <label htmlFor="c-size" className={label}>
                                    {d.size}
                                </label>
                                <select
                                    id="c-size"
                                    className="field-input"
                                    value={size}
                                    onChange={(e) => setSize(e.target.value)}
                                >
                                    {sizesFor(s).map((z) => (
                                        <option key={z}>{z}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="grid gap-2">
                                <label htmlFor="c-mat" className={label}>
                                    {d.material}
                                </label>
                                <select
                                    id="c-mat"
                                    className="field-input"
                                    value={mat}
                                    onChange={(e) => setMat(e.target.value)}
                                >
                                    {s.mats.map((m) => (
                                        <option key={m} value={m}>
                                            {pick(MATERIALS[m])}
                                        </option>
                                    ))}
                                </select>
                                <small className="min-h-[1.2em] text-[13px] text-dim">
                                    {pick(MATERIALS[mat as string]?.note)}
                                </small>
                            </div>
                            <div className="grid gap-2">
                                <label htmlFor="c-qty" className={label}>
                                    {d.qty}
                                </label>
                                <div className="flex overflow-hidden rounded-[10px] border-2 border-line">
                                    <button
                                        type="button"
                                        aria-label="-"
                                        className="w-11 bg-surface2 text-lg font-bold"
                                        onClick={() =>
                                            setQty((q) => clampQty(q - 1))
                                        }
                                    >
                                        −
                                    </button>
                                    <input
                                        id="c-qty"
                                        type="number"
                                        min="1"
                                        max="9999"
                                        inputMode="numeric"
                                        value={qty}
                                        onChange={(e) =>
                                            setQty(e.target.value as any)
                                        }
                                        onBlur={() => setQty(clampQty(qty))}
                                        className="min-w-0 flex-1 [appearance:textfield] p-3 text-center focus:outline-none [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                    <button
                                        type="button"
                                        aria-label="+"
                                        className="w-11 bg-surface2 text-lg font-bold"
                                        onClick={() =>
                                            setQty((q) => clampQty(q + 1))
                                        }
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="min-h-12 rounded-[10px] bg-orange px-6 font-display text-[15px] font-bold tracking-[.04em] text-black uppercase hover:bg-yellow rtl:font-arabic"
                            >
                                {t.common.add}
                            </button>
                        </form>
                        <p className="text-sm text-dim">{d.custom}</p>

                        <table className="w-full border-collapse text-[15px]">
                            <caption className="pb-2.5 text-start font-mono text-xs tracking-[.12em] text-dim uppercase rtl:font-arabic">
                                {d.details}
                            </caption>
                            <tbody>
                                {rows.map(([k, v]) => (
                                    <tr key={k}>
                                        <th className="w-[34%] border-t border-line py-3 pe-4 text-start align-top font-mono text-[13px] font-medium text-dim rtl:font-arabic">
                                            {k}
                                        </th>
                                        <td className="border-t border-line py-3 align-top whitespace-pre-line">
                                            {v}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Section>
            <Section tone="paper">
                <SectionHead eyebrow={d.related} />
                <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-5">
                    {related.map((r) => (
                        <ProductCard key={r.code} sign={r} withAdd={false} />
                    ))}
                </div>
            </Section>
            <CtaBand title={d.ctaTitle} btn={d.ctaBtn} />
        </>
    );
}
