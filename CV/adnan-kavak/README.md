# CV: Prof. Dr. Adnan Kavak

Awesome-CV style academic CV (A4, 11 pages). The compiled PDF is published at `public/files/Adnan-Kavak-CV.pdf`, which is the file the website's "Download CV" button serves.

## Build

```bash
# from the repository root: regenerate the publication list, compile, publish
npm run cv
```

Manually, from this folder: `tectonic cv.tex` (or `xelatex cv.tex` twice), then move `cv.pdf` to `public/files/Adnan-Kavak-CV.pdf`.

On Overleaf: upload this folder, set the compiler to XeLaTeX.

## Editing

| File | Content |
| --- | --- |
| `cv.tex` | Header (name, position, contact links), footer, section order |
| `sections/summary.tex` | Profile paragraph |
| `sections/interests.tex` | Research interests |
| `sections/education.tex` | Degrees, dissertations, languages |
| `sections/positions.tex` | Academic positions, administrative roles, industry experience |
| `sections/metrics.tex` | Citation and output metrics |
| `sections/projects.tex` | Funded projects |
| `sections/patents.tex` | US patents |
| `sections/honors.tex` | Grants and recognition (add formal awards at the top) |
| `sections/service.tex` | Editorial and professional service |
| `sections/supervision.tex` | WINS Research Center and graduate supervision |
| `sections/publications.tex` | **Generated, do not edit.** Run `python3 scripts/gen_cv_publications.py` from the repository root |

The publication list comes from `data/publications.json`, the same data the website uses, so the CV and the site always match.

## Layout notes (`awesome-cv.cls`)

- A4 margins: 1.7 cm left/right, 1.4 cm top, 1.9 cm bottom, with the footer inside the bottom margin.
- Entry rows are top-aligned `\parbox`es: titles, locations and dates line up even when text wraps, with no negative-space hacks.
- Honours, patents and service use a fixed 2.3 cm date column, so continuation lines hang under the title.
- Publications use a constant label width (`[J68]`, `[C88]`), so every entry shares the same hanging indent.
- No paragraph indentation anywhere; all vertical spacing is set explicitly.
- Fonts are loaded from the OTF files of the TeX `sourcesanspro` and `roboto` packages, so the output looks the same on Tectonic, TeX Live and Overleaf.
