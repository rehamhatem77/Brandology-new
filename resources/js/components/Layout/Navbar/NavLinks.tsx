import { usePage } from '@inertiajs/react';
import { L, cx } from '@/components/site/ui';
import { NAV } from '@/Data/navigation';
import { useLang } from '@/lib/site/i18n';

/** True when `path` is the page being shown (language prefix ignored). */
export function useActive() {
    const { url } = usePage();
    const base = url.split(/[?#]/)[0].replace(/^\/ar/, '') || '/';
    return (path: string) =>
        path === '/'
            ? base === '/'
            : base === path || base.startsWith(path + '/');
}

/** Desktop navigation pills. */
export default function NavLinks() {
    const { t } = useLang();
    const active = useActive();
    return (
        <nav
            aria-label="Main"
            className="hidden items-center gap-0.5 min-[1100px]:flex"
        >
            {NAV.map(({ path, key }) => (
                <L
                    key={path}
                    to={path}
                    aria-current={active(path) ? 'page' : undefined}
                    className={cx(
                        'rounded-full px-3.5 py-2.5 text-[14px] font-semibold tracking-[.02em] no-underline transition-all duration-300 hover:-rotate-2 hover:scale-105 hover:bg-white/10 rtl:text-[15px]',
                        active(path)
                            ? 'bg-orange text-black hover:bg-orange'
                            : 'text-[#d6d6d9] hover:text-white',
                    )}
                >
                    {t.nav[key]}
                </L>
            ))}
        </nav>
    );
}
