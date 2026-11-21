import type { MetadataRoute } from "next";
import { posts } from "@/data/blog";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "about/", "research/", "publications/", "projects/", "awards/", "blog/", "contact/"];
  return [
    ...pages.map((p) => ({ url: `${SITE_URL}/${p}`, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.8 })),
    ...posts.map((p) => ({ url: `${SITE_URL}/blog/${p.slug}/`, lastModified: p.date, priority: 0.6 })),
  ];
}
