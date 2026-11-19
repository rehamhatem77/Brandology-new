import { Link } from "@inertiajs/react";
import { NAV } from "../../../Data/navigation";
import { FOOTER_SERVICES } from "../../../Data/footer";
import { CONFIG } from "../../../Data/config";
import SocialLinks from "./SocialLinks";
import { useLanguage } from "@/hooks/useLanguage";

export default function Footer() {
  const { labels, localize, ar } = useLanguage();
  return <footer className="site-footer"><div className="site-container">
    <div className="footer-grid">
      <div className="footer-brand"><Link href={localize("/")}><img src="/logo.png" alt="Brandology" /></Link><p>{ar ? "نحوّل الأفكار إلى علامات تجارية وتجارب مميزة." : "We turn ideas into brands and memorable experiences."}</p><SocialLinks /></div>
      <div><h4>{ar ? "روابط سريعة" : "Quick Links"}</h4><ul>{NAV.slice(0, 5).map(item => <li key={item.path}><Link href={localize(item.path)}>{labels[item.key]}</Link></li>)}</ul></div>
      <div><h4>{ar ? "خدماتنا" : "Our Services"}</h4><ul>{FOOTER_SERVICES.map(item => <li key={item.path}><Link href={localize(item.path)}>{ar ? item.ar : item.en}</Link></li>)}</ul></div>
      <div><h4>{ar ? "تواصل معنا" : "Get in Touch"}</h4><ul className="contact-list"><li>{ar ? "القاهرة، مصر" : "Cairo, Egypt"}</li><li><a href={`tel:${CONFIG.phone}`}>{CONFIG.phone}</a></li><li><a href={`mailto:${CONFIG.email}`}>{CONFIG.email}</a></li><li>{ar ? "الأحد - الخميس" : "Sunday - Thursday"}</li></ul></div>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} Brandology Advertising Agency ®</span><span>{ar ? "تأسست عام 2008 · القاهرة" : "Est. 2008 · Cairo"}</span></div>
  </div></footer>;
}
