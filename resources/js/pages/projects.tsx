import { useState } from 'react';
import { PROJECTS } from '@/Data/copy';
import { ProjectCard } from '@/components/site/Cards';
import {
    Chips,
    CtaBand,
    Hl,
    PageHero,
    Section,
    usePageTitle,
} from '@/components/site/ui';
import { useLang } from '@/lib/site/i18n';

export default function Projects() {
    const { t } = useLang();
    const [filter, setFilter] = useState('all');
    const p = t.projectsPage;
    usePageTitle(p.crumb);
    const list = PROJECTS.filter(
        (x) => filter === 'all' || x.cat.split(' ').includes(filter),
    );
    return (
        <>
            <PageHero
                crumbs={[[t.nav.home, '/'], [p.crumb]]}
                title={
                    <>
                        {p.h1a}
                        <Hl>{p.h1b}</Hl>
                    </>
                }
                lead={p.lead}
            />
            <Section>
                <Chips
                    label={p.crumb}
                    value={filter}
                    onChange={setFilter}
                    options={[
                        ['all', t.common.all],
                        ['digital', t.common.line.digital],
                        ['print', t.common.line.print],
                        ['signs', t.common.line.signs],
                    ]}
                />
                <div className="grid gap-6 md:grid-cols-3">
                    {list.map((x) => (
                        <ProjectCard key={x.img} p={x} />
                    ))}
                </div>
            </Section>
            <CtaBand title={p.ctaTitle} btn={p.ctaBtn} />
        </>
    );
}
