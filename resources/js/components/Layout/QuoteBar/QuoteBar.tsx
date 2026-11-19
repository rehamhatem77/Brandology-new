import { usePage } from '@inertiajs/react';
import { Button, Icon } from '@/components/site/ui';
import { useLang } from '@/lib/site/i18n';
import { useQuote } from '@/lib/site/quote';

/** Floating "quote list" pill and the toast that confirms an item was added. */
export default function QuoteBar() {
    const { t } = useLang();
    const { count, toastMsg } = useQuote();
    const { url } = usePage();
    const onQuotePage = url.split(/[?#]/)[0].endsWith('/quote');
    return (
        <>
            {count > 0 && !onQuotePage && (
                <div className="fixed end-5 bottom-5 z-40 flex items-center gap-4 rounded-full bg-black py-2.5 ps-5 pe-2.5 font-mono text-sm text-white shadow-[0_10px_30px_rgba(0,0,0,.3)] rtl:font-arabic">
                    <Icon.List />
                    <span>
                        {t.common.quoteList}:{' '}
                        <b className="text-orange">{t.common.items(count)}</b>
                    </span>
                    <Button to="/quote" className="!min-h-10 !px-5">
                        {t.common.review}
                    </Button>
                </div>
            )}
            <div
                role="status"
                className={`pointer-events-none fixed bottom-24 left-1/2 z-[60] max-w-[calc(100%-32px)] -translate-x-1/2 rounded-full bg-orange px-5 py-3 text-sm font-bold text-black transition-all duration-300 ${toastMsg ? 'opacity-100' : 'translate-y-5 opacity-0'}`}
            >
                {toastMsg}
            </div>
        </>
    );
}
