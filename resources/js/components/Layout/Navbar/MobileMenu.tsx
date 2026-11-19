import { Button, Icon, L, cx } from '@/components/site/ui';
import { CONFIG } from '@/Data/config';
import { NAV } from '@/Data/navigation';
import { useLang } from '@/lib/site/i18n';
import QuoteCount from './QuoteCount';
import { useActive } from './NavLinks';

/** Full-screen menu for narrow screens. */
export default function MobileMenu({ onClose }: { onClose: () => void }) {
    const { t } = useLang();
    const active = useActive();
    return (
        <div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-orange px-6 pt-5 pb-8 text-black min-[1100px]:hidden"
        >
            <div className="flex items-center justify-between">
                <img
                    src="/logo.png"
                    alt=""
                    className="h-11 w-auto brightness-0"
                />
                <button
                    type="button"
                    aria-label="Close"
                    onClick={onClose}
                    className="grid h-12 w-12 place-items-center rounded-full bg-black text-orange"
                >
                    <Icon.Close />
                </button>
            </div>
            <nav className="mt-8 grid gap-1">
                {NAV.map(({ path, key }, i) => (
                    <L
                        key={path}
                        to={path}
                        style={{ animationDelay: `${i * 55}ms` }}
                        className={cx(
                            'animate-rise font-display text-[clamp(30px,9vw,52px)] font-black uppercase leading-[1.12] no-underline rtl:normal-case',
                            active(path)
                                ? 'text-yellow [-webkit-text-stroke:2px_#16171c]'
                                : 'text-black',
                        )}
                    >
                        {t.nav[key]}
                    </L>
                ))}
            </nav>
            <div className="mt-auto grid gap-4 pt-10">
                <Button to="/quote" variant="black" className="w-full">
                    {t.nav.quote}
                    <QuoteCount />
                </Button>
                <p dir="ltr" className="text-center font-semibold">
                    {CONFIG.phone}
                </p>
            </div>
        </div>
    );
}
