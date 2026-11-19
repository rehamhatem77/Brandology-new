import { Link } from "@inertiajs/react";
import { useLanguage } from "../../../Hooks/useLanguage";
// Replace this demo count with your quote/cart context or a shared Inertia prop.
export default function QuoteBar({ count = 0 }: { count?: number }) {
  const { localize, ar } = useLanguage();
  if (!count) return null;
  return <div className="quote-bar"><span className="quote-bar-icon">☷</span><span>{ar ? "قائمة عرض السعر:" : "Quote list:"} <strong>{count}</strong></span><Link href={localize("/quote")} className="quote-bar-button">{ar ? "مراجعة" : "Review"}</Link></div>;
}
