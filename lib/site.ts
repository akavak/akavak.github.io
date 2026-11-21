// Configure these at build time for the GitHub Pages site or local preview.
export const BASE_PATH = (process.env.SITE_BASE_PATH || "").replace(/\/$/, "");
export const SITE_URL = (process.env.SITE_URL || "https://akavak.github.io").replace(/\/$/, "");

export function asset(path: string): string {
  return path.startsWith("/") && !path.startsWith("//") ? `${BASE_PATH}${path}` : path;
}

export type Metadata = {
  title?: string;
  description?: string;
  openGraph?: { type: "article"; title: string; description: string; publishedTime: string };
};
