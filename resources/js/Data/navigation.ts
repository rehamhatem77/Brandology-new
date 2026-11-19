export type NavItem = { path: string; key: keyof typeof NAV_LABELS.en };
export const NAV_LABELS = {
  en: { home: "Home", about: "About", services: "Services", projects: "Projects", signs: "Safety Signs", clients: "Clients", blog: "Blog", contact: "Contact", quote: "Request a Quote", language: "العربية", menu: "Menu" },
  ar: { home: "الرئيسية", about: "من نحن", services: "الخدمات", projects: "المشاريع", signs: "لافتات السلامة", clients: "عملاؤنا", blog: "المدونة", contact: "تواصل معنا", quote: "اطلب عرض سعر", language: "English", menu: "القائمة" },
} as const;
export const NAV: NavItem[] = [
  { path: "/", key: "home" }, { path: "/about", key: "about" }, { path: "/services", key: "services" },
  { path: "/projects", key: "projects" }, { path: "/safety-signs", key: "signs" }, { path: "/clients", key: "clients" },
  { path: "/blog", key: "blog" }, { path: "/contact", key: "contact" },
];
