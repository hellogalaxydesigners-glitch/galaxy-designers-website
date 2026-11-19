# Galaxy Designers – website

Agency website with a data-driven portfolio, eight SEO service pages and a working lead-generation backend.

| Part | Technology |
|---|---|
| Website | React 19, TypeScript, Vite 8, Tailwind CSS 4, React Router 8 |
| Forms | React Hook Form + Zod (the same validation rules run in the browser and on the server) |
| API | Node.js 22, Express 5, Helmet, rate limiting |
| Database | PostgreSQL – Supabase free tier or any Postgres host |
| Email / CRM | Any SMTP provider (Nodemailer) and a signed JSON webhook |
| SEO | Every page pre-rendered to static HTML at build time, plus meta tags, Open Graph, JSON-LD structured data, sitemap and robots.txt |

```
galaxy-designers/
├─ client/                 Website (React)
│  ├─ src/content/         ← ALL EDITABLE CONTENT lives here
│  ├─ src/pages/           One file per page
│  ├─ src/components/      Layout, sections, forms, UI
│  ├─ portfolio-source/    Original portfolio images (you add these)
│  ├─ public/              Logos, icons, optimised images, social image
│  └─ scripts/             Prerender, image optimiser, sample-image generator
├─ server/                 API + serves the built website
│  ├─ src/                 Routes, storage, spam protection, email & webhook
│  └─ migrations/          SQL for the enquiries table
├─ shared/                 Form options and validation used by both sides
└─ .env.example            Every setting, explained
```

---

## 1. Run it on your computer

