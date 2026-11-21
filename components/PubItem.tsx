"use client";

import { useState } from "react";
import { Check, Copy, ExternalLink, Quote, Search } from "lucide-react";
import { bibtex, isSelf, scholarUrl, typeLabel, venueLine, type Publication } from "@/lib/pubs";

export default function PubItem({ p, showTopics = true }: { p: Publication; showTopics?: boolean }) {
  const [showBib, setShowBib] = useState(false);
  const [copied, setCopied] = useState(false);
  const bib = bibtex(p);
  const href = p.doi ? `https://doi.org/${p.doi}` : scholarUrl(p);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(bib);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setShowBib(true);
    }
  };

  return (
    <article className="pub">
      <div className="pub-year">
        {p.year}
        <small>{p.type === "article" ? "Journal" : p.type === "conference" ? "Conference" : "Chapter"}</small>
      </div>
      <div>
        <h3>
          <a href={href} target="_blank" rel="noopener noreferrer">
            {p.title}
          </a>
        </h3>
        <div className="authors">
          {p.authors.map((a, i) => (
            <span key={i}>
              {isSelf(a) ? <b>{a}</b> : a}
              {i < p.authors.length - 1 ? ", " : ""}
            </span>
          ))}
        </div>
        <div className="venue">{venueLine(p)}</div>
        <div className="tags">
          {(p.indexing || []).filter((x) => /SCI|Scopus|TRDizin/.test(x)).map((x) => (
            <span key={x} className={`tag${x === "SCI-Expanded" ? " hl" : ""}`}>
              {x === "SCI-Expanded" ? "SCI-E" : x}
            </span>
          ))}
          {showTopics &&
            p.topics.map((t) => (
              <span key={t} className="tag soft">
                {t}
              </span>
            ))}
        </div>
      </div>
      <div className="pub-actions">
        {p.doi ? (
          <a className="chip-btn" href={`https://doi.org/${p.doi}`} target="_blank" rel="noopener noreferrer" aria-label={`DOI for ${p.title}`}>
            <ExternalLink /> DOI
          </a>
        ) : (
          <a className="chip-btn" href={scholarUrl(p)} target="_blank" rel="noopener noreferrer" aria-label={`Find ${p.title} on Google Scholar`}>
            <Search /> Scholar
          </a>
        )}
        <button className="chip-btn" onClick={() => setShowBib((s) => !s)} aria-expanded={showBib}>
          <Quote /> Cite
        </button>
        <button className="chip-btn" onClick={copy} aria-label={`Copy BibTeX for ${p.title}`}>
          {copied ? <Check /> : <Copy />} {copied ? "Copied" : "BibTeX"}
        </button>
      </div>
      {showBib && (
        <pre className="bib" aria-label={`BibTeX for ${typeLabel[p.type]}`}>
          {bib}
        </pre>
      )}
    </article>
  );
}
