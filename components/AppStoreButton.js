"use client";

import { track } from "@vercel/analytics";
import { storeLink } from "@/lib/site";

const base =
  "inline-flex items-center gap-2.5 rounded-[10px] px-5.5 py-3.5 font-bold no-underline transition duration-150 hover:-translate-y-0.5";
const variants = {
  dark: "bg-ink text-white hover:bg-[#0b1427]",
  yellow: "bg-highlighter text-ink hover:bg-[#ffe56b]",
};

// placement: where the button sits, e.g. "hero" or "post-end". Becomes the campaign tag and the analytics label.
export default function AppStoreButton({ placement, variant = "dark", label = "Download on the App Store" }) {
  return (
    <a
      href={storeLink(placement)}
      className={`${base} ${variants[variant]}`}
      rel="noopener"
      onClick={() => {
        window.gtag?.("event", "app_store_click", { placement });
        track("app_store_click", { placement });
      }}
    >
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="currentColor">
        <path d="M16.4 12.6c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.9-3.5.9-.7 0-1.8-.8-3-.8-1.5 0-3 .9-3.8 2.3-1.6 2.8-.4 7 1.2 9.3.8 1.1 1.7 2.4 2.9 2.3 1.2 0 1.6-.7 3-.7s1.8.7 3 .7c1.2 0 2-1.1 2.8-2.2.9-1.3 1.2-2.5 1.3-2.6-.1 0-2.5-1-2.5-3.9zM14.1 5.8c.6-.8 1.1-1.8.9-2.9-.9 0-2 .6-2.7 1.4-.6.7-1.1 1.8-1 2.8 1 .1 2.1-.5 2.8-1.3z" />
      </svg>
      <span>{label}</span>
    </a>
  );
}
