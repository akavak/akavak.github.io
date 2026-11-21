"""Parse the cleaned AVESIS CV text into data/publications.json.

Usage: python3 scripts/parse_cv.py <cv_clean.txt> data/publications.json

The input is the text produced by merging pdftotext (-raw) and PyMuPDF output
of the AVESIS CV export. Re-run this whenever a newer CV export is available.
"""
import json
import re
import sys

ROMAN = r"(?:[IVXLC]+)\."
TR_LOWER = str.maketrans({"İ": "i", "I": "ı"})
KEEP_I = {"SOLAIJA", "DIKMESE", "DIKMESES", "MSONGALELI", "IMAZ"}
ACRONYMS = {
    "IEEE", "IET", "IEEJ", "AEU", "CDMA", "MIMO", "OFDM", "LTE", "LTE-A", "D2D", "V2X", "6G", "5G", "3G",
    "IOT", "IoT", "LLM", "LLMS", "CNN", "MLLM", "VLC-RF", "VLC", "RF", "FPGA", "DSP", "GPS", "UHF", "OVSF",
    "WCDMA", "TDD", "TDD-MIMO", "ISNN", "PT", "SCI", "JAIDA", "B-SCAN", "MGF", "PCA", "SSLE", "OPNET",
    "QRS", "ECG", "IOS", "SDN", "NFV", "QOS", "RAN", "MEC", "3GPP", "IOE", "FFR", "TPC", "NOSQL",
    "INSODE", "ICAT", "SIU", "UBMYK", "ELECO", "WICON", "INISTA", "NCCA", "ICECCO", "MIC-CCA", "ISWPC",
    "ASYU", "ISWCS", "EW", "MIC-CPE", "TIPTEKNO", "ITMAR", "ISAS", "ISTEC", "ICTRC", "MONAMI", "EAI",
    "NAPEX", "ACTS", "RAWCON", "VTC", "CCCT", "IKS", "ICM", "ICSES", "EDERS", "URSI", "BİLTEK", "HABTEKUS",
    "İTUSEM", "LMS", "CM", "AR", "TI", "II", "III", "IV", "XIV", "TR", "UAV", "MISO", "RIS", "AMBC", "AI",
    "IISEC", "3ICT", "CSCN", "ARCSPXP", "ALTHIS", "AIDCARE", "TMS320C6000", "TMS320C6701", "WIMAX",
}


def tr_lower(s: str) -> str:
    return s.translate(TR_LOWER).lower()


def name_case(word: str) -> str:
    """KÜÇÜK -> Küçük, İNNER -> İnner, keep mixed-case words as-is."""
    if not word.isupper() or len(word) <= 1:
        return word
    if word in KEEP_I:
        return word[0] + word[1:].lower()
    return word[0] + tr_lower(word[1:])


def fix_author(a: str) -> str:
    a = a.strip().rstrip(".") + ("." if a.strip().endswith(".") else "")
    parts = a.split(" ")
    out = []
    for p in parts:
        if re.fullmatch(r"[A-ZÇĞİÖŞÜ]\.", p):
            out.append(p)
        else:
            out.append("-".join(name_case(x) for x in p.split("-")))
    # Repair lower-case entries in the export, e.g. "demiray h. e." / "MENTEŞOĞLU m.".
    out = [w.upper() if re.fullmatch(r"[a-zçğıöşü]\.", w) else (w[:1].upper() + w[1:] if w[:1].islower() else w) for w in out]
    name = " ".join(out)
    if name in ("Adnan K.",):
        name = "Kavak A."
    return name


def smart_title(s: str) -> str:
    """Title-case strings that are entirely upper case (journal / venue names)."""
    letters = [c for c in s if c.isalpha()]
    if not letters or sum(c.isupper() for c in letters) / len(letters) < 0.75:
        return s
    small = {"of", "and", "the", "for", "on", "in", "a", "an", "to", "at", "with", "using", "ve", "by", "via"}
    words = s.split(" ")
    res = []
    for i, w in enumerate(words):
        core = re.sub(r"[^\wÇĞİÖŞÜçğıöşü&+-]", "", w)
        if core.upper() in ACRONYMS or core in ACRONYMS or re.search(r"\d", core):
            res.append(w)
            continue
        lw = tr_lower(w) if any(c in w for c in "ÇĞİÖŞÜ") else w.lower()
        if i > 0 and lw in small:
            res.append(lw)
        else:
            res.append("-".join(x[:1].upper() + x[1:] for x in lw.split("-")))
    return " ".join(res)


AUTHOR_TOKEN = r"[A-Za-zÇĞİÖŞÜçğıöşüǧ'’\-]+(?: [A-Za-zÇĞİÖŞÜçğıöşüǧ'’\-]+)?(?: [A-Za-zÇĞİÖŞÜçğıöşü]\.)+"
AUTHOR_LINE = re.compile(rf"^(?:{AUTHOR_TOKEN})(?:,\s*(?:{AUTHOR_TOKEN}|et al\.))*\s*(?:,\s*et al\.)?\s*")


