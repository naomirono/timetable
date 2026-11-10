import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export const metadata = {
  title: "Study guides and planning tips",
  description: "Practical guides on timetables, homework and exam revision for school, college and university students.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndex() {
  const posts = getAllPosts();
  return (
    <>
      <h1 className="mt-8 mb-3 text-[clamp(2.2rem,5vw,3.2rem)] font-extrabold">Study guides</h1>
      <p className="mb-8 max-w-[52ch] text-ink-soft">
        Practical ways to plan your week, finish homework on time and revise without cramming.
      </p>
      <ul>
        {posts.map((p) => (
          <li key={p.slug} className="border-t-[1.5px] border-ink py-6">
            <Link href={`/blog/${p.slug}`} className="group block">
              <h2 className="mb-1.5 text-2xl font-bold underline decoration-transparent decoration-4 underline-offset-4 group-hover:decoration-highlighter">{p.title}</h2>
              <p className="mb-1.5 max-w-[60ch] text-ink-soft">{p.description}</p>
              <span className="text-[0.9rem] text-ink-soft">
                <time dateTime={p.date}>{new Date(p.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</time> · {p.minutes} min read
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
