/**
 * Build step 3 of 3 – pre-renders every page to static HTML.
 *
 *  - dist/<route>/index.html for each route, with full <head> metadata
 *  - dist/404.html
 *  - dist/sitemap.xml and dist/robots.txt
 *
 * Search engines and social networks receive complete pages without running
 * JavaScript; React then takes over in the browser.
 */
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const ssrEntry = join(root, 'dist-ssr', 'entry-server.js');

type ServerEntry = {
  render: (url: string) => Promise<{ html: string; head: string; noindex: boolean }>;
  getRoutes: () => { path: string; priority: number }[];
  findPlaceholders: () => string[];
  siteUrl: string;
};

async function main() {
  const entry = (await import(pathToFileURL(ssrEntry).href)) as ServerEntry;
  const template = await readFile(join(dist, 'index.html'), 'utf8');
  const routes = entry.getRoutes();
  const base = entry.siteUrl.replace(/\/$/, '');

  const page = (head: string, html: string) =>
    template.replace('<!--app-head-->', head).replace('<!--app-html-->', html);

  for (const route of routes) {
    const { html, head } = await entry.render(route.path);
    const file = route.path === '/' ? join(dist, 'index.html') : join(dist, route.path, 'index.html');
    await mkdir(dirname(file), { recursive: true });
    await writeFile(file, page(head, html), 'utf8');
    console.log(`  prerendered ${route.path}`);
  }

  const notFound = await entry.render('/__not-found__');
  await writeFile(join(dist, '404.html'), page(notFound.head, notFound.html), 'utf8');
  console.log('  prerendered 404.html');

  const today = new Date().toISOString().slice(0, 10);
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map((r) => `  <url><loc>${base}${r.path === '/' ? '/' : r.path}</loc><lastmod>${today}</lastmod><priority>${r.priority.toFixed(1)}</priority></url>`)
  .join('\n')}
</urlset>
`;
  await writeFile(join(dist, 'sitemap.xml'), sitemap, 'utf8');
  await writeFile(
    join(dist, 'robots.txt'),
    `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${base}/sitemap.xml\n`,
    'utf8',
  );
  console.log(`  wrote sitemap.xml (${routes.length} URLs) and robots.txt`);

  await rm(join(root, 'dist-ssr'), { recursive: true, force: true });

  const placeholders = entry.findPlaceholders();
  if (placeholders.length) {
    console.warn('\n⚠  Placeholder values still in client/src/content/site.config.ts:');
    for (const p of placeholders) console.warn(`   – ${p}`);
    console.warn('   Replace them before going live.\n');
  }
}

main().catch((err) => {
  console.error('Prerender failed:', err);
  process.exit(1);
});
