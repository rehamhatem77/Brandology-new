import { NAV_LABELS } from "@/Data/navigation";
import { usePage } from "@inertiajs/react";
import { useEffect, useMemo } from "react";

export function useLanguage() {
  const page = usePage<{ locale?: string }>();
  const pathname = typeof window !== "undefined" ? window.location.pathname : "/";
  const lang = page.props.locale === "ar" || pathname === "/ar" || pathname.startsWith("/ar/") ? "ar" : "en";
  const ar = lang === "ar";
  const barePath = ar ? pathname.replace(/^\/ar(?=\/|$)/, "") || "/" : pathname;

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = ar ? "rtl" : "ltr";
  }, [lang, ar]);

  return useMemo(() => ({
    lang, ar, labels: NAV_LABELS[lang],
    localize: (path: string) => ar ? `/ar${path === "/" ? "" : path}` : path,
    otherLanguageHref: ar ? barePath : `/ar${barePath === "/" ? "" : barePath}`,
  }), [lang, ar, barePath]);
}
