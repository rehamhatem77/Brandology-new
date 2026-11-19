import { useEffect, useState } from 'react';
import { MATERIALS, SERVICES, SIGNS } from '@/Data/content';
import { SignArt, sizesFor } from '@/components/site/Cards';
import Field from '@/components/site/Field';
import {
    ArrowLink,
    Button,
    Eyebrow,
    Hl,
    L,
    PageHero,
    Section,
    usePageTitle,
} from '@/components/site/ui';
import { CONFIG } from '@/Data/config';
import { useLang } from '@/lib/site/i18n';
import { useQuote } from '@/lib/site/quote';

const sign = (id: any) => SIGNS.find((s) => s.code === id)!;
const svc = (id: any) => SERVICES.find((s) => s.id === id)!;
const lineColor = {
    digital: 'bg-blue text-white',
    print: 'bg-green text-white',
    signs: 'bg-yellow text-black',
};
const newRef = () => {
    const d = new Date(),
        p = (n: any) => String(n).padStart(2, '0');
    return `BRD-${String(d.getFullYear()).slice(2)}${p(d.getMonth() + 1)}${p(d.getDate())}-${Math.floor(1000 + Math.random() * 9000)}`;
};

function buildText(req: any, q: any) {
    const out = [
        `${q.msgHead} — ${req.ref}`,
        '',
        `${q.name}: ${req.contact.name}`,
    ];
    if (req.contact.company) out.push(`${q.company}: ${req.contact.company}`);
    out.push(
        `${q.email}: ${req.contact.email}`,
        `${q.phone}: ${req.contact.phone}`,
    );
    if (req.location) out.push(`${q.location}: ${req.location}`);
    if (req.deadline) out.push(`${q.deadline}: ${req.deadline}`);
    if (req.install) out.push(`${q.install}: ${q.yes}`);
    if (req.survey) out.push(`${q.survey}: ${q.yes}`);
    if (req.items.length)
        out.push(
            '',
            ...req.items.map(
                (i: any, n: any) =>
                    `${n + 1}. ${i.label}${i.kind === 'sign' ? ` — ${i.size} · ${i.materialLabel} · ×${i.qty}` : ''}`,
            ),
        );
    if (req.notes) out.push('', `${q.notesShort}: ${req.notes}`);
    return out.join('\n');
}

