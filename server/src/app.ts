import { existsSync } from 'node:fs';
import { dirname, join, normalize, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import express, { type NextFunction, type Request, type Response } from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import { rateLimit } from 'express-rate-limit';
import { config } from './config';
import type { EnquiryStore } from './storage';
import { enquiriesRouter } from './routes/enquiries';
import { adminRouter } from './routes/admin';

const here = dirname(fileURLToPath(import.meta.url));

/** Finds the built website (client/dist) from either src/ (dev) or dist/ (built server). */
function resolveClientDist() {
  if (config.CLIENT_DIST) return resolve(config.CLIENT_DIST);
  const candidates = [resolve(here, '../../client/dist'), resolve(here, '../client/dist'), resolve(process.cwd(), '../client/dist')];
  return candidates.find((p) => existsSync(join(p, 'index.html'))) ?? candidates[0];
}

export function createApp(store: EnquiryStore | null) {
  const app = express();
  app.disable('x-powered-by');
  app.set('trust proxy', config.TRUST_PROXY);

  app.use(
    helmet({
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'script-src': ["'self'", 'https://www.googletagmanager.com', 'https://challenges.cloudflare.com'],
          'style-src': ["'self'", "'unsafe-inline'"],
          'img-src': ["'self'", 'data:', 'https://www.googletagmanager.com', 'https://*.google-analytics.com'],
          'connect-src': ["'self'", 'https://*.google-analytics.com', 'https://*.analytics.google.com', 'https://www.googletagmanager.com'],
          'frame-src': ['https://challenges.cloudflare.com'],
          'font-src': ["'self'", 'data:'],
          'form-action': ["'self'"],
          'upgrade-insecure-requests': config.isProd ? [] : null,
        },
      },
      crossOriginEmbedderPolicy: false,
    }),
  );
  app.use(compression());

  /* ------------------------------------------------------------------ API */
  const api = express.Router();
  api.use(
    cors({
      // Same-origin requests need no CORS. Other origins must be listed in SITE_URL / CORS_ORIGINS.
      origin: (origin, cb) => cb(null, !origin || config.allowedOrigins.includes(origin) || !config.isProd),
      methods: ['GET', 'POST'],
    }),
  );
  api.use(express.json({ limit: '32kb' }));
  api.use(rateLimit({ windowMs: 60_000, limit: 60, standardHeaders: 'draft-8', legacyHeaders: false }));

  api.get('/health', async (_req, res) => {
    let storage = store ? 'ok' : 'not_configured';
    if (store) {
      try {
        await store.ping();
      } catch {
        storage = 'unreachable';
      }
    }
    res.status(storage === 'ok' ? 200 : 503).json({
      ok: storage === 'ok',
      storage,
      storageDriver: store?.name ?? null,
      email: config.emailEnabled ? 'configured' : 'not_configured',
      crmWebhook: config.CRM_WEBHOOK_URL ? 'configured' : 'not_configured',
      turnstile: config.TURNSTILE_SECRET_KEY ? 'configured' : 'not_configured',
    });
  });

  api.use(
    '/enquiries',
    rateLimit({
      windowMs: 10 * 60_000,
      limit: 8,
      standardHeaders: 'draft-8',
      legacyHeaders: false,
      skip: (req) => req.method !== 'POST',
      handler: (_req, res) =>
        res.status(429).json({ ok: false, error: 'Too many submissions from your connection. Wait a few minutes and try again.' }),
    }),
    enquiriesRouter(store),
  );
  api.use('/admin', adminRouter(store));
  api.use((_req, res) => res.status(404).json({ ok: false, error: 'Not found' }));
  app.use('/api', api);

  /* -------------------------------------------------------- Website files */
  const dist = resolveClientDist();
  if (existsSync(join(dist, 'index.html'))) {
    // Fingerprinted assets can be cached for a year
    app.use('/assets', express.static(join(dist, 'assets'), { immutable: true, maxAge: '1y', index: false }));
    app.use(express.static(dist, { index: false, redirect: false, maxAge: '1d' }));

    // Pre-rendered pages: /work → dist/work/index.html
    app.get(/.*/, (req, res) => {
      if (req.path.length > 1 && req.path.endsWith('/')) {
        const q = req.originalUrl.slice(req.path.length);
        return res.redirect(301, req.path.replace(/\/+$/, '') + q);
      }
      const safe = normalize(decodeURIComponent(req.path)).replace(/^(\.\.[/\\])+/, '');
      const file = safe === '/' ? join(dist, 'index.html') : join(dist, safe, 'index.html');
      res.set('Cache-Control', 'no-cache');
      if (file.startsWith(dist) && existsSync(file)) return res.sendFile(file);
      const notFound = join(dist, '404.html');
      return existsSync(notFound) ? res.status(404).sendFile(notFound) : res.status(404).send('Not found');
    });
  } else {
    app.get('/', (_req, res) =>
      res.type('text').send('API is running. Build the website with `npm run build` to serve it from this server.'),
    );
  }

  /* -------------------------------------------------------- Error handler */
  app.use((err: Error & { status?: number; type?: string }, _req: Request, res: Response, _next: NextFunction) => {
    if (err.type === 'entity.too.large') return res.status(413).json({ ok: false, error: 'The form is too large to send.' });
    if (err.type === 'entity.parse.failed') return res.status(400).json({ ok: false, error: 'The request could not be read.' });
    console.error('[server] unhandled error:', err);
    res.status(err.status ?? 500).json({ ok: false, error: 'Something went wrong on our side. Please try again.' });
  });

  return app;
}
