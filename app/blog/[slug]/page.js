import Link from "next/link";
import { notFound } from "next/navigation";
import AppStoreButton from "@/components/AppStoreButton";
import { getAllPosts, getPost } from "@/lib/posts";
import { site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  if (!getAllPosts().some((p) => p.slug === slug)) return {};
  const { meta } = await getPost(slug);
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: { type: "article", title: meta.title, description: meta.description, publishedTime: meta.date, url: `/blog/${slug}` },
  };
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  if (!getAllPosts().some((p) => p.slug === slug)) notFound();
  const { meta, body } = await getPost(slug);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: meta.title,
      description: meta.description,
      datePublished: meta.date,
      dateModified: meta.updated ?? meta.date,
      mainEntityOfPage: `${site.url}/blog/${slug}`,
      author: { "@type": "Person", name: site.developer },
      publisher: { "@type": "Organization", name: site.name },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.url },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${site.url}/blog` },
        { "@type": "ListItem", position: 3, name: meta.title, item: `${site.url}/blog/${slug}` },
      ],
    },
  ];

  return (
    <article className="mx-auto max-w-[680px]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Breadcrumb" className="text-[0.9rem] text-ink-soft">
        <Link href="/" className="hover:text-ink">Home</Link> / <Link href="/blog" className="hover:text-ink">Blog</Link>
      </nav>
      <h1 className="mt-8 mb-3 text-[clamp(2.1rem,5vw,3rem)] font-extrabold">{meta.title}</h1>
      <p className="text-[0.9rem] text-ink-soft">
        <time dateTime={meta.date}>{new Date(meta.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</time> · {meta.minutes} min read
      </p>
      <div
        className="prose mt-8 max-w-none prose-headings:font-display prose-headings:font-extrabold prose-headings:text-ink prose-h2:mt-10 prose-h2:text-2xl prose-p:text-ink prose-li:text-ink prose-strong:text-ink prose-a:text-brand"
        dangerouslySetInnerHTML={{ __html: body }}
      />
      <aside className="mt-12 rounded-[14px] border-[1.5px] border-ink p-7 shadow-[6px_6px_0_var(--color-highlighter)]">
        <h2 className="mb-1.5 text-[1.4rem] font-bold">Keep your timetable, homework and exams in one app</h2>
        <p className="mb-4 text-ink-soft">Class Timetable sends a reminder before every class and deadline, and syncs with iCloud.</p>
        <AppStoreButton placement={`post-${slug}`} />
      </aside>
    </article>
  );
}
