import { useState } from 'react';
import Field from '@/components/site/Field';
import {
    Button,
    Hl,
    Icon,
    PageHero,
    Section,
    usePageTitle,
} from '@/components/site/ui';
import { CONFIG } from '@/Data/config';
import { useLang } from '@/lib/site/i18n';

const emailOk = (v: any) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

export default function Contact() {
    const { t } = useLang();
    const c = t.contact;
    usePageTitle(c.crumb);
    const [form, setForm] = useState({
        name: '',
        company: '',
        email: '',
        phone: '',
        service: c.serviceOpts[0],
        msg: '',
    });
    const [errors, setErrors] = useState<any>({});
    const [sent, setSent] = useState(false);
    const set = (k: any) => (e: any) =>
        setForm((f) => ({ ...f, [k]: e.target.value }));

    const submit = (e: any) => {
        e.preventDefault();
        const errs: Record<string, string> = {};
        if (!form.name.trim()) errs.name = c.errName;
        if (!emailOk(form.email)) errs.email = c.errEmail;
        if (!form.msg.trim()) errs.msg = c.errMsg;
        setErrors(errs);
        setSent(!Object.keys(errs).length);
        if (Object.keys(errs).length)
            document.getElementById(Object.keys(errs)[0])?.focus();
    };

    const social =
        'grid h-11 w-11 place-items-center rounded-[10px] border border-ink-2 hover:border-orange hover:text-orange';
    return (
        <>
            <PageHero
                crumbs={[[t.nav.home, '/'], [c.crumb]]}
                title={
                    <>
                        {c.h1a}
                        <Hl>{c.h1b}</Hl>
                    </>
                }
                lead={c.lead}
            />
            <Section>
                <div className="grid overflow-hidden rounded-[10px] border-2 border-fg lg:grid-cols-[.9fr_1.1fr]">
                    <div className="grid content-start gap-7 bg-black p-7 text-white sm:p-12">
                        <h2 className="text-[32px] font-extrabold uppercase">
                            {c.hello}
                        </h2>
                        <dl className="grid gap-5">
                            {[
                                [c.office, t.footer.city],
                                [c.phone, CONFIG.phone, true],
                                [c.email, CONFIG.email],
                                [c.hours, c.hoursVal],
                            ].map(([k, v, ltr]) => (
                                <div key={k}>
                                    <dt className="mb-1 font-mono text-xs tracking-[.12em] text-orange uppercase rtl:font-arabic">
                                        {k}
                                    </dt>
                                    <dd
                                        className="text-[17px]"
                                        dir={ltr ? 'ltr' : undefined}
                                        style={
                                            ltr
                                                ? { textAlign: 'start' }
                                                : undefined
                                        }
                                    >
                                        {v}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                        <div className="flex gap-2.5">
                            <a
                                className={social}
                                href={CONFIG.social.facebook}
                                target="_blank"
                                rel="noopener"
                                aria-label="Facebook"
                            >
                                <Icon.Facebook />
                            </a>
                            <a
                                className={social}
                                href={CONFIG.social.instagram}
                                target="_blank"
                                rel="noopener"
                                aria-label="Instagram"
                            >
                                <Icon.Instagram />
                            </a>
                            <a
                                className={social}
                                href={CONFIG.social.linkedin}
                                target="_blank"
                                rel="noopener"
                                aria-label="LinkedIn"
                            >
                                <Icon.LinkedIn />
                            </a>
                        </div>
                    </div>
                    <form
                        noValidate
                        onSubmit={submit}
                        className="grid gap-5 bg-surface p-7 sm:p-12"
                    >
                        <div className="grid gap-5 sm:grid-cols-2">
                            <Field
                                id="name"
                                label={c.name}
                                autoComplete="name"
                                value={form.name}
                                onChange={set('name')}
                                error={errors.name}
                            />
                            <Field
                                id="company"
                                label={c.company}
                                autoComplete="organization"
                                value={form.company}
                                onChange={set('company')}
                            />
                        </div>
                        <div className="grid gap-5 sm:grid-cols-2">
                            <Field
                                id="email"
                                type="email"
                                dir="ltr"
                                label={c.email}
                                autoComplete="email"
                                value={form.email}
                                onChange={set('email')}
                                error={errors.email}
                            />
                            <Field
                                id="phone"
                                type="tel"
                                dir="ltr"
                                label={c.phone}
                                autoComplete="tel"
                                value={form.phone}
                                onChange={set('phone')}
                            />
                        </div>
                        <Field
                            id="service"
                            as="select"
                            label={c.service}
                            value={form.service}
                            onChange={set('service')}
                        >
                            {c.serviceOpts.map((o: any) => (
                                <option key={o}>{o}</option>
                            ))}
                        </Field>
                        <Field
                            id="msg"
                            as="textarea"
                            rows={5}
                            label={c.message}
                            value={form.msg}
                            onChange={set('msg')}
                            error={errors.msg}
                        />
                        <Button
                            type="submit"
                            arrow
                            className="justify-self-start"
                        >
                            {c.send}
                        </Button>
                        {sent && (
                            <p className="border-s-4 border-green bg-surface2 px-4 py-3.5 text-[15px]">
                                {c.ok}
                            </p>
                        )}
                    </form>
                </div>
                <div
                    className="mt-12 grid aspect-[21/8] place-items-center rounded-[10px] bg-ink bg-cover bg-center grayscale"
                    style={{
                        backgroundImage:
                            'url(https://picsum.photos/seed/cairo-map/1400/540)',
                    }}
                >
                    <span className="bg-orange px-3.5 py-2.5 font-mono text-sm font-bold text-black rtl:font-arabic">
                        Brandology · {t.footer.city}
                    </span>
                </div>
            </Section>
        </>
    );
}
