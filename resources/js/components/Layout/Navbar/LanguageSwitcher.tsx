import { Link } from "@inertiajs/react";
import { useLanguage } from "../../../Hooks/useLanguage";
export default function LanguageSwitcher() {
  const { otherLanguageHref, labels, ar } = useLanguage();
  return <Link href={otherLanguageHref} className={`language-switch ${ar ? "font-arabic" : ""}`} lang={ar ? "en" : "ar"}>{labels.language}</Link>;
}
