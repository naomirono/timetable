import { Bricolage_Grotesque, Figtree } from "next/font/google";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { site } from "@/lib/site";
import "./globals.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage", weight: ["700", "800"] });
const body = Figtree({ subsets: ["latin"], variable: "--font-figtree" });

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.fullName} | Timetable, homework and exam planner for iPhone`,
    template: `%s | ${site.name}`,
  },
  description:
    "Class Timetable is a free iPhone, iPad and Mac planner for students. Keep your lessons, homework and exams in one place, with reminders, widgets and iCloud sync.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name}: timetable, homework and exam planner`,
    description: "Set up your week once. See where you need to be, what's due and which exams are coming up.",
    url: "/",
  },
  twitter: { card: "summary_large_image" },
  // Shows Safari's native install banner on iPhone and iPad.
  other: { "apple-itunes-app": `app-id=${site.appId}` },
  // Google Search Console: set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION in Vercel (the content value of the verification meta tag).
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && {
    verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION },
  }),
};

export const viewport = { themeColor: "#fafbff" };

const wrap = "mx-auto w-[min(1080px,calc(100%-2.5rem))]";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <div className={wrap}>
          <header className="flex items-center justify-between py-5">
            <Link href="/" className="font-display text-lg font-extrabold no-underline">Class Timetable</Link>
            <nav aria-label="Main" className="flex gap-6 font-semibold text-ink-soft">
              <Link href="/#features" className="hover:text-ink">Features</Link>
              <Link href="/blog" className="hover:text-ink">Blog</Link>
            </nav>
          </header>
          <main>{children}</main>
        </div>
        <footer className="mt-24 border-t border-ink/15 pt-10 pb-12 text-[0.95rem] text-ink-soft">
          <div className={`${wrap} flex flex-wrap justify-between gap-x-8 gap-y-4`}>
            <p>© {new Date().getFullYear()} {site.developer}. Class Timetable is available for iPhone, iPad and Mac.</p>
            <nav aria-label="Footer" className="flex gap-5">
              <Link href="/blog" className="hover:text-ink">Blog</Link>
              <a href={site.privacyUrl} rel="noopener" className="hover:text-ink">Privacy policy</a>
            </nav>
          </div>
        </footer>
        <Analytics />
        {process.env.NEXT_PUBLIC_GA_ID ? <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} /> : null}
      </body>
    </html>
  );
}
