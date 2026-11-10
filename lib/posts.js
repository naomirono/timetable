import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const dir = path.join(process.cwd(), "content/posts");

function read(slug) {
  const raw = fs.readFileSync(path.join(dir, `${slug}.md`), "utf8");
  const { data, content } = matter(raw);
  const minutes = Math.max(1, Math.round(content.split(/\s+/).length / 220));
  const meta = {
    slug,
    title: data.title,
    description: data.description,
    date: data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date),
    updated: data.updated ? String(data.updated) : undefined,
    minutes,
    tags: Array.isArray(data.tags) ? data.tags : [],
  };
  return { meta, content };
}

export function getAllPosts() {
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => read(f.replace(/\.md$/, "")).meta)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPost(slug) {
  const { meta, content } = read(slug);
  const body = (await remark().use(html).process(content)).toString();
  return { meta, body };
}

// Other posts that share the most tags with this one, newest first on ties.
export function getRelatedPosts(slug, limit = 2) {
  const all = getAllPosts();
  const current = all.find((p) => p.slug === slug);
  const tags = new Set(current?.tags ?? []);
  return all
    .filter((p) => p.slug !== slug)
    .map((p) => ({ p, score: p.tags.filter((t) => tags.has(t)).length }))
    .sort((a, b) => b.score - a.score || (a.p.date < b.p.date ? 1 : -1))
    .slice(0, limit)
    .map((x) => x.p);
}
