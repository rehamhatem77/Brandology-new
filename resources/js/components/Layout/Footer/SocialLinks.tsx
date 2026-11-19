import { CONFIG } from "../../../Data/config";
const socials = [{ label: "Facebook", href: CONFIG.social.facebook, icon: "f" }, { label: "Instagram", href: CONFIG.social.instagram, icon: "◎" }, { label: "LinkedIn", href: CONFIG.social.linkedin, icon: "in" }];
export default function SocialLinks() { return <div className="social-links">{socials.map(s => <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}>{s.icon}</a>)}</div>; }
