import { useState } from "react";
import { Link } from "@inertiajs/react";
import NavLinks from "./NavLinks";
import LanguageSwitcher from "./LanguageSwitcher";
import Button from "../../UI/Button";
import { useLanguage } from "../../../Hooks/useLanguage";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { labels, localize, ar } = useLanguage();
  return <header className="site-navbar">
    <div className="site-container navbar-inner">
      <Link href={localize("/")} aria-label="Brandology home" onClick={() => setOpen(false)} className="brand-logo"><img src="/logo.png" alt="Brandology Advertising Agency" /></Link>
      <div className="desktop-nav"><NavLinks /><LanguageSwitcher /><Button href={localize("/quote")} className="navbar-quote">{labels.quote}</Button></div>
      <div className="mobile-nav-actions"><LanguageSwitcher /><button className="menu-toggle" aria-label={labels.menu} aria-expanded={open} onClick={() => setOpen(v => !v)}>{open ? <span>×</span> : <span>☰</span>}</button></div>
      <div className={`mobile-menu ${open ? "open" : ""}`}><NavLinks mobile onClick={() => setOpen(false)} /><Button href={localize("/quote")} className="mt-4" onClick={() => setOpen(false)}>{labels.quote}</Button></div>
    </div>
  </header>;
}
