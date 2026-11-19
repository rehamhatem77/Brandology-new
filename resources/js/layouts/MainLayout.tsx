import CustomCursor from "@/components/Layout/Cursor/CustomCursor";
import Footer from "@/components/Layout/Footer/Footer";
import Navbar from "@/components/Layout/Navbar/Navbar";
import PageTransition from "@/components/Layout/PageTransition/PageTransition";
import QuoteBar from "@/components/Layout/QuoteBar/QuoteBar";
import MotionProvider from "@/components/Providers/MotionProvider";
import type { ReactNode } from "react";


export default function MainLayout({  quoteCount = 0 }: {  quoteCount?: number }) {
  return <>
    <Navbar />

    <Footer />
    <QuoteBar count={quoteCount} />
    <PageTransition />
    <CustomCursor />
  </>;
}
