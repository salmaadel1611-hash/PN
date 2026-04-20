# PowerNews – Modern News Platform (Next.js + Tailwind + Sanity-ready)

A production-ready rebuild blueprint for https://powernews.cc focused on energy, petroleum, and Egyptian business coverage.

## Architecture

- **Frontend:** Next.js (App Router, SSR/ISR-ready)
- **Styling:** Tailwind CSS with reusable design tokens
- **CMS:** Sanity schemas included (`sanity/schemas`)
- **Data mode:** Sample editorial data included for instant local run; easy switch to Sanity fetch layer
- **SEO:** Dynamic metadata, OpenGraph cards, sitemap, robots
- **Performance:** Optimized Next `<Image />`, minimal client JS, server components by default

## Core Product Coverage

- Homepage with hero, top stories, latest, editor picks, category previews, trending, newsletter
- Article page with rich text, author/date/reading time, share links, related coverage
- Category pages with featured lead + pagination
- Author pages with profile + archive
- Newsletter endpoint (`/api/newsletter`) ready for ESP integration
- Dark mode toggle (bonus)

## Project Structure

```txt
src/
  app/
    (site)/
      page.tsx
      article/[slug]/page.tsx
      category/[slug]/page.tsx
      author/[slug]/page.tsx
    api/newsletter/route.ts
    layout.tsx
    sitemap.ts
    robots.ts
  components/
    article-card.tsx
    newsletter-signup.tsx
    section-heading.tsx
    site-header.tsx
    site-footer.tsx
  data/sample-data.ts
  lib/
    content.ts
    sanity.ts
    types.ts
    utils.ts
sanity/schemas/
```

## Run Locally

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Open `http://localhost:3000`

## CMS (Sanity) Setup

1. Create a Sanity project and dataset.
2. Add environment values in `.env.local`:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

3. Use the provided schemas from `sanity/schemas` in your Sanity Studio app.
4. Replace sample data selectors in `src/lib/content.ts` with GROQ queries once CMS is live.

## Deployment (Vercel)

1. Push repository to GitHub.
2. Import project in Vercel.
3. Add environment variables from `.env.local`.
4. Deploy. Vercel will run `npm run build` automatically.

## Recommended Production Extensions

- Integrate comments (e.g., Giscus, custom moderation layer)
- Add auth + bookmarks (NextAuth + Postgres)
- Add event tracking for trending score (views + recency)
- Connect newsletter to Mailchimp/Brevo API
- Add CDN cache headers + image optimization strategy

