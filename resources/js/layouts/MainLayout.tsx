import { usePage } from '@inertiajs/react';
import { useRef } from 'react';
import type { ReactNode } from 'react';
import CustomCursor from '@/components/Layout/Cursor/CustomCursor';
import Footer from '@/components/Layout/Footer/Footer';
import Navbar from '@/components/Layout/Navbar/Navbar';
import QuoteBar from '@/components/Layout/QuoteBar/QuoteBar';
import { useSiteMotion } from '@/hooks/use-site-motion';
import { LangProvider } from '@/lib/site/i18n';
import { QuoteProvider } from '@/lib/site/quote';
import { ThemeProvider } from '@/lib/site/theme';
import { TransitionProvider } from '@/lib/site/transition';

function Shell({ children }: { children: ReactNode }) {
    const { url } = usePage();
    const main = useRef<HTMLElement>(null);
    useSiteMotion(main);
    return (
        <>
            <Navbar />
            {/* key: every page gets fresh DOM, since heading animations split text into word spans */}
            <main key={url.split(/[?#]/)[0]} ref={main}>
                {children}
            </main>
            <Footer />
            <QuoteBar />
            <CustomCursor />
        </>
    );
}

/** Layout for the public Brandology pages: header, footer, quote list, motion, and the light / dark mood. */
export default function MainLayout({ children }: { children: ReactNode }) {
    return (
        <LangProvider>
            <ThemeProvider>
                <QuoteProvider>
                    <TransitionProvider>
                        <Shell>{children}</Shell>
                    </TransitionProvider>
                </QuoteProvider>
            </ThemeProvider>
        </LangProvider>
    );
}
