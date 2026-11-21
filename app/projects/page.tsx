import type { Metadata } from "../../lib/site";
import Link from "../../components/SiteLink";
import { ArrowUpRight, ExternalLink, Lightbulb } from "lucide-react";
import PageHero from "../../components/PageHero";
import Reveal from "../../components/Reveal";
import Counter from "../../components/Counter";
import CoverArt from "../../components/CoverArt";
import { patents, projects } from "../../data/projects";

export const metadata: Metadata = {
  title: "Projects & Patents",
  description:
    "Funded research projects (TÜSEB, TÜBİTAK, BAP and industry) and US patents of Prof. Dr. Adnan Kavak, from 3G smart antennas to AI-assisted diabetes care.",
};

export default function ProjectsPage() {
  const [lead, ...rest] = projects;
  const pi = projects.filter((p) => p.role === "Principal Investigator").length;
  const tubitak = projects.filter((p) => p.funder.includes("TÜBİTAK")).length;
  return (
    <>
      <PageHero
        crumb="Projects"
        eyebrow="Funded Research"
        title={
          <>
            Projects &amp; <span className="serif accent">patents</span>
          </>
        }
        intro="Research supported by TÜSEB, TÜBİTAK, Kocaeli University BAP and industry partners, plus inventions from my years at Samsung Telecommunications America."
      />

      <section className="section-sm">
        <div className="container">
          <div className="grid-4" style={{ marginBottom: 56 }}>
            {[
              { v: projects.length, l: "Funded projects listed" },
              { v: pi, l: "As Principal Investigator" },
              { v: tubitak, l: "TÜBİTAK projects" },
              { v: patents.length, l: "US patents & applications" },
            ].map((b, i) => (
              <Reveal key={b.l} delay={i * 0.05}>
                <div className="metric-box">
                  <div className="num">
                    <Counter value={b.v} />
                  </div>
                  <div className="lbl">{b.l}</div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <article className="project-feature">
              <CoverArt variant="health" label="Illustration for the AIDCARE project" />
              <div className="body">
                <div className="tags" style={{ marginTop: 0, marginBottom: 18 }}>
                  <span className="tag hl">Current flagship</span>
                  <span className="tag">{lead.funder}</span>
                  <span className="tag">{lead.period}</span>
                </div>
                <h3>{lead.title}</h3>
                <p>{lead.summary}</p>
                <p style={{ fontSize: 15 }}>
                  <strong style={{ color: "var(--text)" }}>Team:</strong> {lead.team?.join(", ")}
                </p>
                <Link href="/blog/aidcare-ai-assistant-for-diabetes/" className="link-arrow">
                  Read about AIDCARE <ArrowUpRight />
                </Link>
              </div>
            </article>
          </Reveal>

          <div className="grid-3">
            {rest.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 0.06}>
                <article className="project-card">
                  <div className="top">
                    <span className={`tag${p.role === "Principal Investigator" ? " hl" : ""}`}>{p.role === "Principal Investigator" ? "PI" : "Researcher"}</span>
                    <span style={{ fontSize: 14, fontWeight: 700 }}>{p.period}</span>
                  </div>
                  <h3>{p.title}</h3>
                  {p.original && <div className="orig">{p.original}</div>}
                  <p>{p.summary}</p>
                  <div className="foot">
                    <span>
                      <b>{p.funder}</b>
                      {p.program && p.program !== p.funder ? ` · ${p.program}` : ""}
                    </span>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt" id="patents">
        <div className="container">
          <div className="section-head">
            <Reveal>
              <span className="eyebrow">Intellectual Property</span>
              <h2>
                United States <span className="serif accent">patents</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p>Inventions in adaptive antenna arrays and CDMA base station signal processing.</p>
            </Reveal>
          </div>
          <div className="award-list">
            {patents.map((p, i) => (
              <Reveal key={p.number} delay={i * 0.05}>
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="award">
                  <span className="ic">
                    <Lightbulb />
                  </span>
                  <div>
                    <span className="year">{p.year}</span>
                    <h3>{p.number}</h3>
                    <span className="org">{p.number.includes("A1") ? "Published application" : "Granted patent"}</span>
                  </div>
                  <p>{p.title}</p>
                  <span className="label" style={{ display: "inline-flex", gap: 6, alignItems: "center" }}>
                    View <ExternalLink size={14} />
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

