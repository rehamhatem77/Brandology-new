import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react';
import type { ReactNode } from 'react';

export interface QuoteItem {
    kind: 'service' | 'sign';
    id: string;
    qty: number;
    size?: string;
    material?: string;
}
/** A request sent from the quote page, kept so visitors can see what they asked for before. */
export type QuoteRequest = Record<string, any>;

interface QuoteApi {
    items: QuoteItem[];
    count: number;
    add: (item: Partial<QuoteItem> & Pick<QuoteItem, 'kind' | 'id'>) => void;
    update: (index: number, patch: Partial<QuoteItem>) => void;
    remove: (index: number) => void;
    clear: () => void;
    history: () => QuoteRequest[];
    saveHistory: (req: QuoteRequest) => void;
    toast: (msg: string) => void;
    toastMsg: string;
}

const KEY = 'brd-quote';
const HIST = 'brd-quote-history';

function read<T>(key: string, fallback: T): T {
    try {
        return (
            (JSON.parse(localStorage.getItem(key) ?? 'null') as T) || fallback
        );
    } catch {
        return fallback;
    }
}
function write(key: string, value: unknown): void {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch {
        /* storage blocked: keep in memory */
    }
}
const keyOf = (i: Pick<QuoteItem, 'kind' | 'id' | 'size' | 'material'>) =>
    [i.kind, i.id, i.size || '', i.material || ''].join('|');

const QuoteContext = createContext<QuoteApi>(null as unknown as QuoteApi);

/** Quote list (stored in this browser, shared by English and Arabic) + toast messages. */
export function QuoteProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<QuoteItem[]>(() =>
        read<QuoteItem[]>(KEY, []),
    );
    const [toastMsg, setToastMsg] = useState('');
    const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    useEffect(() => {
        write(KEY, items);
    }, [items]);
    useEffect(() => {
        const onStorage = (e: StorageEvent) => {
            if (e.key === KEY) setItems(read<QuoteItem[]>(KEY, []));
        };
        window.addEventListener('storage', onStorage);
        return () => window.removeEventListener('storage', onStorage);
    }, []);

    const add = useCallback<QuoteApi['add']>(
        (item) =>
            setItems((list) => {
                const k = keyOf(item);
                const existing = list.find((i) => keyOf(i) === k);
                if (existing)
                    return list.map((i) =>
                        i === existing
                            ? {
                                  ...i,
                                  qty: Math.min(9999, i.qty + (item.qty || 1)),
                              }
                            : i,
                    );
                return [...list, { qty: 1, ...item }];
            }),
        [],
    );

    const update = useCallback<QuoteApi['update']>(
        (index, patch) =>
            setItems((list) => {
                const next = list.map((i, n) =>
                    n === index ? { ...i, ...patch } : i,
                );
                const k = keyOf(next[index]);
                const dup = next.findIndex(
                    (i, n) => n !== index && keyOf(i) === k,
                );
                if (dup > -1) {
                    next[dup] = {
                        ...next[dup],
                        qty: next[dup].qty + next[index].qty,
                    };
                    next.splice(index, 1);
                }
                return next;
            }),
        [],
    );

    const remove = useCallback(
        (index: number) =>
            setItems((list) => list.filter((_, n) => n !== index)),
        [],
    );
    const clear = useCallback(() => setItems([]), []);
    const history = useCallback(() => read<QuoteRequest[]>(HIST, []), []);
    const saveHistory = useCallback(
        (req: QuoteRequest) =>
            write(HIST, [req, ...read<QuoteRequest[]>(HIST, [])].slice(0, 20)),
        [],
    );

    const toast = useCallback((msg: string) => {
        setToastMsg(msg);
        clearTimeout(timer.current);
        timer.current = setTimeout(() => setToastMsg(''), 2200);
    }, []);

    return (
        <QuoteContext.Provider
            value={{
                items,
                count: items.length,
                add,
                update,
                remove,
                clear,
                history,
                saveHistory,
                toast,
                toastMsg,
            }}
        >
            {children}
        </QuoteContext.Provider>
    );
}

export const useQuote = () => useContext(QuoteContext);
