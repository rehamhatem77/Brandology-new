import { POST_CATS, POSTS } from '@/Data/content';
import { PostCard } from '@/components/site/Cards';
import {
    Button,
    CtaBand,
    Crumbs,
    NotFound,
    Section,
    SectionHead,
    Tag,
    img,
    usePageTitle,
} from '@/components/site/ui';
import { useLang } from '@/lib/site/i18n';
import { useQuote } from '@/lib/site/quote';

function Block({ block: [kind, value] }: any) {
    if (kind === 'h')
        return (
            <h2 className="mt-4 text-[clamp(24px,2.6vw,32px)] font-extrabold">
                {value}
            </h2>
        );
    if (kind === 'ul')
        return (
            <ul className="grid list-disc gap-2 ps-6 marker:text-orange">
                {value.map((i: any) => (
                    <li key={i}>{i}</li>
                ))}
            </ul>
        );
    return <p>{value}</p>;
}

/** Props come from routes/site.php: /blog/{id} */
export default function Post({ id }: { id: string }) {
    const { t, L: pick, date } = useLang();
    const { toast } = useQuote();
    const b = t.blogPage;
    const p = POSTS.find((x) => x.id === id);
    usePageTitle(p ? pick(p.title) : null);
    if (!p) return <NotFound back="/blog" />;

    const body = pick(p.body);
    const mins = Math.max(
        2,
        Math.round(body.flat(2).join(' ').split(/\s+/).length / 180),
    );
    const copy = async () => {
        try {
            await navigator.clipboard.writeText(location.href);
            toast(b.copied);
        } catch {
            toast(location.href);
        }
    };

    return (
        <>
            <section className="bg-black text-white">
                <div className="container-site grid max-w-[860px] gap-5 pt-[128px] pb-28 md:mx-auto md:pt-[160px] md:pb-36">
                    <div data-hero-item="">
                        <Crumbs
                            items={[
                                [t.nav.home, '/'],
                                [t.nav.blog, '/blog'],
                            ]}
                        />
                    </div>
                    <div data-hero-item="">
                        <Tag line={POST_CATS[p.cat].tag}>
                            {pick(POST_CATS[p.cat])}
                        </Tag>
                    </div>
                    <h1
                        data-hero-title=""
                        className="text-h1-sm font-black uppercase rtl:normal-case"
                    >
                        {pick(p.title)}
                    </h1>
                    <p
                        data-hero-item=""
                        className="font-mono text-[13px] text-grey-400 rtl:font-arabic"
                    >
                        <time dateTime={p.date}>{date(p.date)}</time> ·{' '}
                        {b.minRead(mins)}
                    </p>
                </div>
            </section>
            <Section>
                <article className="mx-auto grid max-w-[720px] gap-[22px] text-lg leading-[1.75]">
                    <img
                        src={img(p.img, 1200, 640)}
                        alt=""
                        className="mb-3 aspect-[15/8] rounded-[10px] object-cover"
                    />
                    {body.map((blk: any, i: any) => (
                        <Block key={i} block={blk} />
                    ))}
                    <Button
                        variant="outline"
                        className="mt-4 justify-self-start"
                        onClick={copy}
                    >
                        {b.copy}
                    </Button>
                </article>
            </Section>
            <Section tone="paper">
                <SectionHead eyebrow={b.more} />
                <div className="grid gap-6 md:grid-cols-3">
                    {POSTS.filter((x) => x.id !== p.id)
                        .slice(0, 3)
                        .map((x) => (
                            <PostCard key={x.id} post={x} compact />
                        ))}
                </div>
            </Section>
            <CtaBand title={b.ctaTitle} btn={b.ctaBtn} />
        </>
    );
}