Requirements: **Node.js 22.9 or newer** (https://nodejs.org).

```bash
npm install                 # once
npm run dev                 # website on http://localhost:5173, API on :8787
```

**Without a database (first run):** you don't need a `.env` file. In development the API stores test enquiries in `server/data/enquiries.jsonl`, so you can try the forms straight away.

**Adding settings locally:** create `server/.env` with only the lines you need from `.env.example`, and keep `NODE_ENV=development` (the template's `production` value makes the API require a database).

**With Supabase (recommended – free tier):**
1. Create a project at https://supabase.com.
2. Click **Connect** and copy the **Session pooler** connection string (URI). Put your database password into it.
3. Put it in `server/.env` as `DATABASE_URL=...` (alongside `NODE_ENV=development`)
4. Create the table: `npm run db:migrate`

You can see every enquiry in Supabase under **Table Editor → enquiries**.

### Useful commands

| Command | What it does |
|---|---|
| `npm run dev` | Website and API with live reload |
| `npm run build` | Production build (website pre-rendered to `client/dist`, API bundled to `server/dist`) |
| `npm start` | Runs the production server (website + API on one port) |
| `npm run db:migrate` | Creates or updates database tables |
| `npm run images` | Optimises portfolio images (see section 3) |
| `npm run typecheck` | Checks the TypeScript code |

---

## 2. Edit content (no coding needed beyond text)

All content is in `client/src/content/`. Change a value, save, and the site updates.

| File | What it controls |
|---|---|
| `site.config.ts` | **Contact details, WhatsApp number, domain, social links, analytics, feature switches** |
| `home.ts` | Homepage headlines, "why us", process, industries, final call to action |
| `services.ts` | The 8 services – summaries, benefits, deliverables, FAQs, SEO titles |
| `projects.ts` | Portfolio projects and case studies |
| `testimonials.ts` | Client testimonials |
| `about.ts` | About page |
| `navigation.ts` | Menu links |

### Before going live – replace the placeholders
`npm run build` prints a warning while any of these remain:
- `siteConfig.url` → your domain (or set `VITE_SITE_URL`)
- `social.*` → add profile URLs (empty ones stay hidden)
- `features.showPlaceholderTestimonials` → set to `false` until you have real testimonials

---

## 3. Add a portfolio project

1. Create a folder `client/portfolio-source/<project-slug>/` and add `cover.jpg`, `01.jpg`, `02.jpg` … (16:10 landscape, at least 1600 px wide).
2. Run `npm run images` – it creates optimised WebP files in three sizes.
3. In `client/src/content/projects.ts`, copy an existing entry, set `slug` to the folder name, fill in the details and set `isSample: false`.
4. Add `featured: true` to show it on the homepage.

The project's page, filters, search, related projects and sitemap entry are all created automatically.

**The 8 current projects are samples** with fictional brands and generated mockup images. They are labelled "Sample project" on the site. Delete them as real work replaces them.

To regenerate the sample images: `node client/scripts/sample-images/render.mjs` (needs `npx playwright install chromium`).

---

## 4. How enquiries work

```
Visitor fills in a form
  → browser checks the fields (instant feedback)
  → POST /api/enquiries
      → server checks every field again
      → spam checks: hidden honeypot field, minimum fill time, rate limit (8 per 10 min per IP),
        optional Cloudflare Turnstile, link/keyword heuristics
      → saved to PostgreSQL with a reference (e.g. GD-261119-K7QM), date/time, service,
        page, first landing page, referrer and UTM tags
      → visitor sees a confirmation with the reference (+ "also send on WhatsApp")
      → in the background: email to your team, optional confirmation email to the visitor,
        optional CRM webhook – each result is recorded on the enquiry
```

If the database is unreachable, the visitor is told plainly and offered WhatsApp and email with their message pre-filled. Nothing fails silently.

**Forms:** Start a project (two steps, `?type=quote` turns it into a quotation request), Contact, and Schedule a consultation (dates in the visitor's own time zone, converted to your team's time zone).

**Export enquiries:** set `ADMIN_TOKEN` in `server/.env`, then:
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" "https://your-domain.com/api/admin/enquiries?format=csv" -o enquiries.csv
```

**Check configuration:** `GET /api/health` shows whether the database, email, webhook and Turnstile are configured.

---

## 5. Integrations still to connect

| Integration | Where | Status |
|---|---|---|
| Database (Supabase) | `DATABASE_URL` + `npm run db:migrate` | **Required for production** |
| Email notifications | `SMTP_*`, `NOTIFY_EMAIL_*` | Built and tested; needs your SMTP details |
| CRM webhook | `CRM_WEBHOOK_URL` | Built and tested; needs a receiving URL |
| Cloudflare Turnstile | `TURNSTILE_SECRET_KEY` + `VITE_TURNSTILE_SITE_KEY` | Optional extra spam check |
| Google Analytics 4 | `VITE_GA_ID` | Loads after cookie consent |
| Search Console | `VITE_GOOGLE_SITE_VERIFICATION`, then submit `/sitemap.xml` | After the domain is live |
| Booking tool (Cal.com / Calendly) | Add a link or embed in `ConsultationPage.tsx` | Not used – requests go to email/WhatsApp as agreed |

---

## 6. Growing into a CMS or admin panel

Content is already separated from the pages and typed (`client/src/content/types.ts`). When you want non-technical editing:

- **Git-based CMS (simplest):** Decap CMS or TinaCMS can edit these content files directly through an `/admin` page, with no database needed.
- **Headless CMS:** move the `Service`, `Project` and `Testimonial` types into Sanity, Strapi or Supabase tables and load them at build time in `scripts/prerender.ts`.
- **Enquiries dashboard:** the `/api/admin/enquiries` endpoint is the starting point. A protected React page can list, filter and update `status` (new → contacted → qualified → won/lost); the column already exists.

---

## 7. Why these tools

- **Vite + build-time pre-rendering instead of Next.js:** you get static HTML for SEO and fast first loads, while keeping the simple React + Vite stack you asked for.
- **No animation library:** the one orchestrated hero animation and the interactions are plain CSS, which saves about 35 KB of JavaScript. Motion can be added later if a page needs complex animation.
- **`pg` instead of an ORM:** one table and clear SQL migrations; easy to move between Supabase and any Postgres host.
- **Shared Zod schemas:** one definition of every form rule, so browser and server can't disagree.
- **Archivo (self-hosted):** one variable typeface, using its wide cut for headlines (echoing the GALAXY wordmark) and the normal width for text. No requests to Google Fonts.

See **DEPLOYMENT.md** to put the site online.
