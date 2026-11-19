import type { ReactNode } from "react";
import Navbar from "@/components/Layout/Navbar/Navbar";
import Footer from "@/components/Layout/Footer/Footer";
import QuoteBar from "@/components/Layout/QuoteBar/QuoteBar";
import PageTransition from "@/components/Layout/PageTransition/PageTransition";
import CustomCursor from "@/components/Layout/Cursor/CustomCursor";
import MotionProvider from "@/components/Providers/MotionProvider";

export default function MainLayout({ children, quoteCount = 0 }: { children: ReactNode; quoteCount?: number }) {
  return <>
    <Navbar />
    {/* <MotionProvider>{children}</MotionProvider> */}
<main className="min-h-screen bg-white">
                {children}
            </main>
    <Footer />
    <QuoteBar count={quoteCount} />
    <PageTransition />
    <CustomCursor />
  </>;
}
