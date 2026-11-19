import { useLanguage } from "@/hooks/useLanguage";
import { Link } from "@inertiajs/react";
export default function LanguageSwitcher() {
  const { otherLanguageHref, labels, ar } = useLanguage();
  return <Link href={otherLanguageHref} className={`language-switch ${ar ? "font-arabic" : ""}`} lang={ar ? "en" : "ar"}>{labels.language}</Link>;
}
