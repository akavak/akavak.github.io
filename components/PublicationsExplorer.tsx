"use client";

import { useEffect, useMemo, useState } from "react";
import { Download, Search } from "lucide-react";
import { bibtex, publications, type PubType } from "@/lib/pubs";
import PubItem from "./PubItem";

const TOPICS = [
  "AI for Health",
  "6G & Next-Gen Networks",
  "Smart Antennas & Signal Processing",
  "IoT & Sensor Networks",
  "Data, Cloud & Intelligent Systems",
];

type TypeFilter = "all" | PubType;

function fold(s: string) {
  return s
    .toLocaleLowerCase("tr")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/ı/g, "i");
}

export default function PublicationsExplorer() {
  const [q, setQ] = useState("");
  const [type, setType] = useState<TypeFilter>("all");
  const [topic, setTopic] = useState("all");
  const [index, setIndex] = useState("all");
  const [decade, setDecade] = useState("all");

  // Allow deep links such as /publications/?topic=AI%20for%20Health or ?type=article
  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    const t = sp.get("type");
    if (t === "article" || t === "conference" || t === "book") setType(t);
    const tp = sp.get("topic");
    if (tp && TOPICS.includes(tp)) setTopic(tp);
    const s = sp.get("q");
    if (s) setQ(s);
  }, []);

  const filtered = useMemo(() => {
    const f = fold(q.trim());
    return publications.filter((p) => {
      if (type !== "all" && p.type !== type) return false;
      if (topic !== "all" && !p.topics.includes(topic)) return false;
      if (index === "sci" && !p.indexing?.includes("SCI-Expanded")) return false;
      if (index === "scopus" && !p.indexing?.includes("Scopus")) return false;
      if (index === "doi" && !p.doi) return false;
      if (decade !== "all") {
        const d = Number(decade);
        if (p.year < d || p.year >= d + 10) return false;
      }
      if (!f) return true;
      return fold(`${p.title} ${p.authors.join(" ")} ${p.venue} ${p.year}`).includes(f);
    });
  }, [q, type, topic, index, decade]);

  const groups = useMemo(() => {
    const m = new Map<number, typeof filtered>();
    for (const p of filtered) {
      const arr = m.get(p.year) || [];
      arr.push(p);
      m.set(p.year, arr);
    }
    return [...m.entries()].sort((a, b) => b[0] - a[0]);
  }, [filtered]);

  const counts = {
    all: publications.length,
    article: publications.filter((p) => p.type === "article").length,
    conference: publications.filter((p) => p.type === "conference").length,
    book: publications.filter((p) => p.type === "book").length,
  };

  const exportBib = () => {
    const blob = new Blob([filtered.map(bibtex).join("\n\n")], { type: "application/x-bibtex" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "kavak-publications.bib";
    a.click();
    URL.revokeObjectURL(url);
  };

  const reset = () => {
    setQ("");
    setType("all");
    setTopic("all");
    setIndex("all");
    setDecade("all");
  };

  const tabs: { key: TypeFilter; label: string }[] = [
    { key: "all", label: "All" },
    { key: "article", label: "Journal Articles" },
    { key: "conference", label: "Conference Papers" },
    { key: "book", label: "Book Chapters" },
  ];

  return (
    <div>
      <div className="toolbar">
        <div className="toolbar-row">
          <label className="search">
            <Search />
            <input
              type="search"
              placeholder="Search title, co-author, venue or year…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              aria-label="Search publications"
            />
          </label>
          <select className="select" value={topic} onChange={(e) => setTopic(e.target.value)} aria-label="Filter by research area">
            <option value="all">All research areas</option>
            {TOPICS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <select className="select" value={index} onChange={(e) => setIndex(e.target.value)} aria-label="Filter by indexing">
            <option value="all">Any indexing</option>
            <option value="sci">SCI-Expanded</option>
            <option value="scopus">Scopus</option>
            <option value="doi">Has DOI</option>
          </select>
          <select className="select" value={decade} onChange={(e) => setDecade(e.target.value)} aria-label="Filter by period">
            <option value="all">All years</option>
            <option value="2020">2020 – present</option>
            <option value="2010">2010 – 2019</option>
            <option value="2000">2000 – 2009</option>
            <option value="1990">1990 – 1999</option>
          </select>
        </div>
        <div className="tabs" role="tablist" aria-label="Publication type">
          {tabs.map((t) => (
            <button
              key={t.key}
              role="tab"
              aria-selected={type === t.key}
              className={`tab${type === t.key ? " active" : ""}`}
              onClick={() => setType(t.key)}
            >
              {t.label}
              <span className="count">{counts[t.key]}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="results-meta">
        <span aria-live="polite">
          Showing <b style={{ color: "var(--text)" }}>{filtered.length}</b> of {publications.length} publications
        </span>
        <span style={{ display: "flex", gap: 8 }}>
          {filtered.length !== publications.length && (
            <button className="chip-btn" onClick={reset}>
              Clear filters
            </button>
          )}
          <button className="chip-btn" onClick={exportBib} disabled={!filtered.length}>
            <Download /> Export BibTeX
          </button>
        </span>
      </div>

      {groups.length === 0 ? (
        <div className="empty">
          <h3>No publications match these filters</h3>
          <p>Try a different search term or clear the filters.</p>
          <button className="btn btn-outline" onClick={reset}>
            Clear filters
          </button>
        </div>
      ) : (
        groups.map(([year, items]) => (
          <section key={year} className="year-group">
            <h2>
              <b>{year}</b> {items.length} {items.length === 1 ? "publication" : "publications"}
            </h2>
            {items.map((p) => (
              <PubItem key={p.id} p={p} />
            ))}
          </section>
        ))
      )}
    </div>
  );
}
