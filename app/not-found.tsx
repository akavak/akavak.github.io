import SiteLink from "@/components/SiteLink";
import { ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return (
    <section className="page-hero" style={{ minHeight: "70vh", display: "flex", alignItems: "center" }}>
      <div className="container">
        <span className="eyebrow">Error 404</span>
        <h1>
          Signal <span className="serif accent">lost</span>.
        </h1>
        <p style={{ marginBottom: 32 }}>The page you are looking for does not exist or has moved.</p>
        <SiteLink href="/" className="btn btn-primary">
          Back to home <ArrowUpRight />
        </SiteLink>
      </div>
    </section>
  );
}
