// Vercel provides VERCEL_PROJECT_PRODUCTION_URL automatically (it becomes your custom domain once you add one).
const fromVercel = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const site = {
  name: "Class Timetable",
  fullName: "Class Timetable: School & Uni",
  tagline: "Homework & revision planner",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? fromVercel).replace(/\/$/, ""),
  appId: "6444357159",
  // Storefront-neutral link: Apple redirects each visitor to their own country's App Store.
  appStoreUrl: "https://apps.apple.com/app/id6444357159",
  developer: "Collins Cheruiyot",
  privacyUrl: "https://cherucole.github.io/privacy",
};

/** App Store link with a campaign tag, so App Store Connect shows which page drove each download. */
export function storeLink(campaign) {
  return `${site.appStoreUrl}?ct=${encodeURIComponent(campaign)}`;
}
