import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

// Static export for GitHub Pages. The base path is set by the deploy workflow
// (actions/configure-pages) so the site also works from a project repository
// such as https://<account>.github.io/<repo>/. Locally it is empty.
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");

export default function config(phase: string): NextConfig {
  return {
    output: "export",
    trailingSlash: true,
    images: { unoptimized: true },
    basePath: basePath || undefined,
    // `next dev` and `next build` must not share a build folder: running a build
    // while the dev server is up otherwise corrupts it ("Could not find the
    // module ... in the React Client Manifest", HTTP 500).
    distDir: phase === PHASE_DEVELOPMENT_SERVER ? ".next-dev" : ".next",
  };
}
