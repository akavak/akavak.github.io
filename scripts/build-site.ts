import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { basename, dirname, join } from "node:path";
import { createElement, type ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import * as home from "../app/page";
import * as about from "../app/about/page";
import * as research from "../app/research/page";
import * as publications from "../app/publications/page";
import * as projects from "../app/projects/page";
import * as awards from "../app/awards/page";
import * as blog from "../app/blog/page";
import * as contact from "../app/contact/page";
import PostPage, { postMetadata } from "../app/blog/[slug]/page";
import Layout from "../app/layout";
import NotFound from "../app/not-found";
import { posts } from "../data/blog";
import { SITE_URL, type Metadata } from "../lib/site";

type PageModule = { default: () => ReactNode; metadata?: Metadata };

const pages: [string, PageModule][] = [
  ["/", home],
  ["/about/", about],
  ["/research/", research],
  ["/publications/", publications],
  ["/projects/", projects],
  ["/awards/", awards],
  ["/blog/", blog],
  ["/contact/", contact],
];

const output = "out";

async function save(filename: string, content: string) {
  const destination = join(output, filename);
  await mkdir(dirname(destination), { recursive: true });
  await writeFile(destination, content);
}

async function writePage(route: string, children: ReactNode, metadata: Metadata = {}) {
  const html = renderToStaticMarkup(createElement(Layout, { route, metadata, children }));
  const filename = route.endsWith("/") ? route.slice(1) + "index.html" : route.slice(1);
  await save(filename, "<!doctype html>" + html + "\n");
}

function xmlText(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

async function build() {
  await rm(output, { recursive: true, force: true });
  await cp("public", output, { recursive: true, filter: (file) => basename(file) !== ".DS_Store" });

  for (const [route, page] of pages) {
    await writePage(route, createElement(page.default), page.metadata);
  }
  for (const post of posts) {
    await writePage(`/blog/${post.slug}/`, await PostPage(post), postMetadata(post));
  }
  await writePage("/404.html", createElement(NotFound), { title: "Page not found" });

  const entries = pages.map(([route]) => `  <url><loc>${xmlText(SITE_URL + route)}</loc></url>`);
  for (const post of posts) {
    entries.push(`  <url><loc>${xmlText(SITE_URL + "/blog/" + post.slug + "/")}</loc><lastmod>${post.date}</lastmod></url>`);
  }
  await save("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join("\n")}\n</urlset>\n`);
  await save("robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
  console.log(`Built ${pages.length + posts.length + 1} static HTML pages in ${output}/.`);
}

build().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
