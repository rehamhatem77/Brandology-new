import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react';
import type { ReactNode } from 'react';

export type Theme = 'light' | 'dark';
interface ThemeApi {
    theme: Theme;
    toggle: (origin?: { x: number; y: number }) => void;
}

const KEY = 'brd-theme';
const Ctx = createContext<ThemeApi>({ theme: 'light', toggle: () => {} });
export const useTheme = () => useContext(Ctx);

const read = (): Theme => {
    try {
        const v = localStorage.getItem(KEY);
        if (v === 'dark' || v === 'light') return v;
    } catch {
        /* storage blocked */
    }
    return 'light';
};

/**
 * Light / dark mood of the public site. The mood lives on the site wrapper (.brd-site),
 * so it never touches the app's own appearance setting on the dashboard and auth pages.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>(read);
    const wrap = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        try {
            localStorage.setItem(KEY, theme);
        } catch {
            /* ignore */
        }
    }, [theme]);

    const toggle = useCallback(
        (origin?: { x: number; y: number }) => {
            const next: Theme = theme === 'dark' ? 'light' : 'dark';
            const doc = document as Document & {
                startViewTransition?: (cb: () => void) => {
                    ready: Promise<void>;
                };
            };
            const reduced = matchMedia(
                '(prefers-reduced-motion: reduce)',
            ).matches;
            const apply = () => {
                wrap.current?.classList.toggle('brd-dark', next === 'dark');
                setTheme(next);
            };
            if (!doc.startViewTransition || reduced) {
                apply();
                return;
            }
            const x = origin?.x ?? innerWidth / 2;
            const y = origin?.y ?? 0;
            const r = Math.hypot(
                Math.max(x, innerWidth - x),
                Math.max(y, innerHeight - y),
            );
            const vt = doc.startViewTransition(apply);
            vt.ready
                .then(() => {
                    document.documentElement.animate(
                        {
                            clipPath: [
                                `circle(0px at ${x}px ${y}px)`,
                                `circle(${r}px at ${x}px ${y}px)`,
                            ],
                        },
                        {
                            duration: 750,
                            easing: 'cubic-bezier(.2,.8,.2,1)',
                            pseudoElement: '::view-transition-new(root)',
                        },
                    );
                })
                .catch(() => {});
        },
        [theme],
    );

    return (
        <Ctx.Provider value={{ theme, toggle }}>
            <div
                ref={wrap}
                className={`brd-site${theme === 'dark' ? ' brd-dark' : ''}`}
            >
                {children}
            </div>
        </Ctx.Provider>
    );
}
