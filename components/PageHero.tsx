import SiteLink from "@/components/SiteLink";
import type { ReactNode } from "react";

export default function PageHero({
  title,
  crumb,
  intro,
  eyebrow,
}: {
  title: ReactNode;
  crumb: string;
  intro?: ReactNode;
  eyebrow?: string;
}) {
  return (
    <section className="page-hero">
      <div className="container">
        <ol className="crumbs" aria-label="Breadcrumb">
          <li>
            <SiteLink href="/">Home</SiteLink>
          </li>
          <li aria-current="page">{crumb}</li>
        </ol>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        {intro && <p>{intro}</p>}
      </div>
    </section>
  );
}
