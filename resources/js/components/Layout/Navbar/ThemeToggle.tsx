import { cx } from '@/components/site/ui';
import { useLang } from '@/lib/site/i18n';
import { useTheme } from '@/lib/site/theme';

/** Sun / moon switch for the light and dark mood. */
export default function ThemeToggle() {
    const { theme, toggle } = useTheme();
    const { ar } = useLang();
    const dark = theme === 'dark';
    const label = dark
        ? ar
            ? 'التبديل إلى الوضع الفاتح'
            : 'Switch to light mode'
        : ar
          ? 'التبديل إلى الوضع الداكن'
          : 'Switch to dark mode';
    return (
        <button
            type="button"
            aria-label={label}
            title={label}
            aria-pressed={dark}
            onClick={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                toggle({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
            }}
            className="group relative grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-full border-2 border-white/25 text-white transition-colors hover:border-orange hover:text-orange"
        >
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                aria-hidden="true"
                className={cx(
                    'absolute h-5 w-5 transition-all duration-500',
                    dark
                        ? 'rotate-0 scale-100 opacity-100'
                        : '-rotate-90 scale-50 opacity-0',
                )}
            >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
            </svg>
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className={cx(
                    'absolute h-5 w-5 transition-all duration-500',
                    dark
                        ? 'rotate-90 scale-50 opacity-0'
                        : 'rotate-0 scale-100 opacity-100',
                )}
            >
                <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
            </svg>
        </button>
    );
}
