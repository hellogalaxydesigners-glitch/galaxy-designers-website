# Deployment

The production server is a single Node.js process. It serves the pre-rendered website **and** the API from one domain, which keeps the setup simple and avoids CORS problems.

## Recommended free / low-cost setup

| Piece | Service | Cost |
|---|---|---|
| Database | Supabase (free tier) | Free |
| Website + API | Render (Web Service) or Railway | Free tier available; around US$7/month for an always-on instance |
| Domain + DNS + extra protection | Cloudflare | Free (domain registration is paid) |
| Email sending | Brevo, Resend or your Google Workspace / Zoho mailbox | Free tiers available |

> Free web-service tiers usually "sleep" after inactivity, so the first visit then takes ~30 seconds. The pre-rendered pages still need the server to wake up. For a business site, use an always-on paid instance once you launch.

---

## Step 1 – Database (Supabase)

1. Create a project at https://supabase.com (choose the region closest to your main market, e.g. Mumbai).
2. **Connect → Session pooler →** copy the URI and replace `[YOUR-PASSWORD]`.
3. On your computer, put it in `server/.env` as `DATABASE_URL`, then run:
   ```bash
   npm install
   npm run db:migrate
   ```
   This creates the `enquiries` table with row-level security switched on, so the browser can never read it.

## Step 2 – Host the app (Render example)

1. Push this folder to a GitHub repository (private is fine).
2. Render → **New → Web Service** → connect the repository.
3. Settings:
   - **Runtime:** Node
   - **Build command:** `npm ci --include=dev && npm run build`
   - **Start command:** `npm start`
   - **Health check path:** `/api/health`
4. **Environment variables:** add everything from the SERVER section of `.env.example` that you use. At minimum:
   ```
   NODE_ENV=production
   SITE_URL=https://www.your-domain.com
   DATABASE_URL=...
   IP_HASH_SALT=<long random string>
   TRUST_PROXY=1
   ```
   Also add the WEBSITE variables (`VITE_SITE_URL`, `VITE_GA_ID` …). They are read during the build.
5. Deploy. Visit `/api/health` – it should show `"storage":"ok"`.

**Railway:** the same build and start commands work. Set the variables in the service's *Variables* tab.

**Your own VPS:** install Node 22, run `npm ci && npm run build`, then keep `npm start` running with PM2 or systemd behind Nginx (proxy to the `PORT`, keep `TRUST_PROXY=1`).

## Step 3 – Domain

1. Add a custom domain in Render (or your host) and follow its DNS instructions (at Cloudflare: CNAME `www` → your Render address).
2. Redirect the bare domain to `www` (or the reverse). Keep whichever you choose identical to `SITE_URL` and `VITE_SITE_URL`.
3. Update `url` in `client/src/content/site.config.ts` (or `VITE_SITE_URL`) and redeploy so canonical links and the sitemap use the real domain.

## Step 4 – After launch

- [ ] Replace placeholder contact details in `site.config.ts` (the build warns about any left)
- [ ] Submit a test enquiry from the live site and confirm the email arrives
- [ ] Google Search Console: verify the domain, then submit `https://your-domain.com/sitemap.xml`
- [ ] Google Analytics 4: set `VITE_GA_ID`, redeploy, accept the cookie banner and check Realtime
- [ ] Have the privacy policy (`/privacy`) reviewed
- [ ] Replace sample portfolio projects with real case studies
- [ ] Hide placeholder testimonials (`features.showPlaceholderTestimonials = false`) until real ones are approved

## Optional: separate static hosting

The website can also be deployed on its own (`client/dist` on Netlify, Vercel or Cloudflare Pages), with the API elsewhere:

- Build the client with `VITE_API_URL=https://api.your-domain.com`.
- Set `CORS_ORIGINS=https://www.your-domain.com` on the API.
- Configure the static host to serve `404.html` for unknown paths.

The single-server setup above is simpler and recommended.

## Updating the site

Edit content → commit → push. Render rebuilds and deploys automatically. If you add a migration file in `server/migrations/`, run `npm run db:migrate` against the production database.
