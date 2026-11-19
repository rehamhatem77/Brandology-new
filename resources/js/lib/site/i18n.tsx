import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    type ReactNode,
} from 'react';
import { usePage } from '@inertiajs/react';
import { COPY } from '@/Data/copy';
import type { Lang } from '@/types/site';

export interface LangApi {
    lang: Lang;
    ar: boolean;
    t: any;
    /** Pick the current language from { en, ar } (or pass anything else through). */
    L: <T = any>(o: any) => T;
    to: (path: string) => string;
    otherHref: string;
    date: (d: string) => string;
}
const LangContext = createContext<LangApi>(null as unknown as LangApi);

// Language comes from the URL: /ar/... is Arabic, everything else English.
export function LangProvider({ children }: { children: ReactNode }) {
    const { url } = usePage();
    const [pathname, search = ''] = url.split(/(?=\?)/);
    const lang: Lang =
        pathname === '/ar' || pathname.startsWith('/ar/') ? 'ar' : 'en';

    useEffect(() => {
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    }, [lang]);
    // Leaving the site layout (e.g. to the dashboard) hands the document back to the app defaults.
    useEffect(
        () => () => {
            document.documentElement.lang = 'en';
            document.documentElement.dir = 'ltr';
        },
        [],
    );

    const value = useMemo<LangApi>(() => {
        const clean = pathname.split('#')[0];
        const bare = lang === 'ar' ? clean.replace(/^\/ar/, '') || '/' : clean;
        return {
            lang,
            ar: lang === 'ar',
            t: COPY[lang],
            L: (o) => (o && typeof o === 'object' && 'en' in o ? o[lang] : o),
            to: (path) =>
                lang === 'ar' ? `/ar${path === '/' ? '' : path}` : path,
            otherHref:
                (lang === 'ar' ? bare : `/ar${bare === '/' ? '' : bare}`) +
                search,
            date: (d) =>
                new Date(d + 'T00:00:00').toLocaleDateString(
                    lang === 'ar' ? 'ar-EG' : 'en-GB',
                    { day: 'numeric', month: 'short', year: 'numeric' },
                ),
        };
    }, [lang, pathname, search]);

    return (
        <LangContext.Provider value={value}>{children}</LangContext.Provider>
    );
}

export const useLang = () => useContext(LangContext);
