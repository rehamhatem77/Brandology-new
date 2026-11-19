import { signArt, MATERIALS, POST_CATS, SIZES } from '@/Data/content';
import { useLang } from '@/lib/site/i18n';
import { useQuote } from '@/lib/site/quote';
import { tilt, untilt } from '@/lib/site/reveals';
import { ArrowLink, L, Reveal, Tag, img } from '@/components/site/ui';

export const sizesFor = (s: any) =>
    s.type === 'warning' ? SIZES : SIZES.slice(0, 3);

/** ISO sign artwork (trusted SVG from content.ts) */
export function SignArt({
    sign,
    className,
}: {
    sign: any;
    className?: string;
}) {
    return (
        <span
            className={className}
            role="img"
            aria-label={sign.code}
            dangerouslySetInnerHTML={{ __html: signArt(sign) }}
        />
    );
}

/** Sign-plate shapes for the three service lines */
export function PlateShape({ line }: { line: string }) {
    if (line === 'digital')
        return (
            <div className="grid h-[72px] w-[72px] place-items-center rounded-full bg-blue text-white">
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    className="h-[34px] w-[34px]"
                >
                    <rect x="3" y="4" width="18" height="12" rx="1" />
                    <path d="M8 20h8M12 16v4" />
                </svg>
            </div>
        );
    if (line === 'print')
        return (
            <div className="grid h-[72px] w-[72px] place-items-center rounded-[16px] bg-green text-white">
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    className="h-[34px] w-[34px]"
                >
                    <path d="M6 9V3h12v6M6 18H4v-7h16v7h-2" />
                    <rect x="6" y="14" width="12" height="7" />
                </svg>
            </div>
        );
    return (
        <svg viewBox="0 0 100 90" className="h-[72px] w-[72px]">
            <path
                d="M50 4 96 86H4Z"
                fill="#fdca0f"
                stroke="#16171c"
                strokeWidth="7"
                strokeLinejoin="round"
            />
            <rect x="45.5" y="30" width="9" height="30" rx="3" fill="#16171c" />
            <circle cx="50" cy="71" r="5.5" fill="#16171c" />
        </svg>
    );
}

/** Cards share one shape that flips its rounded-[10px] corners on hover. */
export const MORPH =
    'rounded-[48px_14px_48px_14px] transition-[border-radius,transform,box-shadow,background-color,color] duration-700 ease-[cubic-bezier(.2,.8,.2,1)] hover:rounded-[14px_48px_14px_48px]';

export function PlateCard({
    line,
    title,
    items,
    link,
    cta,
}: {
    line: string;
    title: string;
    items?: string[];
    link: string;
    cta: string;
}) {
    const { t } = useLang();
    return (
        <Reveal
            as="article"
            onPointerMove={tilt}
            onPointerLeave={untilt}
            className={`grid content-start gap-[18px] border-2 border-fg bg-surface p-8 hover:shadow-[8px_8px_0_rgb(var(--fg))] rtl:hover:shadow-[-8px_8px_0_rgb(var(--fg))] ${MORPH}`}
        >
            <PlateShape line={line} />
            <Tag line={line}>{t.common.line[line]}</Tag>
            <h3 className="text-[22px] font-extrabold">{title}</h3>
            {items && (
                <ul className="grid gap-1.5 text-[15px] text-dim">
                    {items.map((i) => (
                        <li key={i}>
                            <span className="text-orange">— </span>
                            {i}
                        </li>
                    ))}
                </ul>
            )}
            <ArrowLink to={link}>{cta}</ArrowLink>
        </Reveal>
    );
}

