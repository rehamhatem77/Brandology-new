import {
    useEffect,
    useState,
    type ComponentProps,
    type CSSProperties,
    type ElementType,
    type ReactNode,
} from 'react';
import { Link, usePage } from '@inertiajs/react';
import { PHOTO, px } from '@/Data/images';
import { useLang } from '@/lib/site/i18n';
import { useTransition } from '@/lib/site/transition';

/** Placeholder photo for a content seed. Seeds map to fitting stock photos; unknown seeds fall back to a random one. */
const SEED_PHOTO: Record<string, number> = {
    'p-retail': PHOTO.shelves,
    'p-offshore': PHOTO.platformRig,
    'p-oilfield': PHOTO.platformSunset,
    'p-solar': PHOTO.solarRows,
    'p-dairy': PHOTO.boxLabel,
    'p-identity': PHOTO.pantoneFan,
    'p-catalog': PHOTO.oldPress,
    'p-pos': PHOTO.aisles,
    'p-realestate': PHOTO.cairoSkyline,
    'svc-brochure': PHOTO.pressClose,
    'svc-identity': PHOTO.swatchHands,
    'svc-photo': PHOTO.studioDesk,
    'svc-pos': PHOTO.shelvesColour,
    'svc-safety': PHOTO.exitHall,
    'svc-social': PHOTO.laptopDesign,
    'svc-web': PHOTO.designerIMac,
    b1: PHOTO.exitHall,
    b2: PHOTO.swatchMeeting,
    b3: PHOTO.pressMan,
    b4: PHOTO.platformsAerial,
    b5: PHOTO.tablet,
    b6: PHOTO.boxKraft,
    'brandology-studio': PHOTO.teamTable,
    'industrial-site': PHOTO.platformSunset,
    'sign-factory': PHOTO.workshop,
    'cs-hero': PHOTO.platformRig,
    'cs-g1': PHOTO.platformsAerial,
    'cs-g2': PHOTO.exitDark,
    'cs-g3': PHOTO.evacuation,
};
export const img = (seed: string, w = 900, h = 680) =>
    SEED_PHOTO[seed]
        ? px(SEED_PHOTO[seed], w, h)
        : `https://picsum.photos/seed/${seed}/${w}/${h}`;
export const cx = (...c: Array<string | false | null | undefined>) =>
    c.filter(Boolean).join(' ');

/* ---------- Icons ---------- */
export const Icon = {
    Arrow: ({ className = 'h-[18px] w-[18px]' }: { className?: string }) => (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className={cx(className, 'shrink-0 rtl:-scale-x-100')}
        >
            <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
    ),
    Menu: () => (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.6"
            strokeLinecap="round"
            width="26"
            height="26"
            aria-hidden="true"
        >
            <path d="M4 8h16M4 16h10" />
        </svg>
    ),
    Close: () => (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.6"
            strokeLinecap="round"
            width="26"
            height="26"
            aria-hidden="true"
        >
            <path d="M5 5l14 14M19 5 5 19" />
        </svg>
    ),
    List: () => (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            className="h-5 w-5 text-orange"
            aria-hidden="true"
        >
            <path d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01" />
        </svg>
    ),
    Facebook: () => (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-[18px] w-[18px]"
            aria-hidden="true"
        >
            <path d="M14 8h3V4h-3c-2.8 0-4 1.7-4 4.3V10H7v4h3v8h4v-8h3l1-4h-4V8.6c0-.4.3-.6.6-.6Z" />
        </svg>
    ),
    Instagram: () => (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-[18px] w-[18px]"
            aria-hidden="true"
        >
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
        </svg>
    ),
    LinkedIn: () => (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-[18px] w-[18px]"
            aria-hidden="true"
        >
            <path d="M4 9h4v12H4zM6 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm4 6h4v1.7c.6-1 1.9-2 3.9-2 4 0 4.1 2.7 4.1 6V21h-4v-5.6c0-1.4 0-3.1-1.9-3.1s-2.1 1.5-2.1 3V21h-4z" />
        </svg>
    ),
};

