import { Link } from "@inertiajs/react";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Props = { href?: string; variant?: "primary" | "black" | "outline" | "outlineDark"; children: ReactNode; className?: string } & (ButtonHTMLAttributes<HTMLButtonElement> | AnchorHTMLAttributes<HTMLAnchorElement>);
const styles = {
  primary: "border-transparent bg-[#f99d1b] text-black hover:bg-[#fdca0f]",
  black: "border-transparent bg-black text-white hover:bg-[#292929]",
  outline: "border-black bg-transparent text-black hover:bg-black hover:text-white",
  outlineDark: "border-white bg-transparent text-white hover:bg-white hover:text-black",
};
export default function Button({ href, variant = "primary", className = "", children, ...props }: Props) {
  const classes = `inline-flex min-h-12 items-center justify-center gap-2.5 rounded border-2 px-6 text-sm font-bold uppercase tracking-wide transition-colors no-underline ${styles[variant]} ${className}`;
  if (href) return <Link href={href} className={classes} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>{children}</Link>;
  return <button className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>{children}</button>;
}
