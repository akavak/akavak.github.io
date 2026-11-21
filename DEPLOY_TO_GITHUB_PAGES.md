# Uploading this website to GitHub Pages

A step-by-step guide to putting this project on GitHub and publishing it as a live website with GitHub Pages. After the one-time setup, every change you push goes live automatically in about two minutes.

**How it works:** you upload the *source code*. A GitHub Actions workflow (`.github/workflows/deploy.yml`, already included) builds the site on GitHub's servers and publishes it. You never upload the `out/` folder yourself.

---

## Contents

1. [Before you start](#1-before-you-start)
2. [Choose the repository name (this decides the URL)](#2-choose-the-repository-name-this-decides-the-url)
3. [Create the repository on GitHub](#3-create-the-repository-on-github)
4. [Turn on GitHub Pages](#4-turn-on-github-pages)
5. [Upload the code](#5-upload-the-code)
6. [Watch the deployment and open the site](#6-watch-the-deployment-and-open-the-site)
7. [Updating the site later](#7-updating-the-site-later)
8. [Optional: custom domain](#8-optional-custom-domain)
9. [Troubleshooting](#9-troubleshooting)

---

## 1. Before you start

You need:

- A **GitHub account**. Sign up at <https://github.com/signup>.
- **Git**, already installed on this Mac. Check with `git --version`.
- A way to sign in to GitHub from the terminal. GitHub no longer accepts your account password for `git push`. Pick one:
  - **GitHub CLI (easiest):**

    ```bash
    brew install gh
    gh auth login      # choose: GitHub.com → HTTPS → Login with a web browser
    ```

  - **Personal access token:** on GitHub, go to **Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token**. Give it access to your repository with **Contents: Read and write**. When `git push` asks for a password, paste the token instead.

Optionally, check that the site builds on your computer first:

```bash
npm install
npm run build      # must end with "✓ Exporting"
```

## 2. Choose the repository name (this decides the URL)

GitHub Pages builds the web address from the **account name** and the **repository name**:

| Account | Repository name | Website address |
| --- | --- | --- |
| `adnankavak` | `adnankavak.github.io` | `https://adnankavak.github.io/` |
| `adnankavak` | `website` | `https://adnankavak.github.io/website/` |
| your account, e.g. `jamil226` | `adnankavak.github.io` | `https://jamil226.github.io/adnankavak.github.io/` |
| your account | `adnan-kavak` | `https://jamil226.github.io/adnan-kavak/` |

- To get the clean address `https://adnankavak.github.io/`, the repository **must** be named exactly `adnankavak.github.io` and live on a GitHub account (or organization) **named `adnankavak`**. Create that account for Prof. Kavak, or ask him to add you as a collaborator on his.
- Any other combination still works. The site detects its address automatically, so all links, images and the CV download keep working. Only the URL is longer.
- You can also connect your own domain later (see [section 8](#8-optional-custom-domain)).

## 3. Create the repository on GitHub

1. Sign in to GitHub as the account that should own the site.
2. Click **+** (top right) → **New repository**.
3. **Repository name:** as chosen in step 2, e.g. `adnankavak.github.io`.
4. **Visibility:** **Public**. GitHub Pages is free for public repositories; private repositories need a paid plan.
5. **Do not** tick *Add a README*, *.gitignore* or *license*. This project already has them, and an extra first commit on GitHub would make your first push fail.
6. Click **Create repository**. Keep the page open; you'll need its URL, e.g. `https://github.com/adnankavak/adnankavak.github.io.git`.

## 4. Turn on GitHub Pages

Do this **before** the first upload, otherwise the first deployment fails (see [Troubleshooting](#9-troubleshooting)).

1. In the new repository, open **Settings → Pages** (left sidebar, under *Code and automation*).
2. Under **Build and deployment → Source**, choose **GitHub Actions**.

That's all; there's nothing to save. Do **not** choose *Deploy from a branch*: that publishes the raw source code instead of the built website.

## 5. Upload the code

Open Terminal in the project folder:

```bash
cd ~/Desktop/Jamil/Development/adnankavak.github.io
```

Then run these commands one by one. Replace the URL in the `git remote` line with your repository's URL from step 3.

```bash
# 1. Start version control on the "main" branch.
#    "-b main" matters: the deploy workflow only runs for the main branch.
git init -b main

# 2. Stage all files. .gitignore automatically leaves out node_modules,
#    build folders, the original WhatsApp photo and other local-only files.
git add .

# 3. Check what will be uploaded (about 70 files; no node_modules, .next or out).
git status

# 4. Save the snapshot.
git commit -m "Initial version of Prof. Dr. Adnan Kavak's website"

# 5. Connect to GitHub (use YOUR repository URL).
git remote add origin https://github.com/adnankavak/adnankavak.github.io.git

# 6. Upload.
git push -u origin main
```

If `git push` asks for a username and password, enter your GitHub username and, **as the password, your personal access token** (from section 1). If you used `gh auth login`, it won't ask.

> **Already ran `git init` without `-b main`?** Rename the branch before pushing: `git branch -M main`.

## 6. Watch the deployment and open the site

1. On GitHub, open the repository's **Actions** tab. A run called **Deploy to GitHub Pages** starts automatically after the push.
2. It has two jobs, **build** and **deploy**. Wait until both show a green ✓ (about 1–3 minutes).
3. Click the run; the **deploy** box shows the website link. It's also under **Settings → Pages** ("Your site is live at …").
4. Open the link and check a few pages, the photo, and the **Download CV** button.

The first deployment can take a few extra minutes to appear. If you see a 404 right away, wait a minute and refresh.

## 7. Updating the site later

Edit the files (most content is in `data/`; see the main [README](README.md)), check locally, then push:

```bash
npm run dev                 # preview while editing: http://localhost:3000
npm run build               # make sure the production build still works

git add .
git commit -m "Describe what you changed"
git push
```

Every push to `main` redeploys the site automatically. To redeploy without changes, open **Actions → Deploy to GitHub Pages → Run workflow**.

If you changed the CV, rebuild the PDF before committing: `npm run cv` (requires Tectonic: `brew install tectonic`).

## 8. Optional: custom domain

To use an address like `https://www.adnankavak.com`:

1. Buy the domain from any registrar.
2. In the repository, go to **Settings → Pages → Custom domain**, enter the domain and click **Save**.
3. At your registrar, add the DNS records GitHub shows. For a `www` address, that's a `CNAME` record pointing to `<account>.github.io`. Full instructions: <https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site>.
4. After DNS works (minutes to a day), tick **Enforce HTTPS**.
5. Re-run the workflow (**Actions → Run workflow**) so the site picks up its new address.

## 9. Troubleshooting

| What you see | Cause | Fix |
| --- | --- | --- |
| Actions run fails at **Configure GitHub Pages** with *"Get Pages site failed"* | Pages isn't enabled, or is set to "Deploy from a branch" | Do [step 4](#4-turn-on-github-pages), then **Actions → Deploy to GitHub Pages → Run workflow** |
| No run appears in the **Actions** tab after pushing | Code was pushed to `master`, not `main` | `git branch -M main` then `git push -u origin main` |
| Deploy fails with *"Branch … is not allowed to deploy to github-pages due to environment protection rules"* | The `github-pages` environment only allows another branch | **Settings → Environments → github-pages** → allow `main` under *Deployment branches* |
| `git push` is rejected: *"Updates were rejected because the remote contains work…"* | The repository was created with a README or license | Run `git pull origin main --allow-unrelated-histories`, then `git push`. Or delete and recreate the repository without those boxes ticked |
| `git push`: *"Authentication failed"* / *"Password authentication is not supported"* | GitHub rejects account passwords | Use `gh auth login`, or paste a personal access token as the password ([section 1](#1-before-you-start)) |
| `git push`: *"Permission denied … 403"* | You're signed in as an account without access to that repository | Ask the owner to add you as a collaborator, or sign in as the owner |
| Site shows **only the README** or raw code | Pages source is "Deploy from a branch" | **Settings → Pages → Source → GitHub Actions**, then re-run the workflow |
| Site is **unstyled** (plain text, no colours) | An old build from before the base-path fix, or a cached page | Re-run the workflow, then hard-refresh the browser (**Cmd+Shift+R**) |
| **404** on the site right after the first deploy | GitHub is still publishing | Wait 1–5 minutes and refresh |
| Build fails at **Install dependencies** (`npm ci`) | `package.json` and `package-lock.json` are out of sync | Run `npm install` locally, commit `package-lock.json`, push |
| Build fails at **Verify export** | A required file (for example the CV PDF) is missing | Make sure `public/files/Adnan-Kavak-CV.pdf` exists (`npm run cv`) and is committed |
| Changes don't show up | Browser cache | Hard-refresh (**Cmd+Shift+R**) or open the site in a private window |

To see the exact error, open **Actions**, click the failed run, click the red job, and expand the step with the ✗.

---

### What gets uploaded, and what doesn't

`.gitignore` keeps these **off GitHub** automatically:

- `node_modules/`, `.next/`, `.next-dev/`, `out/`: downloaded or generated; GitHub rebuilds them.
- Original phone photos (`WhatsApp Image *`, `*.heic`), which can contain location metadata.
- LaTeX build files and the intermediate CV PDF. The published CV is `public/files/Adnan-Kavak-CV.pdf`, which **is** uploaded.
- `.DS_Store` and Office lock files (`~$*`).

Before your first `git commit`, `git status` shows exactly which files will be uploaded. Never upload passwords, tokens or private documents. Everything in a public repository is visible to anyone.
