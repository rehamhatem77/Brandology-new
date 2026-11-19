import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Button, Icon, L, cx } from '@/components/site/ui';
import { useLang } from '@/lib/site/i18n';
import LanguageSwitcher from './LanguageSwitcher';
import MobileMenu from './MobileMenu';
import NavLinks from './NavLinks';
import QuoteCount from './QuoteCount';
import ThemeToggle from './ThemeToggle';

/** Floating capsule header. It tucks away as you scroll down and returns as you scroll up. */
export default function Navbar() {
    const { t } = useLang();
    const { url } = usePage();
    const [open, setOpen] = useState(false);
    const [hidden, setHidden] = useState(false);

    useEffect(() => setOpen(false), [url]);
    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);
    useEffect(() => {
        let last = window.scrollY;
        const onScroll = () => {
            const y = window.scrollY;
            if (y > 260 && y > last + 6) setHidden(true);
            else if (y < last - 6 || y < 120) setHidden(false);
            last = y;
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [url]);

    return (
        <>
            <header
                className={cx(
                    'fixed inset-x-0 top-0 z-50 px-3 pt-3 transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)]',
                    hidden && !open ? '-translate-y-[140%]' : 'translate-y-0',
                )}
            >
                <div className="mx-auto flex h-[68px] max-w-[1240px] items-center justify-between gap-3 rounded-full border border-ink-2 bg-black/95 ps-6 pe-2.5 text-white shadow-[0_12px_32px_rgba(0,0,0,.35)] backdrop-blur">
                    <L to="/" aria-label="Brandology" className="shrink-0">
                        <img
                            src="/logo.png"
                            alt="Brandology Advertising Agency"
                            width="62"
                            height="46"
                            className="h-[42px] w-auto"
                        />
                    </L>
                    <NavLinks />
                    <div className="flex items-center gap-2">
                        <LanguageSwitcher />
                        <ThemeToggle />
                        <Button
                            to="/quote"
                            className="hidden !min-h-11 !px-5 sm:inline-flex"
                        >
                            {t.nav.quote}
                            <QuoteCount />
                        </Button>
                        <button
                            type="button"
                            aria-label={t.nav.menu}
                            aria-expanded={open}
                            aria-controls="mobile-menu"
                            onClick={() => setOpen(true)}
                            className="grid h-11 w-11 place-items-center rounded-full bg-white/10 min-[1100px]:hidden"
                        >
                            <Icon.Menu />
                        </button>
                    </div>
                </div>
            </header>
            {open && <MobileMenu onClose={() => setOpen(false)} />}
        </>
    );
}
