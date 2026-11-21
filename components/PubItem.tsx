import { Copy, ExternalLink, Quote, Search } from "lucide-react";
import { bibtex, isSelf, scholarUrl, typeLabel, venueLine, type Publication } from "../lib/pubs";

export default function PubItem({ p, showTopics = true }: { p: Publication; showTopics?: boolean }) {
  const bib = bibtex(p);
  const href = p.doi ? `https://doi.org/${p.doi}` : scholarUrl(p);

  return (
    <article className="pub" data-publication={p.type} data-year={p.year}
      data-search={`${p.title} ${p.authors.join(" ")} ${p.venue} ${p.year}`}
      data-topics={JSON.stringify(p.topics)} data-indexing={JSON.stringify(p.indexing || [])} data-doi={p.doi}>
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
        <button className="chip-btn" type="button" data-cite aria-expanded="false">
          <Quote /> Cite
        </button>
        <button className="chip-btn" type="button" data-copy aria-label={`Copy BibTeX for ${p.title}`}>
          <Copy /> <span>BibTeX</span>
        </button>
      </div>
      <pre hidden className="bib" aria-label={`BibTeX for ${typeLabel[p.type]}`}>
          {bib}
        </pre>
    </article>
  );
}
