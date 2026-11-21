import type { Metadata } from "../../lib/site";
import { ExternalLink } from "lucide-react";
import PageHero from "../../components/PageHero";
import Reveal from "../../components/Reveal";
import Counter from "../../components/Counter";
import YearChart from "../../components/YearChart";
import PublicationsExplorer from "../../components/PublicationsExplorer";
import { citationTable, profile } from "../../data/profile";
import { stats } from "../../lib/pubs";
import { ScholarIcon } from "../../components/BrandIcons";

export const metadata: Metadata = {
  title: "Publications",
  description:
    "Complete list of journal articles, conference papers and book chapters by Prof. Dr. Adnan Kavak, searchable by topic, year and indexing, with DOI links and BibTeX export.",
};

export default function PublicationsPage() {
  const boxes = [
    { v: stats.total, l: "Total publications" },
    { v: stats.articles, l: "Journal articles" },
    { v: stats.sci, l: "SCI-Expanded articles" },
    { v: stats.conferences, l: "Conference papers" },
  ];
  return (
    <>
      <PageHero
        crumb="Publications"
        eyebrow="Scholarly Output"
        title={
          <>
            Publi<span className="serif accent">cations</span>
          </>
        }
        intro="Journal articles, conference papers and book chapters from 1996 to today. Search, filter by research area, open DOIs and export citations in BibTeX."
      />

      <section className="section-sm">
        <div className="container">
          <div className="grid-4" style={{ marginBottom: 24 }}>
            {boxes.map((b, i) => (
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
          <div className="grid-2 grid-chart">
            <Reveal>
              <div className="panel" style={{ height: "100%" }}>
                <h3 style={{ fontSize: 20, marginBottom: 14 }}>Publications per year</h3>
                <YearChart />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="panel" style={{ height: "100%" }}>
                <h3 style={{ fontSize: 20, marginBottom: 6 }}>Citation metrics</h3>
                <table className="citation-table">
                  <thead>
                    <tr>
                      <th>Source</th>
                      <th>Citations</th>
                      <th>h-index</th>
                    <th>i10</th>
                    </tr>
                  </thead>
                  <tbody>
                    {citationTable.map((r) => (
                      <tr key={r.source}>
                        <td>{r.source}</td>
                        <td>{r.citations}</td>
                        <td>{r.hIndex ?? "—"}</td>
                      <td>{r.i10 ?? "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="hero-cta" style={{ margin: "22px 0 0", gap: 10 }}>
                  <a className="chip-btn" href={profile.links.scholar} target="_blank" rel="noopener noreferrer">
                    <ScholarIcon className="" /> Google Scholar
                  </a>
                  <a className="chip-btn" href={`${profile.links.avesis}/yayinlar`} target="_blank" rel="noopener noreferrer">
                    <ExternalLink /> AVESIS
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section style={{ paddingBottom: 120 }}>
        <div className="container">
          <PublicationsExplorer />
        </div>
      </section>
    </>
  );
}
