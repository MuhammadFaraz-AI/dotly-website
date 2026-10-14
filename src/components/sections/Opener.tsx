import type { ReactNode } from "react";

interface OpenerProps {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
}

export function Opener({ eyebrow, title, children }: OpenerProps) {
  return (
    <div className="dt-opener">
      {eyebrow && <span className="dt-chip dt-chip--eyebrow">{eyebrow}</span>}
      <h2 className="h2">{title}</h2>
      {children && <p>{children}</p>}
    </div>
  );
}
