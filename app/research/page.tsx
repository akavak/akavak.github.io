import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import AreaIcon from "@/components/AreaIcon";
import Counter from "@/components/Counter";
import PubItem from "@/components/PubItem";
import { researchAreas, wins } from "@/data/profile";
import { projects } from "@/data/projects";
import { publications } from "@/lib/pubs";
import { asset } from "@/lib/site";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Research areas of Prof. Dr. Adnan Kavak and the WINS Research Center at Kocaeli University: AI for digital health, 6G networks, smart antennas, IoT and intelligent systems.",
};

function initials(name: string) {
  return name
    .replace(/^Prof\. Dr\. /, "")
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function ResearchPage() {
  return (
    <>
      <PageHero
        crumb="Research"
        eyebrow="Research Areas"
        title={
          <>
            Research <span className="serif accent">themes</span>
          </>
        }
        intro="My group studies how to make wireless networks and AI systems more intelligent, efficient and trustworthy, and how to apply them where they matter most: people's health."
      />

      {researchAreas.map((a, i) => {
        const pubs = publications.filter((p) => p.topics.includes(a.key));
        const projs = projects.filter((p) => p.area === a.key);
        const recent = pubs.slice().sort((x, y) => y.year - x.year).slice(0, 3);
        const span = pubs.length ? `${Math.min(...pubs.map((p) => p.year))} – ${Math.max(...pubs.map((p) => p.year))}` : "";
        return (
          <section key={a.key} id={a.key.toLowerCase().replace(/[^a-z0-9]+/g, "-")} className={`section${i % 2 ? " section-alt" : ""}`}>
            <div className="container">
              <div className="about-grid" style={{ alignItems: "start", marginBottom: 40 }}>
                <Reveal>
                  <span className="eyebrow">Theme 0{i + 1}</span>
                  <h2 className="h2" style={{ marginBottom: 22, display: "flex", gap: 18, alignItems: "center" }}>
                    <span className="card" style={{ padding: 0, border: 0, background: "none" }}>
                      <span className="ic" style={{ margin: 0 }}>
                        <AreaIcon name={a.icon} />
                      </span>
                    </span>
                    {a.title}
                  </h2>
                  <p style={{ fontSize: 19 }}>{a.text}</p>
                  <Link href={`/publications/?topic=${encodeURIComponent(a.key)}`} className="link-arrow" style={{ marginTop: 12 }}>
                    All {pubs.length} publications in this area <ArrowUpRight />
                  </Link>
                </Reveal>
                <Reveal delay={0.1}>
                  <div className="grid-3">
                    <div className="metric-box">
                      <div className="num">
                        <Counter value={pubs.length} />
                      </div>
                      <div className="lbl">Publications</div>
                    </div>
                    <div className="metric-box">
                      <div className="num">
                        <Counter value={projs.length} />
                      </div>
                      <div className="lbl">Funded projects</div>
                    </div>
                    <div className="metric-box">
                      <div className="num" style={{ fontSize: 26, lineHeight: 1.35 }}>
                        {span}
                      </div>
                      <div className="lbl">Active years</div>
                    </div>
                  </div>
                  {projs.length > 0 && (
                    <div className="panel" style={{ marginTop: 24, padding: 28 }}>
                      <h3 style={{ fontSize: 18, marginBottom: 12 }}>Related projects</h3>
                      <ul style={{ margin: 0, paddingLeft: 18, fontSize: 15 }}>
                        {projs.slice(0, 4).map((p) => (
                          <li key={p.slug} style={{ marginBottom: 6 }}>
                            <span style={{ color: "var(--text)" }}>{p.title}</span> · {p.period}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </Reveal>
              </div>
              <div className="pub-list">
                {recent.map((p) => (
                  <PubItem key={p.id} p={p} showTopics={false} />
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* WINS */}
      <section id="wins" className="section" style={{ borderTop: "1px solid var(--line)" }}>
        <div className="container">
          <div className="about-grid" style={{ alignItems: "center", marginBottom: 64 }}>
            <Reveal>
              <span className="eyebrow">Research Group</span>
              <h2 className="h2" style={{ marginBottom: 24 }}>
                {wins.short}: <span className="serif accent">{wins.name}</span>
              </h2>
              {wins.about.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <div className="tags" style={{ margin: "20px 0 30px" }}>
                {wins.topics.map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>
              <a href={wins.url} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                WINS on AVESIS <ExternalLink />
              </a>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="panel" style={{ display: "grid", placeItems: "center", padding: 56 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={asset(wins.logo)} alt="WINS Research Center logo" width={260} height={211} style={{ maxWidth: 260, width: "100%", height: "auto" }} />
                <div className="grid-4" style={{ marginTop: 40, width: "100%", gap: 12 }}>
                  {wins.stats.map((s) => (
                    <div key={s.label} style={{ textAlign: "center" }}>
                      <div style={{ fontSize: 30, fontWeight: 800, color: "var(--text)" }}>
                        <Counter value={s.value} />
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {(["Faculty", "Researchers", "Collaborators"] as const).map((g) => (
            <div key={g} style={{ marginBottom: 40 }}>
              <Reveal>
                <h3 style={{ fontSize: 15, textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--text-3)", marginBottom: 18 }}>
                  {g === "Collaborators" ? "Visiting Researchers" : g === "Researchers" ? "Postdocs & PhD Students" : "Faculty Members"}
                </h3>
              </Reveal>
              <div className="team-grid">
                {wins.members
                  .filter((m) => m.group === g)
                  .map((m, i) => (
                    <Reveal key={m.name} delay={i * 0.04}>
                      <div className={`member${m.role === "Group Head" ? " lead" : ""}`}>
                        <span className="avatar">{initials(m.name)}</span>
                        <div>
                          <h4>{m.name}</h4>
                          <small>{m.role}</small>
                        </div>
                      </div>
                    </Reveal>
                  ))}
              </div>
            </div>
          ))}

          <Reveal>
            <div className="cta-band" style={{ marginTop: 40 }}>
              <span className="ring" aria-hidden="true" />
              <h2>
                Join <span className="serif">WINS</span>
              </h2>
              <div>
                <p>
                  We welcome motivated M.Sc. and Ph.D. applicants, postdoctoral researchers and visiting scholars interested
                  in 6G, medical AI and intelligent systems.
                </p>
                <Link href="/contact/?subject=Prospective%20student" className="btn">
                  Apply / Enquire <ArrowUpRight />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
