import { Link } from '@inertiajs/react';
import { cx } from '@/components/site/ui';
import { useLang } from '@/lib/site/i18n';

/** Switches between the English and Arabic version of the current page. */
export default function LanguageSwitcher() {
    const { t, otherHref, ar } = useLang();
    return (
        <Link
            href={otherHref}
            lang={ar ? 'en' : 'ar'}
            hrefLang={ar ? 'en' : 'ar'}
            className={cx(
                'grid h-11 min-w-11 place-items-center rounded-full border-2 border-white/25 px-3 text-[13px] font-bold text-white no-underline transition-colors hover:border-orange hover:text-orange',
                ar ? 'font-body' : 'font-arabic',
            )}
        >
            {t.nav.other}
        </Link>
    );
}
