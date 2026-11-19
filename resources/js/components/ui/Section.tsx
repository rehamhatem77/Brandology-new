import type { HTMLAttributes, ReactNode } from "react";
type Props = HTMLAttributes<HTMLElement> & { children: ReactNode; tone?: "white" | "paper" | "dark" };
export default function Section({ tone = "white", children, className = "", ...props }: Props) {
  const colors = { white: "bg-white text-black", paper: "bg-[#f5f4f1] text-black", dark: "bg-black text-white" };
  return <section className={`section-site ${colors[tone]} ${className}`} {...props}><div className="site-container">{children}</div></section>;
}
