import Link from "next/link";
import AppStoreButton from "@/components/AppStoreButton";
import Carousel from "@/components/Carousel";
import { getAllPosts } from "@/lib/posts";
import { site } from "@/lib/site";

const phones = [
  { src: "/screenshots/iphone-classes.webp", w: 460, h: 996, alt: "Class Timetable on iPhone showing today's classes with times, rooms and task counts" },
  { src: "/screenshots/iphone-tasks.webp", w: 460, h: 996, alt: "Tasks screen on iPhone with Today, Upcoming and Completed tabs and course labels" },
  { src: "/screenshots/iphone-widgets.webp", w: 460, h: 996, alt: "iPhone Home Screen with Class Timetable widgets for today's classes, tasks and exams" },
  { src: "/screenshots/iphone-exams.webp", w: 460, h: 996, alt: "Exams screen on iPhone listing upcoming exams by date with time and venue" },
];

const macShots = [
  { src: "/screenshots/mac-week.webp", w: 1296, h: 810, alt: "Class Timetable weekly view on Mac with colour-coded classes and a sidebar for classes, tasks and exams" },
  { src: "/screenshots/mac-tasks.webp", w: 626, h: 391, alt: "Tasks view on Mac showing an inbox, overdue homework and upcoming deadlines by day" },
  { src: "/screenshots/mac-month.webp", w: 626, h: 391, alt: "Month calendar view on Mac listing every class with its start time" },
  { src: "/screenshots/mac-exams.webp", w: 626, h: 391, alt: "Exams table on Mac with date, time slot and exam name, plus a detail panel with the venue" },
];

const features = [
  { h: "A weekly timetable you set up once", p: "Add lessons, lectures and labs with the room, venue and lecturer. Keep a separate timetable for each term or semester, and set classes that repeat every two weeks." },
  { h: "Homework and coursework by course", p: "Add tasks with due dates and notes, and attach links. See what is overdue, due today and coming up, grouped by course." },
  { h: "Exam dates, times and venues together", p: "Keep every exam in one list and get a reminder a week before, so revision starts in good time." },
  { h: "Reminders, widgets and Siri", p: "Get a notification before a class starts or a deadline arrives. Put your next class, tasks and exams on the Home Screen, or ask Siri what's next." },
  { h: "iCloud sync across your devices", p: "Your timetable stays current on iPhone, iPad and Mac. Export it as a PDF to print or share with classmates." },
  { h: "A dashboard for today", p: "Open the app and see today's classes, tasks and upcoming events on one screen." },
];

const quotes = [
  { q: "Can't miss a class. Works as a perfect reminder as well.", a: "Dr. Dammah" },
  { q: "I have not missed a class this semester because of this app.", a: "Cossyr" },
  { q: "Helps a lot in scheduling.", a: "vintage studio" },
  { q: "I can only wonder why I didn't have this earlier.", a: "Baldagei" },
];

const h2 = "mb-8 max-w-[20ch] text-[clamp(1.9rem,4vw,2.6rem)] font-extrabold";

export default function Home() {
  const posts = getAllPosts().slice(0, 3);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    name: site.fullName,
    operatingSystem: "iOS, iPadOS, macOS",
    applicationCategory: "EducationalApplication",
    description: "Timetable, homework and exam planner for students, with reminders, widgets and iCloud sync.",
    url: site.url,
    downloadUrl: site.appStoreUrl,
    author: { "@type": "Person", name: site.developer },
    screenshot: [...phones, ...macShots].map((x) => `${site.url}${x.src}`),
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    aggregateRating: { "@type": "AggregateRating", ratingValue: "5.0", ratingCount: "13" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="grid items-center gap-10 pt-12 pb-8 md:grid-cols-[1fr_1.15fr] md:gap-14">
        <div>
          <h1 className="text-[clamp(2.6rem,6vw,4.2rem)] font-extrabold">
            Know where to be and{" "}
            <mark className="bg-[linear-gradient(transparent_55%,var(--color-highlighter)_55%)] px-[0.1em] text-inherit">what's due.</mark>
          </h1>
          <p className="mt-5 mb-7 max-w-[34ch] text-xl text-ink-soft">
            Your lessons, homework and exams in one planner for school, college and university.
          </p>
          <AppStoreButton placement="hero" />
          <p className="mt-4 text-[0.95rem] text-ink-soft">Free for iPhone, iPad and Mac. Optional upgrade unlocks everything.</p>
        </div>

        {/* Under md: iPhone screenshots, below the text. */}
        <Carousel
          className="md:hidden"
          label="Class Timetable on iPhone"
          slides={phones}
          slideClass="basis-[64%] rounded-[22px] sm:basis-[42%]"
          sizes="(min-width: 640px) 42vw, 64vw"
          bleed
        />
        {/* md and up (md, lg, xl, 2xl): Mac screenshots, beside the text. */}
        <Carousel
          className="hidden min-w-0 md:block"
          label="Class Timetable on Mac"
          slides={macShots}
          slideClass="basis-[88%] rounded-[14px]"
          sizes="(min-width: 1024px) 480px, 45vw"
        />
      </section>

      <section id="features" className="pt-18">
        <h2 className={h2}>Everything for the term in one place</h2>
        <div className="grid gap-x-14 md:grid-cols-2">
          {features.map((f) => (
            <div key={f.h} className="border-t-[1.5px] border-ink py-6">
              <h3 className="mb-1.5 text-xl font-bold">{f.h}</h3>
              <p className="text-ink-soft">{f.p}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="pt-18">
        <h2 className={h2}>What students say</h2>
        <div className="grid gap-5 md:grid-cols-2">
          {quotes.map((x) => (
            <figure key={x.a} className="rounded-[10px] bg-wash px-6 py-5">
              <blockquote className="mb-2.5 font-semibold">{x.q}</blockquote>
              <figcaption className="text-[0.9rem] text-ink-soft">{x.a}, App Store review</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="pt-18">
        <h2 className={h2}>Study guides</h2>
        <ul>
          {posts.map((p) => (
            <li key={p.slug} className="border-t-[1.5px] border-ink py-6">
              <Link href={`/blog/${p.slug}`} className="group block">
                <h3 className="mb-1.5 text-2xl font-bold underline decoration-transparent decoration-4 underline-offset-4 group-hover:decoration-highlighter">{p.title}</h3>
                <p className="mb-1.5 max-w-[60ch] text-ink-soft">{p.description}</p>
                <span className="text-[0.9rem] text-ink-soft">{p.minutes} min read</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-20 flex flex-wrap items-center justify-between gap-6 rounded-[18px] bg-ink p-8 text-white md:p-12">
        <div>
          <h2 className="max-w-[18ch] text-[clamp(1.7rem,3.5vw,2.3rem)] font-extrabold">Start the term organised</h2>
          <p className="mt-2 text-[#c7d0ea]">Set up your timetable in a few minutes.</p>
        </div>
        <AppStoreButton placement="footer-band" variant="yellow" />
      </section>
    </>
  );
}
