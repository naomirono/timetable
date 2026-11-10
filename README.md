# Class Timetable: landing page + blog

Next.js (App Router, plain JavaScript) + Tailwind CSS v4. Statically generated, ready for Vercel.
Theme colours and fonts live in `app/globals.css` under `@theme`.

## Run locally
    npm install
    cp .env.example .env.local   # set NEXT_PUBLIC_SITE_URL
    npm run dev

## Deploy
1. Push to GitHub, import the repo in Vercel.
2. Add env vars: `NEXT_PUBLIC_SITE_URL` (your domain) and optionally `NEXT_PUBLIC_GA_ID`.
3. Add your custom domain in Vercel, then submit `https://yourdomain.com/sitemap.xml` in Google Search Console.

## Add a blog post
Create `content/posts/your-slug.md` with `title`, `description`, `date` frontmatter. It gets its own page, sitemap entry and structured data automatically.

## Tracking
- Vercel Web Analytics: enable under Project > Analytics. Page views are free; custom events need a paid plan.
- GA4 (optional): set `NEXT_PUBLIC_GA_ID`. Every App Store button click fires `app_store_click` with a `placement` value. Mark it as a key event in GA4.
- App Store Connect: links carry `?ct=<placement>`, so Campaigns in App Analytics shows which page produced downloads.

## To finish
- Replace the text App Store button with Apple's official badge (https://developer.apple.com/app-store/marketing/guidelines/).
- Add real screenshots and an `app/icon.png`, plus a `public/og.png` (1200x630).
- Add posts regularly, aimed at searches like "class timetable maker" or "exam revision plan".
