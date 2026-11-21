import { Download, Search } from "lucide-react";
import { publications, type PubType } from "../lib/pubs";
import PubItem from "./PubItem";

const TOPICS = [
  "AI for Health",
  "6G & Next-Gen Networks",
  "Smart Antennas & Signal Processing",
  "IoT & Sensor Networks",
  "Data, Cloud & Intelligent Systems",
];

type TypeFilter = "all" | PubType;

export default function PublicationsExplorer() {
  const groups = Map.groupBy(publications, (p) => p.year);
  const years = [...groups.entries()].sort(([a], [b]) => b - a);
  const counts = {
    all: publications.length,
    article: publications.filter((p) => p.type === "article").length,
    conference: publications.filter((p) => p.type === "conference").length,
    book: publications.filter((p) => p.type === "book").length,
  };

  const tabs: { key: TypeFilter; label: string }[] = [
    { key: "all", label: "All" },
    { key: "article", label: "Journal Articles" },
    { key: "conference", label: "Conference Papers" },
    { key: "book", label: "Book Chapters" },
  ];

  return (
    <div data-publications>
      <div className="toolbar">
        <div className="toolbar-row">
          <label className="search">
            <Search />
            <input
              type="search"
              placeholder="Search title, co-author, venue or year…"
              className="form-control" data-filter="q"
              aria-label="Search publications"
            />
          </label>
          <select className="form-select select" data-filter="topic" aria-label="Filter by research area">
            <option value="all">All research areas</option>
            {TOPICS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <select className="form-select select" data-filter="index" aria-label="Filter by indexing">
            <option value="all">Any indexing</option>
            <option value="sci">SCI-Expanded</option>
            <option value="scopus">Scopus</option>
            <option value="doi">Has DOI</option>
          </select>
          <select className="form-select select" data-filter="decade" aria-label="Filter by period">
            <option value="all">All years</option>
            <option value="2020">2020 – present</option>
            <option value="2010">2010 – 2019</option>
            <option value="2000">2000 – 2009</option>
            <option value="1990">1990 – 1999</option>
          </select>
        </div>
        <div className="tabs" role="group" aria-label="Publication type">
          {tabs.map((t) => (
            <button
              key={t.key}
              type="button"
              data-type={t.key}
              aria-pressed={t.key === "all"}
              className={`tab${t.key === "all" ? " active" : ""}`}
            >
              {t.label}
              <span className="count">{counts[t.key]}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="results-meta">
        <span aria-live="polite">
          Showing <b style={{ color: "var(--text)" }}><span data-result-count>{publications.length}</span></b> of {publications.length} publications
        </span>
        <span className="d-flex gap-2">
          <button type="button" className="chip-btn" data-clear-filters hidden>Clear filters</button>
          <button className="chip-btn" type="button" data-export-bib>
            <Download /> Export BibTeX
          </button>
        </span>
      </div>

      <div className="empty" data-no-results hidden>
        <h3>No publications match these filters</h3>
        <p>Try a different search term or clear the filters.</p>
        <button className="btn btn-outline" type="button" data-clear-filters>
          Clear filters
        </button>
      </div>
      {years.map(([year, items]) => (
        <section key={year} className="year-group">
          <h2>
            <b>{year}</b> <span data-year-count>{items.length} {items.length === 1 ? "publication" : "publications"}</span>
          </h2>
          {items.map((p) => (
            <PubItem key={p.id} p={p} />
          ))}
        </section>
      ))}
    </div>
  );
}
