import { getAllPosts, getPost } from "@/lib/posts";
import { renderOg } from "@/lib/og";

export const alt = "Class Timetable study guide";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }) {
  const { slug } = await params;
  const { meta } = await getPost(slug);
  return renderOg({ eyebrow: "Study guide", title: meta.title });
}