export function ProjectCard({
    p,
    dark,
    className,
}: {
    p: any;
    dark?: boolean;
    className?: string;
}) {
    const { lang } = useLang();
    const [tag, title, text] = p[lang];
    return (
        <Reveal className={className}>
            <L
                to="/projects/case-study"
                data-cursor={lang === 'ar' ? 'عرض' : 'View'}
                className="group grid gap-3.5 no-underline"
            >
                <div className="aspect-[4/3] overflow-hidden rounded-[48px_14px_48px_14px] bg-black transition-[border-radius] duration-700 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:rounded-[14px_48px_14px_48px]">
                    <img
                        src={img(p.img, 800, 600)}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover contrast-[1.05] saturate-[.75] transition duration-700 group-hover:scale-110 group-hover:saturate-100"
                    />
                </div>
                <Tag line={p.tag}>{tag}</Tag>
                <h3 className="text-xl font-extrabold transition-colors group-hover:text-orange">
                    {title}
                </h3>
                <p
                    className={
                        dark
                            ? 'text-[15px] text-grey-400'
                            : 'text-[15px] text-dim'
                    }
                >
                    {text}
                </p>
            </L>
        </Reveal>
    );
}

export function PostCard({ post, compact }: { post: any; compact?: boolean }) {
    const { L: pick, date } = useLang();
    const cat = POST_CATS[post.cat];
    return (
        <Reveal>
            <L
                to={`/blog/${post.id}`}
                onPointerMove={tilt}
                onPointerLeave={untilt}
                className={`group grid h-full overflow-hidden border border-line bg-surface no-underline hover:shadow-[0_20px_44px_rgba(22,23,28,.14)] ${MORPH.replace('48px', '36px')}`}
            >
                <div className="aspect-[16/10] overflow-hidden">
                    <img
                        src={img(post.img, 800, 500)}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                </div>
                <div className="grid content-start gap-2.5 p-[22px]">
                    {!compact && <Tag line={cat.tag}>{pick(cat)}</Tag>}
                    <time
                        dateTime={post.date}
                        className="font-mono text-xs text-dim rtl:font-arabic"
                    >
                        {date(post.date)}
                    </time>
                    <h3 className="text-[19px] font-extrabold transition-colors group-hover:text-orange">
                        {pick(post.title)}
                    </h3>
                    {!compact && (
                        <p className="text-[15px] text-dim">
                            {pick(post.excerpt)}
                        </p>
                    )}
                </div>
            </L>
        </Reveal>
    );
}

export function ProductCard({
    sign,
    withAdd = true,
}: {
    sign: any;
    withAdd?: boolean;
}) {
    const { t, L: pick } = useLang();
    const { add, toast } = useQuote();
    const sizes = sizesFor(sign);
    return (
        <article
            onPointerMove={tilt}
            onPointerLeave={untilt}
            className="group grid overflow-hidden rounded-[32px] border border-line bg-surface transition-[box-shadow,transform] duration-500 hover:shadow-[0_20px_44px_rgba(22,23,28,.14)]"
        >
            <L
                to={`/safety-signs/${sign.code}`}
                aria-label={pick(sign.name)}
                className="grid aspect-square place-items-center border-b border-line bg-surface2"
            >
                <SignArt
                    sign={sign}
                    className="block h-[58%] w-[58%] transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3 [&>svg]:h-full [&>svg]:w-full"
                />
            </L>
            <div className="grid gap-2 p-[18px]">
                <code className="font-mono text-xs text-dim">
                    ISO 7010 · {sign.code}
                </code>
                <h3 className="text-[17px] font-extrabold">
                    <L
                        to={`/safety-signs/${sign.code}`}
                        className="no-underline hover:text-orange"
                    >
                        {pick(sign.name)}
                    </L>
                </h3>
                {withAdd && (
                    <>
                        <span className="font-mono text-xs leading-relaxed text-dim rtl:font-arabic">
                            {sign.mats
                                .map((m: string) => pick(MATERIALS[m]))
                                .join(' / ')}
                            <br />
                            {sizes[0]} – {sizes.at(-1)}
                        </span>
                        <button
                            type="button"
                            onClick={() => {
                                add({
                                    kind: 'sign',
                                    id: sign.code,
                                    size: '300×300 mm',
                                    material: sign.mats[0],
                                    qty: 1,
                                });
                                toast(`${t.common.added}: ${sign.code}`);
                            }}
                            className="mt-1.5 min-h-11 rounded-full border-2 border-fg bg-surface font-display text-[13px] font-bold tracking-[.05em] uppercase transition-colors hover:bg-fg hover:text-surface rtl:font-arabic"
                        >
                            {t.common.add}
                        </button>
                    </>
                )}
            </div>
        </article>
    );
}
