"use client";

import Image from "next/image";
import { useRef, useState } from "react";

// Scroll-snap carousel: swipe on touch, arrow buttons and dots on any screen.
// slides: [{ src, alt, w, h }]
// slideClass: width + rounding for each slide, e.g. "basis-[64%] rounded-[22px]"
// bleed: let the track run to the screen edges on mobile so the next slide peeks in
export default function Carousel({ slides, label, slideClass, sizes, className = "", bleed = false }) {
  const track = useRef(null);
  const [active, setActive] = useState(0);
  const last = slides.length - 1;

  const goTo = (i) => {
    const el = track.current;
    if (!el) return;
    const n = Math.max(0, Math.min(last, i));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({
      left: el.children[n].offsetLeft - el.children[0].offsetLeft,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  const onScroll = () => {
    const el = track.current;
    const start = el.children[0].offsetLeft;
    // The last slide can't always reach the left edge, so treat "scrolled to the end" as the last slide.
    if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 2) return setActive(last);
    let best = 0;
    let bestDist = Infinity;
    [...el.children].forEach((c, i) => {
      const d = Math.abs(c.offsetLeft - start - el.scrollLeft);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });
    setActive(best);
  };

  return (
    <div className={className} role="region" aria-roledescription="carousel" aria-label={label}>
      <div
        ref={track}
        onScroll={onScroll}
        tabIndex={0}
        className={`relative flex snap-x snap-mandatory gap-4 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
          bleed ? "-mx-5 px-5" : ""
        }`}
      >
        {slides.map((s, i) => (
          <div
            key={s.src}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${slides.length}`}
            className={`shrink-0 snap-start overflow-hidden border-[1.5px] border-ink bg-white ${slideClass}`}
          >
            <Image
              src={s.src}
              alt={s.alt}
              width={s.w}
              height={s.h}
              sizes={sizes}
              loading={i === 0 ? "eager" : "lazy"}
              className="h-auto w-full"
            />
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-1">
          {slides.map((s, i) => (
            <button
              key={s.src}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === active ? "true" : undefined}
              className="group py-2"
            >
              <span
                className={`block h-2.5 rounded-full transition-all ${
                  i === active ? "w-6 bg-ink" : "w-2.5 bg-ink/25 group-hover:bg-ink/50"
                }`}
              />
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <ArrowButton dir="prev" disabled={active === 0} onClick={() => goTo(active - 1)} />
          <ArrowButton dir="next" disabled={active === last} onClick={() => goTo(active + 1)} />
        </div>
      </div>
    </div>
  );
}

function ArrowButton({ dir, disabled, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === "prev" ? "Previous slide" : "Next slide"}
      className="grid size-10 place-items-center rounded-full border-[1.5px] border-ink bg-white transition hover:bg-highlighter disabled:opacity-30 disabled:hover:bg-white"
    >
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d={dir === "prev" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} />
      </svg>
    </button>
  );
}
