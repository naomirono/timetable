import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <h1 className="mt-8 mb-3 text-5xl font-extrabold">Page not found</h1>
      <p>
        That page doesn't exist. Go back to the <Link href="/" className="text-brand underline">home page</Link> or browse the{" "}
        <Link href="/blog" className="text-brand underline">study guides</Link>.
      </p>
    </>
  );
}
