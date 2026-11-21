import type { Metadata } from "../../../lib/site";
import SiteLink from "../../../components/SiteLink";
import { ArrowLeft, ArrowUpRight, Clock } from "lucide-react";
import CoverArt from "../../../components/CoverArt";
import { posts } from "../../../data/blog";
import { profile } from "../../../data/profile";
import { BASE_PATH, asset } from "../../../lib/site";

export function postMetadata(post: (typeof posts)[number]): Metadata {
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { type: "article", title: post.title, description: post.excerpt, publishedTime: post.date },
  };
}

const fmt = (d: string) => new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

export default async function PostPage(post: (typeof posts)[number]) {
  const { marked } = await import("marked");
  // Root-relative markdown links need the base path on project-site deployments.
  const html = (await marked.parse(post.body.trim())).replace(/(href|src)="\/(?!\/)/g, `$1="${BASE_PATH}/`);
  const others = posts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <section className="page-hero">
        <div className="container article">
          <ol className="crumbs" aria-label="Breadcrumb">
            <li>
              <SiteLink href="/">Home</SiteLink>
            </li>
            <li>
              <SiteLink href="/blog/">Blog</SiteLink>
            </li>
            <li aria-current="page">{post.category}</li>
          </ol>
          <div className="post-meta">
            <span className="cat">{post.category}</span>
            <span>{fmt(post.date)}</span>
            <span style={{ display: "inline-flex", gap: 6, alignItems: "center" }}>
              <Clock size={15} /> {post.readTime}
            </span>
          </div>
          <h1 style={{ fontSize: "clamp(36px, 5vw, 60px)", lineHeight: 1.1 }}>{post.title}</h1>
          <p>{post.excerpt}</p>
        </div>
      </section>
      <section className="section-sm">
        <article className="container article">
          <CoverArt variant={post.cover} />
          <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />
          <div className="panel" style={{ display: "flex", gap: 20, alignItems: "center", marginTop: 56, flexWrap: "wrap" }}>
            <img src={asset(profile.photoSquare)} alt="" width={72} height={72} style={{ borderRadius: "50%", width: 72, height: 72, objectFit: "cover" }} />
            <div style={{ flex: 1, minWidth: 220 }}>
              <strong style={{ color: "var(--text)", fontSize: 18 }}>{profile.fullName}</strong>
              <p style={{ margin: 0, fontSize: 15 }}>
                {profile.role}, {profile.affiliation}. Head of the WINS Research Center.
              </p>
            </div>
            <SiteLink href="/contact/" className="btn btn-primary">
              Get in touch <ArrowUpRight />
            </SiteLink>
          </div>
          <div style={{ marginTop: 56 }}>
            <h2 style={{ fontSize: 26 }}>More from the blog</h2>
            <div className="grid-2" style={{ marginTop: 20 }}>
              {others.map((o) => (
                <SiteLink key={o.slug} href={`/blog/${o.slug}/`} className="panel" style={{ display: "block", padding: 28 }}>
                  <div className="post-meta" style={{ marginBottom: 8 }}>
                    <span className="cat">{o.category}</span>
                  </div>
                  <h3 style={{ fontSize: 20, margin: 0 }}>{o.title}</h3>
                </SiteLink>
              ))}
            </div>
            <SiteLink href="/blog/" className="link-arrow" style={{ marginTop: 28 }}>
              <ArrowLeft /> Back to all posts
            </SiteLink>
          </div>
        </article>
      </section>
    </>
  );
}
