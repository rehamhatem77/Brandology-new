import { useState } from 'react';
import { POST_CATS, POSTS } from '@/Data/content';
import { PostCard } from '@/components/site/Cards';
import {
    Chips,
    Hl,
    PageHero,
    Section,
    usePageTitle,
} from '@/components/site/ui';
import { useLang } from '@/lib/site/i18n';

export default function Blog() {
    const { t, L: pick } = useLang();
    const b = t.blogPage;
    const [filter, setFilter] = useState('all');
    usePageTitle(b.crumb);
    return (
        <>
            <PageHero
                crumbs={[[t.nav.home, '/'], [b.crumb]]}
                title={
                    <>
                        {b.h1a}
                        <Hl>{b.h1b}</Hl>
                    </>
                }
                lead={b.lead}
            />
            <Section>
                <Chips
                    label={b.crumb}
                    value={filter}
                    onChange={setFilter}
                    options={[
                        ['all', t.common.all],
                        ...Object.entries(POST_CATS).map(
                            ([k, v]): [string, string] => [k, pick<string>(v)],
                        ),
                    ]}
                />
                <div className="grid gap-6 md:grid-cols-3">
                    {POSTS.filter(
                        (p) => filter === 'all' || p.cat === filter,
                    ).map((p) => (
                        <PostCard key={p.id} post={p} />
                    ))}
                </div>
            </Section>
        </>
    );
}