/* ---------- Links ---------- */
/** Localised, transition-aware link: <L to="/services"> becomes /ar/services on Arabic pages and plays the strip wipe. */
export function L({
    to,
    onClick,
    ...props
}: Omit<ComponentProps<typeof Link>, 'href'> & {
    to: string;
    'data-cursor'?: string;
}) {
    const { to: loc } = useLang();
    const tr = useTransition(),
        { url } = usePage();
    const pathname = url.split(/[?#]/)[0];
    const href = loc(to);
    const click: ComponentProps<typeof Link>['onClick'] = (e) => {
        onClick?.(e);
        if (
            e.defaultPrevented ||
            !tr ||
            e.button !== 0 ||
            e.metaKey ||
            e.ctrlKey ||
            e.shiftKey ||
            e.altKey ||
            props.target
        )
            return;
        if (href.split('#')[0] === pathname) return;
        e.preventDefault();
        tr.go(href);
    };
    return <Link href={href} onClick={click} {...props} />;
}

/* ---------- Photos ---------- */
interface PhotoProps {
    id: number;
    w?: number;
    h?: number;
    alt?: string;
    className?: string;
    eager?: boolean;
    style?: CSSProperties;
    reveal?: boolean;
}
/** Placeholder stock photo with a graceful fallback. `reveal` opens it from a cropped frame on scroll. */
export function Photo({
    id,
    w = 900,
    h,
    alt = '',
    className,
    eager,
    style,
    reveal,
}: PhotoProps) {
    const [bad, setBad] = useState(false);
    return (
        <div
            style={style}
            data-img={reveal ? '' : undefined}
            className={cx('relative overflow-hidden bg-black/10', className)}
        >
            {!bad && (
                <img
                    src={px(id, w, h)}
                    alt={alt}
                    loading={eager ? 'eager' : 'lazy'}
                    decoding="async"
                    onError={() => setBad(true)}
                    className="h-full w-full object-cover"
                />
            )}
        </div>
    );
}
export function Polaroid({
    photo,
    caption,
    rot = 0,
    className,
}: {
    photo: number;
    caption?: string;
    rot?: number;
    className?: string;
}) {
    return (
        <figure
            style={{ rotate: `${rot}deg` }}
            className={cx(
                'w-full rounded-[10px] bg-white p-2.5 pb-3 text-black shadow-[0_14px_34px_rgba(22,23,28,.28)]',
                className,
            )}
        >
            <Photo
                id={photo}
                w={560}
                h={600}
                className="aspect-[14/15] rounded-[6px]"
            />
            {caption && (
                <figcaption className="hand pt-2.5 text-center text-[22px]">
                    {caption}
                </figcaption>
            )}
        </figure>
    );
}

/* ---------- Buttons: pills with a liquid fill that rises on hover ---------- */
const btnBase =
    'group relative isolate inline-flex min-h-[52px] items-center justify-center gap-2.5 overflow-hidden rounded-full border-2 px-7 font-display text-[14px] font-bold uppercase leading-none tracking-[.05em] no-underline transition-colors duration-500 before:absolute before:inset-x-[-10%] before:top-full before:-z-10 before:h-[170%] before:rounded-[50%] before:transition-transform before:duration-500 before:ease-out hover:before:-translate-y-[66%] focus-visible:before:-translate-y-[66%] rtl:font-arabic rtl:text-[16px] rtl:normal-case';
export const btnStyles = {
    primary:
        'border-black bg-orange text-black before:bg-black hover:text-orange',
    yellow: 'border-black bg-yellow text-black before:bg-black hover:text-yellow',
    black: 'border-black bg-black text-white before:bg-orange hover:border-orange hover:text-black',
    outline: 'border-fg bg-transparent text-fg before:bg-fg hover:text-surface',
    outlineDark:
        'border-white/60 bg-transparent text-white before:bg-white hover:border-white hover:text-black',
};
type BtnProps = {
    to?: string;
    href?: string;
    variant?: keyof typeof btnStyles;
    arrow?: boolean;
    className?: string;
    children?: ReactNode;
} & Record<string, any>;
export function Button({
    to,
    href,
    variant = 'primary',
    arrow,
    className,
    children,
    ...props
}: BtnProps) {
    const cls = cx(btnBase, btnStyles[variant], className);
    const inner = (
        <>
            {children}
            {arrow && (
                <Icon.Arrow className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
            )}
        </>
    );
    if (to)
        return (
            <L to={to} data-magnetic="" className={cls} {...props}>
                {inner}
            </L>
        );
    if (href)
        return (
            <a href={href} data-magnetic="" className={cls} {...props}>
                {inner}
            </a>
        );
    return (
        <button type="button" data-magnetic="" className={cls} {...props}>
            {inner}
        </button>
    );
}
export function ArrowLink({
    to,
    children,
}: {
    to: string;
    children: ReactNode;
}) {
    return (
        <L
            to={to}
            className="group inline-flex items-center gap-2 border-b-[3px] border-orange pb-0.5 font-display text-sm font-bold tracking-[.05em] text-fg uppercase no-underline transition-all hover:gap-3 hover:bg-orange rtl:font-arabic rtl:normal-case"
        >
            {children}
            <Icon.Arrow className="h-4 w-4" />
        </L>
    );
}

/* ---------- Labels ---------- */
const tagColors: Record<string, string> = {
    digital: 'bg-blue text-white',
    print: 'bg-green text-white',
    signs: 'bg-yellow text-black',
    none: 'bg-fg/10 text-fg',
};
export function Tag({
    line = 'none',
    children,
    className,
}: {
    line?: string;
    children: ReactNode;
    className?: string;
}) {
    return (
        <span
            className={cx(
                'inline-flex w-fit items-center gap-1.5 rounded-full px-3.5 py-1 font-mono text-xs uppercase tracking-[.08em] rtl:font-arabic rtl:normal-case',
                tagColors[line] || tagColors.none,
                className,
            )}
        >
            {children}
        </span>
    );
}
export const Eyebrow = ({ children }: { children: ReactNode }) => (
    <span className="eyebrow">{children}</span>
);
export const Hl = ({ children }: { children: ReactNode }) => (
    <span className="text-orange">{children}</span>
);
export const Stripe = () => <div className="stripe" aria-hidden="true" />;

/* ---------- Layout ---------- */
const tones = {
    white: 'bg-surface text-fg',
    paper: 'bg-surface2 text-fg',
    dark: 'bg-black text-white on-dark',
    orange: 'bg-orange',
};
/** A sheet that lifts over the one before it: rounded-[10px] top edge, overlapping margin. */
export function Section({
    tone = 'white',
    className,
    children,
    id,
}: {
    tone?: keyof typeof tones;
    className?: string;
    children: ReactNode;
    id?: string;
}) {
    return (
        <section
            id={id}
            className={cx(
                'relative -mt-10 rounded-t-[40px] pb-16 pt-20 md:-mt-14 md:rounded-t-[72px] md:pb-28 md:pt-36',
                tones[tone],
                className,
            )}
        >
            <div className="container-site">{children}</div>
        </section>
    );
}
export function SectionHead({
    eyebrow,
    title,
    lead,
    action,
    dark,
}: {
    eyebrow?: string;
    title?: ReactNode;
    lead?: string;
    action?: ReactNode;
    dark?: boolean;
}) {
    return (
        <div
            className={cx(
                'mb-12 grid gap-5 md:mb-16',
                action ? 'items-end md:grid-cols-[1fr_auto]' : 'max-w-3xl',
            )}
        >
            <div className="grid gap-4">
                {eyebrow && (
                    <div data-up="">
                        <Eyebrow>{eyebrow}</Eyebrow>
                    </div>
                )}
                {title && (
                    <div className="-mb-[.12em] overflow-hidden pb-[.12em]">
                        <h2
                            data-rise=""
                            className="text-h2 font-extrabold uppercase"
                        >
                            {title}
                        </h2>
                    </div>
                )}
                {lead && (
                    <p
                        data-up=""
                        className={cx('lead', dark && 'text-grey-400')}
                    >
                        {lead}
                    </p>
                )}
            </div>
            {action && <div data-up="">{action}</div>}
        </div>
    );
}
export function Crumbs({ items }: { items: Array<[string, string?]> }) {
    return (
        <p className="font-mono text-[13px] text-grey-400 rtl:font-arabic">
            {items.map(([label, to], i) => (
                <span key={i}>
                    {i > 0 && ' / '}
                    {to ? (
                        <L to={to} className="no-underline hover:text-orange">
                            {label}
                        </L>
                    ) : (
                        label
                    )}
                </span>
            ))}
        </p>
    );
}

/** Inner-page banner: black, soft halftone + orange orb, title rises in. The next section lifts over its bottom. */
export function PageHero({
    crumbs,
    title,
    lead,
    children,
    small,
}: {
    crumbs?: Array<[string, string?]>;
    title: ReactNode;
    lead?: string;
    children?: { before?: ReactNode; after?: ReactNode };
    small?: boolean;
}) {
    return (
        <section className="relative overflow-hidden bg-black text-white">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -end-24 -top-24 h-72 w-72 rounded-full bg-orange/90 md:h-[26rem] md:w-[26rem]"
            />
            <div
                aria-hidden="true"
                className="dots pointer-events-none absolute start-6 bottom-10 hidden h-40 w-64 text-yellow opacity-30 md:block"
            />
            <div className="container-site relative grid gap-5 pt-[128px] pb-28 md:pt-[168px] md:pb-36">
                {crumbs && (
                    <div data-hero-item="">
                        <Crumbs items={crumbs} />
                    </div>
                )}
                {children?.before && (
                    <div data-hero-item="">{children.before}</div>
                )}
                <h1
                    data-hero-title=""
                    className={cx(
                        'max-w-[18ch] font-black uppercase',
                        small ? 'text-h1-sm' : 'text-h1',
                    )}
                >
                    {title}
                </h1>
                {lead && (
                    <p data-hero-item="" className="lead text-grey-400">
                        {lead}
                    </p>
                )}
                {children?.after && (
                    <div data-hero-item="">{children.after}</div>
                )}
            </div>
        </section>
    );
}
export function CtaBand({
    title,
    btn,
    to = '/quote',
}: {
    title: string;
    btn: string;
    to?: string;
}) {
    return (
        <section className="relative -mt-10 overflow-hidden rounded-t-[40px] bg-orange text-black md:-mt-14 md:rounded-t-[72px]">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -start-16 -bottom-24 h-72 w-72 rounded-full bg-yellow"
            />
            <div
                aria-hidden="true"
                className="dots pointer-events-none absolute end-6 top-10 h-40 w-56 text-black opacity-25"
            />
            <div className="container-site relative flex flex-wrap items-end justify-between gap-8 pt-28 pb-24 md:pt-40 md:pb-32">
                <div className="-mb-[.12em] overflow-hidden pb-[.12em]">
                    <h2
                        data-rise=""
                        className="max-w-[16ch] text-h2 font-extrabold uppercase"
                    >
                        {title}
                    </h2>
                </div>
                <Button to={to} variant="black" arrow>
                    {btn}
                </Button>
            </div>
        </section>
    );
}
export function ImgFrame({
    src,
    alt = '',
    badge,
    ratio = 'aspect-[4/3]',
    className,
}: {
    src: string;
    alt?: string;
    badge?: string;
    ratio?: string;
    className?: string;
}) {
    return (
        <div
            data-parallax=""
            className={cx(
                'group relative overflow-hidden rounded-[48px_14px_48px_14px] transition-[border-radius] duration-700 hover:rounded-[14px_48px_14px_48px]',
                className,
            )}
        >
            <img
                src={src}
                alt={alt}
                loading="lazy"
                className={cx('w-full object-cover', ratio)}
            />
            {badge && (
                <span className="absolute start-4 bottom-4 rounded-full bg-yellow px-4 py-1.5 font-mono text-[13px] font-bold text-black rtl:font-arabic">
                    {badge}
                </span>
            )}
        </div>
    );
}
export function Checks({ items, one }: { items: string[]; one?: boolean }) {
    return (
        <ul
            className={cx(
                'grid gap-2.5',
                one ? 'text-[17px]' : 'text-[15px] sm:grid-cols-2',
            )}
        >
            {items.map((f) => (
                <li key={f} className="flex gap-2.5">
                    <span className="mt-[7px] h-2.5 w-2.5 shrink-0 rounded-full bg-orange" />
                    {f}
                </li>
            ))}
        </ul>
    );
}

/** Marks an element for the batched fade-up in lib/motion. */
export function Reveal({
    as: T = 'div',
    children,
    ...props
}: { as?: ElementType; children?: ReactNode } & Record<string, any>) {
    return (
        <T data-reveal="" {...props}>
            {children}
        </T>
    );
}

export function Chips({
    options,
    value,
    onChange,
    label,
}: {
    options: Array<[string, string]>;
    value: string;
    onChange: (v: string) => void;
    label: string;
}) {
    return (
        <div
            role="group"
            aria-label={label}
            className="mb-10 flex flex-wrap gap-2.5"
        >
            {options.map(([v, text]) => (
                <button
                    key={v}
                    type="button"
                    aria-pressed={value === v}
                    onClick={() => onChange(v)}
                    className="min-h-11 rounded-full border-2 border-fg bg-surface px-5 font-display text-[13px] font-bold tracking-[.05em] uppercase transition-all duration-300 hover:-translate-y-0.5 hover:bg-yellow aria-pressed:bg-fg aria-pressed:text-surface rtl:font-arabic rtl:normal-case"
                >
                    {text}
                </button>
            ))}
        </div>
    );
}

export function NotFound({ back }: { back: string }) {
    const { t } = useLang();
    return (
        <Section>
            <div className="grid justify-items-start gap-5">
                <h2 className="text-3xl font-extrabold">{t.common.notFound}</h2>
                <Button to={back}>{t.common.back}</Button>
            </div>
        </Section>
    );
}

export function usePageTitle(title: string | null) {
    useEffect(() => {
        document.title = title ? `${title} | Brandology` : 'Brandology';
    }, [title]);
}