def split_sections(text: str):
    heads = [
        ("articles", r"Articles"),
        ("books", r"Books"),
        ("conference", r"Papers Presented at Peer-Reviewed Scientific Conferences"),
        ("projects", r"Funded Projects"),
        ("patents", r"Patent"),
        ("journals", r"Activities in Scientific Journals"),
    ]
    idx = []
    for key, h in heads:
        m = re.search(rf"(?m){h}(?=\s*I\.|\s*\n|[A-Z])", text)
        idx.append((m.start(), m.end(), key))
    idx.sort()
    out = {}
    for n, (s, e, key) in enumerate(idx):
        end = idx[n + 1][0] if n + 1 < len(idx) else len(text)
        out[key] = text[e:end]
    return out


def split_items(block: str):
    """Split on numerals in strict sequence (I., II., III., ...) so that Roman
    numerals inside venue names (e.g. "III. Haberleşme ...") are not item starts."""
    block = "\n" + block.strip()
    starts = []
    n, pos = 1, 0
    while True:
        m = re.compile(rf"(?:\n|^)\s*{to_roman(n)}\.\s+").search(block, pos)
        if not m:
            break
        starts.append((m.start(), m.end()))
        pos = m.end()
        n += 1
    items = []
    for i, (s, e) in enumerate(starts):
        end = starts[i + 1][0] if i + 1 < len(starts) else len(block)
        items.append(block[e:end].strip())
    return items


def to_roman(n: int) -> str:
    vals = [(100, "C"), (90, "XC"), (50, "L"), (40, "XL"), (10, "X"), (9, "IX"), (5, "V"), (4, "IV"), (1, "I")]
    out = ""
    for v, r in vals:
        while n >= v:
            out += r
            n -= v
    return out


def parse_item(raw: str, kind: str):
    # Fix titles glued to the first author (e.g. "SystemsBAYRAKTAR S.") by breaking the line there.
    raw = re.sub(r"(?<=[a-z])(?=[A-ZÇĞİÖŞÜ][A-Za-zÇĞİÖŞÜçğıöşü]+ [A-ZÇĞİÖŞÜ]\.)", "\n", raw)
    lines = [l.strip() for l in raw.split("\n") if l.strip()]
    best = None
    offset = 0
    joined_parts = []
    for li, line in enumerate(lines):
        am = AUTHOR_LINE.match(line)
        if li > 0 and am and re.search(r"(?i)kavak|adnan k\.", am.group(0)):
            title_part = " ".join(lines[:li])
            best = (len(title_part) + 1, len(title_part) + 1 + am.end())
            break
    if not best:
        raise ValueError(f"No authors found: {' '.join(lines)[:160]}")
    s = " ".join(lines)
    s = re.sub(r"\s+", " ", s)
    title = s[: best[0]].strip()
    authors_str = s[best[0] : best[1]].strip().rstrip(",")
    rest = s[best[1] :].strip()
    authors = [fix_author(a) for a in re.split(r",\s*", authors_str) if a.strip()]
    authors = [a for a in authors if a]
    em = re.match(r",?\s*et al\.\s*", rest)
    if em:
        authors.append("et al.")
        rest = rest[em.end():]

    indexes = []
    m = re.search(r"\(([^()]*)\)\s*$", rest)
    if m:
        inner = m.group(1)
        if re.search(r"SCI|Scopus|TRDizin|Peer|Full Text|Summary Text", inner):
            indexes = [x.strip() for x in inner.split(",") if x.strip()]
            rest = rest[: m.start()].strip().rstrip(",")

    years = re.findall(r"\b(19[89]\d|20[0-3]\d)\b", rest)
    year = int(years[-1]) if years else None

    title = re.sub(r"(?<=[A-Za-z0-9])- (?=[A-Za-z])", "-", title)  # "Next- Generation" -> "Next-Generation"
    entry = {"title": smart_title(title), "authors": authors, "year": year}
    if kind == "article":
        vm = re.match(r"(.*?)(?:,\s*(vol\.[^,]+))?(?:,\s*(no\.[^,]+))?(?:,\s*(pp\.[^,]+))?,\s*\d{4}$", rest)
        venue = vm.group(1) if vm else rest
        entry.update({
            "venue": smart_title(venue.strip()),
            "volume": (vm.group(2) or "").replace("vol.", "") if vm else "",
            "issue": (vm.group(3) or "").replace("no.", "") if vm else "",
            "pages": (vm.group(4) or "").replace("pp.", "") if vm else "",
            "indexing": [i for i in indexes],
        })
    elif kind == "conference":
        pages = ""
        pm = re.search(r",\s*pp\.\s*([\d\-]+)", rest)
        if pm:
            pages = pm.group(1)
        venue = re.sub(r",\s*(vol\.[^,]+|pp\.[^,]+)", "", rest).strip().rstrip(",")
        entry.update({
            "venue": smart_title(venue),
            "pages": pages,
            "format": indexes[0] if indexes else "",
        })
    elif kind == "book":
        entry.update({"venue": rest.removeprefix("in:").strip()})
    return entry


