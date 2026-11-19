import { Link, usePage } from "@inertiajs/react";
import { NAV } from "../../../Data/navigation";
import { useLanguage } from "@/hooks/useLanguage";

export default function NavLinks({ onClick, mobile = false }: { onClick?: () => void; mobile?: boolean }) {
  const { labels, localize } = useLanguage();
  const { url } = usePage();
  return <nav className={mobile ? "grid" : "flex items-center gap-6"} aria-label="Main navigation">
    {NAV.map(({ path, key }) => {
      const href = localize(path);
      const active = path === "/" ? url.split("?")[0] === href : url.split("?")[0].startsWith(href);
      return <Link key={path} href={href} onClick={onClick} className={`nav-link ${mobile ? "nav-link-mobile" : ""} ${active ? "is-active" : ""}`}>{labels[key]}</Link>;
    })}
  </nav>;
}
