import { useQuote } from '@/lib/site/quote';

/** Small count bubble for the number of items in the quote list. */
export default function QuoteCount() {
    const { count } = useQuote();
    return count ? (
        <span className="ms-2 inline-grid h-[22px] min-w-[22px] place-items-center rounded-full bg-black px-1.5 font-mono text-xs font-bold text-orange">
            {count}
        </span>
    ) : null;
}