function ItemRow({ item, index }: any) {
    const { t, L: pick } = useLang();
    const q = t.quote;
    const { update, remove } = useQuote();
    const optLabel =
        'grid gap-1 font-mono text-[11px] uppercase tracking-[.08em] text-dim rtl:font-arabic';
    const optInput =
        'min-h-11 rounded-[10px] border-2 border-line bg-surface px-2.5 py-2 font-body text-[15px] text-fg focus:border-orange focus:outline-none';
    const removeBtn = (name: any) => (
        <button
            type="button"
            onClick={() => remove(index)}
            aria-label={`${q.remove} ${name}`}
            className="h-11 w-11 rounded-[10px] border-2 border-line bg-surface text-[22px] text-dim hover:border-danger hover:text-danger"
        >
            ×
        </button>
    );

    if (item.kind === 'sign') {
        const s = sign(item.id);
        if (!s) return null;
        return (
            <div className="grid grid-cols-[72px_1fr_44px] items-start gap-4 border-b border-line py-[18px]">
                <L
                    to={`/safety-signs/${s.code}`}
                    className="grid h-[72px] w-[72px] place-items-center rounded-[10px] bg-surface2"
                >
                    <SignArt
                        sign={s}
                        className="block h-[70%] w-[70%] [&>svg]:h-full [&>svg]:w-full"
                    />
                </L>
                <div className="grid min-w-0 gap-1.5">
                    <span className="font-mono text-[11px] tracking-[.12em] text-dim uppercase rtl:font-arabic">
                        {q.sign}
                    </span>
                    <L
                        to={`/safety-signs/${s.code}`}
                        className="text-[17px] no-underline hover:text-orange"
                    >
                        <b>{s.code}</b> {pick(s.name)}
                    </L>
                    <div className="mt-1.5 flex flex-wrap gap-2.5">
                        <label className={optLabel}>
                            {q.size}
                            <select
                                className={optInput}
                                value={item.size}
                                onChange={(e) =>
                                    update(index, { size: e.target.value })
                                }
                            >
                                {sizesFor(s).map((z) => (
                                    <option key={z}>{z}</option>
                                ))}
                            </select>
                        </label>
                        <label className={optLabel}>
                            {q.material}
                            <select
                                className={optInput}
                                value={item.material}
                                onChange={(e) =>
                                    update(index, { material: e.target.value })
                                }
                            >
                                {s.mats.map((m) => (
                                    <option key={m} value={m}>
                                        {pick(MATERIALS[m])}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label className={optLabel}>
                            {q.qty}
                            <input
                                className={`${optInput} w-[90px]`}
                                type="number"
                                min="1"
                                max="9999"
                                inputMode="numeric"
                                defaultValue={item.qty}
                                key={item.qty}
                                onBlur={(e) =>
                                    update(index, {
                                        qty: Math.max(
                                            1,
                                            Math.min(
                                                9999,
                                                Math.round(+e.target.value) ||
                                                    1,
                                            ),
                                        ),
                                    })
                                }
                            />
                        </label>
                    </div>
                </div>
                {removeBtn(s.code)}
            </div>
        );
    }
    const s = svc(item.id);
    if (!s) return null;
    return (
        <div className="grid grid-cols-[72px_1fr_44px] items-start gap-4 border-b border-line py-[18px]">
            <span
                className={`grid h-[72px] w-[72px] place-items-center rounded-[10px] font-display text-[28px] font-black ${(lineColor as Record<string, string>)[s.line]}`}
            >
                {pick(s.title).charAt(0)}
            </span>
            <div className="grid min-w-0 gap-1.5">
                <span className="font-mono text-[11px] tracking-[.12em] text-dim uppercase rtl:font-arabic">
                    {q.service}
                </span>
                <L
                    to={`/services/${s.id}`}
                    className="text-[17px] font-bold no-underline hover:text-orange"
                >
                    {pick(s.title)}
                </L>
                <p className="text-sm text-dim">{pick(s.intro)}</p>
            </div>
            {removeBtn(pick(s.title))}
        </div>
    );
}

export default function Quote() {
    const { t, lang, L: pick } = useLang();
    const q = t.quote;
    const { items, clear, history, saveHistory } = useQuote();
    usePageTitle(q.crumb);
    const [form, setForm] = useState({
        name: '',
        company: '',
        email: '',
        phone: '',
        location: '',
        deadline: '',
        install: false,
        survey: false,
        notes: '',
    });
    const [errors, setErrors] = useState<any>({});
    const [sending, setSending] = useState(false);
    const [done, setDone] = useState<any>(null);

    useEffect(() => {
        const last = history()[0];
        if (last) setForm((f) => ({ ...f, ...last.contact }));
    }, [history]);
    const set = (k: any) => (e: any) =>
        setForm((f) => ({
            ...f,
            [k]:
                e.target.type === 'checkbox'
                    ? e.target.checked
                    : e.target.value,
        }));

    const submit = async (e: any) => {
        e.preventDefault();
        const errs: Record<string, string> = {};
        if (!form.name.trim()) errs.name = q.errName;
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim()))
            errs['q-email'] = q.errEmail;
        if (form.phone.replace(/\D/g, '').length < 8) errs.phone = q.errPhone;
        if (!items.length && !form.notes.trim()) errs.empty = q.errEmpty;
        setErrors(errs);
        if (Object.keys(errs).length) {
            (
                document.querySelector(
                    '[aria-invalid=true]',
                ) as HTMLElement | null
            )?.focus();
            return;
        }

        const req = {
            ref: newRef(),
            createdAt: new Date().toISOString(),
            lang,
            contact: {
                name: form.name.trim(),
                company: form.company.trim(),
                email: form.email.trim(),
                phone: form.phone.trim(),
            },
            location: form.location.trim(),
            deadline: form.deadline,
            install: form.install,
            survey: form.survey,
            notes: form.notes.trim(),
            items: items.map((i) =>
                i.kind === 'sign'
                    ? {
                          kind: 'sign',
                          code: i.id,
                          label: `${i.id} ${pick(sign(i.id).name)}`,
                          size: i.size,
                          material: i.material,
                          materialLabel: pick(MATERIALS[i.material as string]),
                          qty: i.qty,
                      }
                    : {
                          kind: 'service',
                          id: i.id,
                          label: pick(svc(i.id).title),
                          qty: 1,
                      },
            ),
        };
        let status = '';
        if (CONFIG.endpoint) {
            setSending(true);
            try {
                const r = await fetch(CONFIG.endpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(req),
                });
                status = r.ok ? q.sentOk : q.sentFail;
            } catch {
                status = q.sentFail;
            }
            setSending(false);
        }
        saveHistory(req);
        clear();
        setDone({ req, text: buildText(req, q), status });
        window.scrollTo({ top: 0 });
    };

    return (
        <>
            <PageHero
                crumbs={[[t.nav.home, '/'], [q.crumb]]}
                title={
                    <>
                        {q.h1a}
                        <Hl>{q.h1b}</Hl>
                    </>
                }
                lead={q.lead}
            />
            <Section>
                {done ? (
                    <div className="grid items-start gap-12 lg:grid-cols-2">
                        <div className="grid gap-3.5 rounded-[10px] bg-black p-10 text-white">
                            <Eyebrow>{q.doneTitle}</Eyebrow>
                            <p className="text-grey-400">{q.doneRef}</p>
                            <b
                                dir="ltr"
                                className="font-mono text-[clamp(28px,4vw,44px)] font-extrabold text-orange"
                                style={{ textAlign: 'start' }}
                            >
                                {done.req.ref}
                            </b>
                            {done.status && (
                                <p className="text-yellow">{done.status}</p>
                            )}
                            <p className="text-grey-400">{q.doneText}</p>
                            <div className="flex flex-wrap gap-3">
                                <Button
                                    href={`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(done.text)}`}
                                    target="_blank"
                                    rel="noopener"
                                >
                                    {q.wa}
                                </Button>
                                <Button
                                    href={`mailto:${CONFIG.email}?subject=${encodeURIComponent(`${q.msgHead} ${done.req.ref}`)}&body=${encodeURIComponent(done.text)}`}
                                    variant="outlineDark"
                                >
                                    {q.mail}
                                </Button>
                            </div>
                        </div>
                        <div className="grid gap-4">
                            <h3 className="text-[22px] font-extrabold">
                                {q.summary}
                            </h3>
                            <pre className="m-0 overflow-x-auto rounded-[10px] border border-line bg-surface2 p-5 font-mono text-sm leading-[1.7] whitespace-pre-wrap rtl:font-arabic">
                                {done.text}
                            </pre>
                            <button
                                type="button"
                                onClick={() => setDone(null)}
                                className="justify-self-start font-display text-sm font-bold tracking-[.05em] text-orange uppercase rtl:font-arabic"
                            >
                                {q.again} →
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="grid items-start gap-12 lg:grid-cols-[1.2fr_1fr]">
                        <div>
                            <h2 className="mb-5 text-[clamp(22px,2.4vw,30px)] font-extrabold uppercase">
                                {q.list}
                            </h2>
                            {items.length ? (
                                <div className="border-t-2 border-fg">
                                    {items.map((it, i) => (
                                        <ItemRow
                                            key={`${it.kind}${it.id}${it.size}${it.material}`}
                                            item={it}
                                            index={i}
                                        />
                                    ))}
                                    <div className="flex items-center justify-between py-4 font-mono text-[13px] text-dim rtl:font-arabic">
                                        <span>{q.lines(items.length)}</span>
                                        <button
                                            type="button"
                                            onClick={clear}
                                            className="min-h-11 font-body text-sm font-bold text-danger underline"
                                        >
                                            {q.clear}
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="grid justify-items-start gap-3.5 rounded-[10px] border-2 border-dashed border-line px-7 py-10">
                                    <h3 className="text-[22px] font-extrabold">
                                        {q.empty}
                                    </h3>
                                    <p className="max-w-[52ch] text-dim">
                                        {q.emptyHint}
                                    </p>
                                    <div className="flex flex-wrap gap-3">
                                        <Button to="/safety-signs">
                                            {q.browseSigns}
                                        </Button>
                                        <Button
                                            to="/services"
                                            variant="outline"
                                        >
                                            {q.browseSvcs}
                                        </Button>
                                    </div>
                                </div>
                            )}
                            <div className="mt-10 grid gap-3.5">
                                <Eyebrow>{q.how}</Eyebrow>
                                <ol className="grid list-decimal gap-2 ps-5 text-dim">
                                    {q.steps.map((s: any) => (
                                        <li key={s}>{s}</li>
                                    ))}
                                </ol>
                                <ArrowLink to="/safety-signs">
                                    {q.browseSigns}
                                </ArrowLink>
                            </div>
                        </div>

                        <form
                            noValidate
                            onSubmit={submit}
                            className="grid gap-5 rounded-[10px] border-2 border-fg bg-surface p-7 sm:p-10 lg:sticky lg:top-[100px]"
                        >
                            <h2 className="text-[clamp(22px,2.4vw,30px)] font-extrabold uppercase">
                                {q.details}
                            </h2>
                            <Field
                                id="name"
                                label={`${q.name} *`}
                                autoComplete="name"
                                value={form.name}
                                onChange={set('name')}
                                error={errors.name}
                            />
                            <Field
                                id="company"
                                label={q.company}
                                autoComplete="organization"
                                value={form.company}
                                onChange={set('company')}
                            />
                            <div className="grid gap-5 sm:grid-cols-2">
                                <Field
                                    id="q-email"
                                    type="email"
                                    dir="ltr"
                                    label={`${q.email} *`}
                                    autoComplete="email"
                                    value={form.email}
                                    onChange={set('email')}
                                    error={errors['q-email']}
                                />
                                <Field
                                    id="phone"
                                    type="tel"
                                    dir="ltr"
                                    label={`${q.phone} *`}
                                    autoComplete="tel"
                                    value={form.phone}
                                    onChange={set('phone')}
                                    error={errors.phone}
                                />
                            </div>
                            <div className="grid gap-5 sm:grid-cols-2">
                                <Field
                                    id="location"
                                    label={q.location}
                                    value={form.location}
                                    onChange={set('location')}
                                />
                                <Field
                                    id="deadline"
                                    type="date"
                                    label={q.deadline}
                                    min={new Date().toISOString().slice(0, 10)}
                                    value={form.deadline}
                                    onChange={set('deadline')}
                                />
                            </div>
                            <div className="flex flex-wrap gap-5">
                                {['install', 'survey'].map((k) => (
                                    <label
                                        key={k}
                                        className="flex min-h-11 cursor-pointer items-center gap-2.5 text-[15px]"
                                    >
                                        <input
                                            type="checkbox"
                                            className="h-5 w-5 accent-orange"
                                            checked={
                                                (form as Record<string, any>)[k]
                                            }
                                            onChange={set(k)}
                                        />
                                        {q[k]}
                                    </label>
                                ))}
                            </div>
                            <Field
                                id="notes"
                                as="textarea"
                                rows={4}
                                label={q.notes}
                                value={form.notes}
                                onChange={set('notes')}
                            />
                            {errors.empty && (
                                <p className="text-sm text-danger">
                                    {errors.empty}
                                </p>
                            )}
                            <Button
                                type="submit"
                                disabled={sending}
                                className="justify-self-start"
                            >
                                {sending ? q.sending : q.send}
                            </Button>
                        </form>
                    </div>
                )}
            </Section>
        </>
    );
}
