import { L } from '@/components/site/ui';
import { CONFIG } from '@/Data/config';
import { FOOTER_SERVICES } from '@/Data/footer';
import { NAV } from '@/Data/navigation';
import { useLang } from '@/lib/site/i18n';
import { prefersReduced } from '@/lib/site/reveals';
import SocialLinks from './SocialLinks';

const heading =
    'mb-[18px] font-mono text-[13px] font-medium uppercase tracking-[.12em] text-white rtl:font-arabic';

/** Site footer. It lifts over the last section like every other sheet. */
export default function Footer() {
    const { t, lang } = useLang();
    const toTop = () =>
        window.__lenis
            ? window.__lenis.scrollTo(0)
            : window.scrollTo({
                  top: 0,
                  behavior: prefersReduced() ? 'auto' : 'smooth',
              });
    return (
        <footer className="relative -mt-10 rounded-t-[40px] bg-black text-[15px] text-[#c9c9cd] md:-mt-14 md:rounded-t-[72px]">
            <div className="container-site">
                <div className="grid gap-10 pt-24 pb-12 sm:grid-cols-2 md:pt-32 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
                    <div>
                        <L to="/">
                            <img
                                src="/logo.png"
                                alt="Brandology"
                                className="mb-[18px] h-[72px] w-auto"
                            />
                        </L>
                        <p>{t.footer.tagline}</p>
                        <SocialLinks />
                    </div>
                    <div>
                        <h4 className={heading}>{t.footer.quick}</h4>
                        <ul className="grid gap-2.5">
                            {NAV.slice(0, 5).map(({ path, key }) => (
                                <li key={path}>
                                    <L
                                        to={path}
                                        className="no-underline hover:text-orange"
                                    >
                                        {t.nav[key]}
                                    </L>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className={heading}>{t.footer.services}</h4>
                        <ul className="grid gap-2.5">
                            {FOOTER_SERVICES.map((s) => (
                                <li key={s.path}>
                                    <L
                                        to={s.path}
                                        className="no-underline hover:text-orange"
                                    >
                                        {lang === 'ar' ? s.ar : s.en}
                                    </L>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className={heading}>{t.footer.hello}</h4>
                        <ul className="grid gap-2.5">
                            <li>{t.footer.city}</li>
                            <li dir="ltr" className="rtl:text-right">
                                {CONFIG.phone}
                            </li>
                            <li>{CONFIG.email}</li>
                            <li>{t.footer.hours}</li>
                        </ul>
                    </div>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-ink-2 py-[22px] font-mono text-[13px] text-grey-400">
                    <span>© 2026 Brandology Advertising Agency ®</span>
                    <span>Est. 2008 · Cairo</span>
                    <button
                        type="button"
                        onClick={toTop}
                        className="rounded-full border-2 border-ink-2 px-5 py-2 font-display font-bold text-white uppercase transition-colors hover:border-orange hover:text-orange rtl:font-arabic"
                    >
                        {lang === 'ar' ? 'إلى الأعلى' : 'Back to top'}
                    </button>
                </div>
            </div>
        </footer>
    );
}
