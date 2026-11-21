# adnankavak.github.io

Academic portfolio of **Prof. Dr. Adnan Kavak** (Kocaeli University). It is built with Next.js 15 and exported as a static site for GitHub Pages. It has dark and light themes and works on desktop and mobile.

## Pages

| Route | Content |
| --- | --- |
| `/` | Hero, metrics, research themes, selected publications, projects, timeline, recognition, WINS, blog, call to action |
| `/about/` | Biography, citation metrics, education, positions, administrative roles, industry experience, service |
| `/research/` | Five research themes with stats and recent papers; the WINS Research Center and its team |
| `/publications/` | All 160 publications with search, filters, DOI links, BibTeX copy and `.bib` export |
| `/projects/` | Funded projects and US patents |
| `/awards/` | Grants, patents, editorial and leadership recognition |
| `/blog/` | Markdown blog posts |
| `/contact/` | Contact details, a mailto contact form and a map |

## Project structure

```text
app/            Pages (Next.js App Router) and global styles
components/     Shared UI components
data/           All site content (edit these to update the site)
lib/            Publication helpers and deployment settings (base path, site URL)
public/         Static files: images, favicon, downloadable CV
CV/adnan-kavak/ LaTeX source of the CV (Awesome-CV, academic edition)
scripts/        Data tools: CV text parser and CV publication generator
.github/        GitHub Pages deployment workflow
```

## Editing content

All content lives in `data/`. No page code needs to change.

| File | Content |
| --- | --- |
| `data/profile.ts` | Bio, contact details, metrics, education, positions, service, WINS members, navigation |
| `data/projects.ts` | Funded projects and patents |
| `data/awards.ts` | Awards and recognition (add new items at the top) |
| `data/blog.ts` | Blog posts (Markdown in `body`; add new posts at the top) |
| `data/publications.json` | Publication list (generated, see below) |
| `lib/pubs.ts` → `featuredIds` | Papers shown on the home page |
| `public/images/` | `adnan-kavak.jpg` (4:5 portrait) and `adnan-kavak-square.jpg` (author card and link previews) |
| `public/files/Adnan-Kavak-CV.pdf` | Downloadable CV (built from `CV/adnan-kavak/`) |

## Commands

```bash
npm install                # install dependencies (Node 18.18+, CI uses Node 20)
npm run dev                # development server with hot reload: http://localhost:3000
npm start                  # production build + serve it: http://localhost:3000
npm run build              # production static export to ./out
npm run preview            # serve an existing ./out build
npm run typecheck          # TypeScript check
npm run cv                 # rebuild the CV PDF into public/files/ (requires Tectonic)
npm run data:publications  # regenerate data/publications.json from scripts/cv_clean.txt
```

`npm run dev` uses its own `.next-dev/` folder, so you can run a production build while the dev server is running. To serve on another port, run `npm start -- -l 4000`.

### Updating publications

1. Add new papers by updating `scripts/cv_clean.txt` from a newer AVESIS CV export (`https://avesis.kocaeli.edu.tr/akavak/indir?languageCode=en`).
2. Add DOIs to `scripts/dois.txt` as `Title prefix|10.xxxx/yyyy`.
3. Run `npm run data:publications`, then `npm run cv`, so the website and the CV stay in sync.

## Deployment (GitHub Pages)

> **New to GitHub?** Follow the step-by-step guide in [DEPLOY_TO_GITHUB_PAGES.md](DEPLOY_TO_GITHUB_PAGES.md): creating the repository, uploading the code, turning on Pages, updating the site, and troubleshooting.

`.github/workflows/deploy.yml` builds and publishes the site on every push to `main`. It works with any repository name:

| Repository | Site URL |
| --- | --- |
| `adnankavak/adnankavak.github.io` (user site) | `https://adnankavak.github.io/` |
| `<account>/<any-repo>` (project site) | `https://<account>.github.io/<any-repo>/` |
| Either one with a custom domain | `https://your-domain/` |

The workflow reads the base path and URL from `actions/configure-pages` and passes them to the build as `NEXT_PUBLIC_BASE_PATH` and `NEXT_PUBLIC_SITE_URL`.

### First-time setup

1. Create the repository on GitHub. For `https://adnankavak.github.io/`, it must be named **`adnankavak.github.io`** on the **`adnankavak`** account.
2. Push this folder to `main`:

   ```bash
   git init -b main
   git add .
   git commit -m "Initial site"
   git remote add origin https://github.com/<account>/<repo>.git
   git push -u origin main
   ```

3. On GitHub, open **Settings → Pages** and set **Source** to **GitHub Actions**. With "Deploy from a branch", GitHub serves the raw source instead of the built site.
4. Open the **Actions** tab: the *Deploy to GitHub Pages* run shows the live URL. If you pushed before step 3, use **Run workflow** to re-run it.

### Notes for developers

- Use `next/link` (or `components/SiteLink`) for internal pages, and `asset("/path")` from `lib/site.ts` for files in `public/`. Hard-coded `/images/...` paths break on project sites.
- To test a project-site build locally: `NEXT_PUBLIC_BASE_PATH=/my-repo npm run build`, then serve `out/` under `/my-repo/`.
