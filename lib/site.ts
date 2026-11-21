// Deployment settings, injected at build time by .github/workflows/deploy.yml
// (via actions/configure-pages), so the same code works for:
//   - a user site        https://<account>.github.io/            (base path "")
//   - a project site     https://<account>.github.io/<repo>/     (base path "/<repo>")
//   - a custom domain    https://example.com/                    (base path "")
// Local builds default to the root user site.

/** Path prefix the site is served under, without a trailing slash ("" or "/repo"). */
export const BASE_PATH = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");

/** Absolute URL of the site root, including the base path, without a trailing slash. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://adnankavak.github.io").replace(/\/$/, "");

/**
 * Prefix a root-relative path to a file in /public with the base path.
 * next/link adds the base path automatically; plain <img>, <a href> and
 * markdown links do not, so they must go through this helper.
 */
export function asset(path: string): string {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  return `${BASE_PATH}${path}`;
}
