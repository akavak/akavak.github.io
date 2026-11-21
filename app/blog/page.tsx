import type { Metadata } from "../../lib/site";
import Link from "../../components/SiteLink";
import { ArrowUpRight, Clock } from "lucide-react";
import PageHero from "../../components/PageHero";
import Reveal from "../../components/Reveal";
import CoverArt from "../../components/CoverArt";
import { posts } from "../../data/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Research highlights, project news and perspectives on wireless networks, 6G and medical AI from Prof. Dr. Adnan Kavak.",
};

const fmt = (d: string) => new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

export default function BlogPage() {
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));
  const [first, ...rest] = sorted;
  return (
    <>
      <PageHero
        crumb="Blog"
        eyebrow="News & Insights"
        title={
          <>
            The <span className="serif accent">blog</span>
          </>
        }
        intro="Research highlights, project updates and perspectives from the lab."
      />
      <section className="section">
        <div className="container">
          <Reveal>
            <Link href={`/blog/${first.slug}/`} className="project-feature" style={{ display: "grid" }}>
              <CoverArt variant={first.cover} />
              <div className="body">
                <div className="post-meta">
                  <span className="cat">{first.category}</span>
                  <span>{fmt(first.date)}</span>
                  <span style={{ display: "inline-flex", gap: 6, alignItems: "center" }}>
                    <Clock size={15} /> {first.readTime}
                  </span>
                </div>
                <h3>{first.title}</h3>
                <p>{first.excerpt}</p>
                <span className="link-arrow">
                  Read article <ArrowUpRight />
                </span>
              </div>
            </Link>
          </Reveal>
          <div className="blog-grid" style={{ marginTop: 56 }}>
            {rest.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.06}>
                <Link href={`/blog/${p.slug}/`} className="post-card">
                  <CoverArt variant={p.cover} />
                  <div className="post-meta">
                    <span className="cat">{p.category}</span>
                    <span>{fmt(p.date)}</span>
                  </div>
                  <h3>{p.title}</h3>
                  <p>{p.excerpt}</p>
                  <span className="link-arrow" style={{ marginTop: "auto" }}>
                    Read more <ArrowUpRight />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
