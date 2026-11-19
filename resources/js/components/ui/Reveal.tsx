import type { HTMLAttributes, ReactNode } from "react";
type Props = HTMLAttributes<HTMLElement> & { children: ReactNode; as?: keyof JSX.IntrinsicElements; animation?: "up" | "rise" | "stagger" | "image" };
export default function Reveal({ as: Tag = "div", animation = "up", children, ...props }: Props) {
  const attribute = animation === "rise" ? { "data-rise": "" } : animation === "stagger" ? { "data-stag": "" } : animation === "image" ? { "data-img": "" } : { "data-up": "" };
  return <Tag {...attribute} {...props}>{children}</Tag>;
}
