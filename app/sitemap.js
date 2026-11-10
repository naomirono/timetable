import { getAllPosts } from "@/lib/posts";
import { site } from "@/lib/site";

export default function sitemap() {
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/blog`, changeFrequency: "weekly", priority: 0.8 },
    ...getAllPosts().map((p) => ({
      url: `${site.url}/blog/${p.slug}`,
      lastModified: p.updated ?? p.date,
      priority: 0.7,
    })),
  ];
}
