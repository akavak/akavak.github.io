import { countByYear } from "../lib/pubs";

/** Stacked bar chart of publications per year (pure CSS, no chart library). */
export default function YearChart() {
  const data = countByYear();
  const max = Math.max(...data.map((d) => d.article + d.conference + d.book));
  return (
    <div>
      <div className="legend">
        <span>
          <i style={{ background: "var(--accent)" }} /> Journal articles
        </span>
        <span>
          <i style={{ background: "color-mix(in srgb, var(--accent) 40%, var(--surface-2))" }} /> Conference papers
        </span>
        <span>
          <i style={{ background: "var(--accent-2)" }} /> Book chapters
        </span>
      </div>
      <div className="chart" role="img" aria-label="Publications per year from 1996 to 2026">
        {data.map((d) => {
          const total = d.article + d.conference + d.book;
          return (
            <div className="bar" key={d.year}>
              <span className="tip">
                {d.year}: {total}
              </span>
              {d.article > 0 && <div className="seg a" style={{ height: `${(d.article / max) * 100}%` }} />}
              {d.conference > 0 && <div className="seg c" style={{ height: `${(d.conference / max) * 100}%` }} />}
              {d.book > 0 && <div className="seg b" style={{ height: `${(d.book / max) * 100}%` }} />}
            </div>
          );
        })}
      </div>
      <div className="chart-axis">
        <span>{data[0].year}</span>
        <span>{data[Math.floor(data.length / 2)].year}</span>
        <span>{data[data.length - 1].year}</span>
      </div>
    </div>
  );
}
