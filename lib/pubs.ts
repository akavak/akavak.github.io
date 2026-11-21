import raw from "@/data/publications.json";

export type PubType = "article" | "conference" | "book";

export type Publication = {
  id: string;
  type: PubType;
  title: string;
  authors: string[];
  year: number;
  venue: string;
  volume?: string;
  issue?: string;
  pages?: string;
  indexing?: string[];
  format?: string;
  doi?: string;
  topics: string[];
};

export const publications = raw as Publication[];

export const typeLabel: Record<PubType, string> = {
  article: "Journal Article",
  conference: "Conference Paper",
  book: "Book Chapter",
};

export function isSelf(author: string) {
  return /^kavak a\.?$/i.test(author.trim());
}

export function venueLine(p: Publication) {
  const bits: string[] = [p.venue];
  if (p.type === "article") {
    if (p.volume) bits.push(`vol. ${p.volume}`);
    if (p.issue) bits.push(`no. ${p.issue}`);
  }
  if (p.pages) bits.push(`pp. ${p.pages}`);
  return bits.join(", ");
}

export function scholarUrl(p: Publication) {
  return `https://scholar.google.com/scholar?q=${encodeURIComponent(`"${p.title}"`)}`;
}

function bibAuthor(a: string) {
  // "Küçük K." -> "Küçük, K."
  const m = a.match(/^(.*?)\s+((?:[A-ZÇĞİÖŞÜ]\.\s?)+)$/);
  return m ? `${m[1]}, ${m[2].trim()}` : a;
}

export function bibtex(p: Publication) {
  const first = (p.authors[0] || "kavak").split(" ")[0].toLowerCase().normalize("NFD").replace(/[^a-z]/g, "");
  const word = p.title.split(/\s+/).find((w) => w.length > 3)?.toLowerCase().replace(/[^a-z]/g, "") || "paper";
  const key = `${first}${p.year}${word}`;
  const kind = p.type === "article" ? "article" : p.type === "conference" ? "inproceedings" : "incollection";
  const venueField = p.type === "article" ? "journal" : "booktitle";
  const fields: [string, string | undefined][] = [
    ["title", `{${p.title}}`],
    ["author", p.authors.filter((a) => a !== "et al.").map(bibAuthor).join(" and ")],
    [venueField, p.venue.split(",")[0]],
    ["year", String(p.year)],
    ["volume", p.volume || undefined],
    ["number", p.issue || undefined],
    ["pages", p.pages ? p.pages.replace("-", "--") : undefined],
    ["doi", p.doi],
  ];
  const body = fields
    .filter(([, v]) => v)
    .map(([k, v]) => `  ${k} = {${v}}`)
    .join(",\n");
  return `@${kind}{${key},\n${body}\n}`;
}

export function countByYear() {
  const map = new Map<number, { article: number; conference: number; book: number }>();
  for (const p of publications) {
    const e = map.get(p.year) || { article: 0, conference: 0, book: 0 };
    e[p.type] += 1;
    map.set(p.year, e);
  }
  const years = [...map.keys()];
  const min = Math.min(...years);
  const max = Math.max(...years);
  const out = [];
  for (let y = min; y <= max; y++) out.push({ year: y, ...(map.get(y) || { article: 0, conference: 0, book: 0 }) });
  return out;
}

export const stats = {
  total: publications.length,
  articles: publications.filter((p) => p.type === "article").length,
  conferences: publications.filter((p) => p.type === "conference").length,
  books: publications.filter((p) => p.type === "book").length,
  sci: publications.filter((p) => p.indexing?.includes("SCI-Expanded")).length,
  scopus: publications.filter((p) => p.indexing?.includes("Scopus")).length,
};

// Hand-picked highlights for the home page (ids from data/publications.json).
export const featuredIds = ["a009", "a003", "a001", "a007", "a025", "a057", "a065", "a067"];
export const featured = featuredIds
  .map((id) => publications.find((p) => p.id === id))
  .filter(Boolean) as Publication[];
