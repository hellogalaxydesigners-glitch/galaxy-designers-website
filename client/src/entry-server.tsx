/**
 * Build-time renderer. scripts/prerender.ts calls render() for every route to
 * produce static HTML with complete <head> metadata for search engines.
 */
import { StrictMode } from 'react';
import { prerenderToNodeStream } from 'react-dom/static';
import { StaticRouter } from 'react-router';
import { App } from './App';
import { SeoContext, renderHeadToString, type SeoCollector } from '@/lib/seo';
import { services } from '@/content/services';
import { projects } from '@/content/projects';
import { findPlaceholders, siteConfig } from '@/content/site.config';

export { findPlaceholders };
export const siteUrl = siteConfig.url;

/** Every public route, used by the prerender step and the sitemap. */
export function getRoutes() {
  return [
    { path: '/', priority: 1.0 },
    { path: '/services', priority: 0.9 },
    ...services.map((s) => ({ path: `/services/${s.slug}`, priority: 0.9 })),
    { path: '/work', priority: 0.9 },
    ...projects.map((p) => ({ path: `/work/${p.slug}`, priority: 0.7 })),
    { path: '/about', priority: 0.7 },
    { path: '/contact', priority: 0.8 },
    { path: '/start-a-project', priority: 0.8 },
    { path: '/consultation', priority: 0.7 },
    { path: '/privacy', priority: 0.3 },
  ];
}

export async function render(url: string) {
  const collector: SeoCollector = { data: null };
  const { prelude } = await prerenderToNodeStream(
    <StrictMode>
      <SeoContext.Provider value={collector}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </SeoContext.Provider>
    </StrictMode>,
    {
      // Static pages: emit one complete document instead of progressive chunks,
      // so no inline "reveal" scripts are needed.
      progressiveChunkSize: Number.POSITIVE_INFINITY,
      onError(error) {
        console.error(`Render error in ${url}:`, error);
      },
    },
  );
  const chunks: Buffer[] = [];
  for await (const chunk of prelude) chunks.push(Buffer.from(chunk));
  const html = Buffer.concat(chunks).toString('utf8');
  const head = collector.data ? renderHeadToString(collector.data) : '';
  // Pages must render to plain HTML. Streaming markers would need inline scripts,
  // which the Content Security Policy blocks.
  if (/<template|<script>/.test(html)) {
    throw new Error(`Prerender of ${url} produced streaming markers – a component suspended during render.`);
  }
  return { html, head, noindex: Boolean(collector.data?.noindex) };
}