TOPICS = [
    ("AI for Health", r"diabet|medical|nutri|patient|clinical|health|ecg|polyneuropathy|kidney|fall detection|insulin|diagnos|hasta|food"),
    ("6G & Next-Gen Networks", r"6g|5g|v2x|d2d|slic|relay|lte|hetnet|mmwave|mec\b|sdn|backscatter|ambc|cooperative|femtocell|cognitive|vehic|edge|digital twin|cloud-based dynamic|beyond|charging station|ad-hoc"),
    ("Smart Antennas & Signal Processing", r"antenna|anten|beamform|mimo|ovsf|cdma|fpga|dsp|radar|gps|propagation|vector channel|software radio|floating point|ofdm|wimax|adaline|autoregressive|neural network model|hüzme|kanal"),
    ("IoT & Sensor Networks", r"sensor|iot|ioe|vlc|smart home|forest|algılayıcı|beacon|sensing|traffic management|smart cit|medium access|alarm"),
    ("Data, Cloud & Intelligent Systems", r"synchroni|proxy|nosql|data mining|recommend|big data|imputation|cluster|entity framework|data center|captcha|capcha|file system|risk classification|electromagnetic|senkron|dekor|voice and data|tablet|fidan|öneri"),
]


def topics_for(e):
    t = tr_lower(e["title"] + " " + e.get("venue", ""))
    found = [name for name, rx in TOPICS if re.search(rx, t)]
    return found or ["Data, Cloud & Intelligent Systems"]


def norm(t):
    return re.sub(r"[^a-z0-9çğıöşü]", "", tr_lower(t))


def main():
    text = open(sys.argv[1], encoding="utf-8").read()
    # Residual artefacts of the PDF extraction (doubled letter dropped before a space).
    text = re.sub(r"\b([Ww]ireles) s", r"\1s ", text)
    text = text.replace("Committe eMember", "Committee Member").replace("Peer- Reviewed", "Peer-Reviewed")
    text = text.replace("Peer-\nReviewed", "Peer-Reviewed").replace("TEKNOLOJİLERİVEUYGULAMALARI", "TEKNOLOJİLERİ VE UYGULAMALARI")
    # Lower-case i followed by a combining dot above (U+0307) is an extraction artefact.
    text = text.replace("i\u0307", "i").replace("leştiri lmiş", "leştirilmiş").replace("leşti rilmiş", "leştirilmiş")
    text = text.replace("Business es", "Businesses")
    text = re.sub(r"Business\s+es(?=[A-ZÇĞİÖŞÜ\s])", "Businesses\n", text).replace("Anew dynamic", "A new dynamic")
    text = text.replace("†", "").replace("Mathematics,Electronics", "Mathematics, Electronics")
    secs = split_sections(text)
    pubs = []
    for key, kind in (("articles", "article"), ("conference", "conference"), ("books", "book")):
        seen = set()
        for raw in split_items(secs[key]):
            e = parse_item(raw, kind)
            k = (norm(e["title"]), e["year"])
            if k in seen:
                continue
            seen.add(k)
            e["type"] = kind
            e["topics"] = topics_for(e)
            pubs.append(e)
    for p in pubs:
        # ELECO'2003 is listed with an odd date range ending in 2004.
        if "ELECO'2003" in p.get("venue", ""):
            p["year"] = 2003
        p["venue"] = p.get("venue", "").replace("ON“", "ON “").replace("Mühendisligi", "Mühendisliği")
        p["venue"] = smart_title(p["venue"]).replace("Aeu-International", "AEU-International")
    import os
    doi_file = os.path.join(os.path.dirname(os.path.abspath(__file__)), "dois.txt")
    dois = [l.rstrip("\n").split("|") for l in open(doi_file, encoding="utf-8") if "|" in l]
    for p in pubs:
        if p["type"] != "article":
            continue
        for prefix, doi in dois:
            if norm(p["title"]).startswith(norm(prefix)):
                p["doi"] = doi
                break
    pubs.sort(key=lambda p: ({"article": 0, "conference": 1, "book": 2}[p["type"]], -(p["year"] or 0)))
    for n, p in enumerate(pubs):
        p["id"] = f"{p['type'][0]}{n + 1:03d}"
    json.dump(pubs, open(sys.argv[2], "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    from collections import Counter
    print(Counter(p["type"] for p in pubs))


if __name__ == "__main__":
    main()
