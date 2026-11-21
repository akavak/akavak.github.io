import type { ElementType, ReactNode } from "react";

/** Fades/slides children in when they enter the viewport. */
export default function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  as?: ElementType;
  className?: string;
}) {
  return (
    <Tag className={`reveal ${className}`} style={{ ["--delay" as string]: `${delay}s` }}>
      {children}
    </Tag>
  );
}
