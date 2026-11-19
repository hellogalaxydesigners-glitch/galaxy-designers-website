/**
 * Renders the sample portfolio boards to PNG in client/portfolio-source/<slug>/.
 * Then run `npm run images` to create the optimised WebP files the site uses.
 *
 * Requires Playwright with a Chromium/Chrome browser:
 *   npx playwright install chromium
 *   node scripts/sample-images/render.mjs [slug-filter]
 *
 * This is only needed to regenerate the sample visuals. Real projects just
 * need their own images dropped into portfolio-source/<slug>/.
 */
import { mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { boardsA } from './boards-a.mjs';
import { boardsB } from './boards-b.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const outRoot = join(here, '../../portfolio-source');
const filter = process.argv[2];

let chromium;
try {
  ({ chromium } = await import('playwright'));
} catch {
  ({ chromium } = await import('/opt/npm-tools/node_modules/playwright/index.mjs'));
}

const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || undefined,
  args: ['--no-sandbox'],
});
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 1 });

const all = { ...boardsA, ...boardsB };
for (const [slug, boards] of Object.entries(all)) {
  if (filter && !slug.includes(filter)) continue;
  await mkdir(join(outRoot, slug), { recursive: true });
  for (const [name, build] of Object.entries(boards)) {
    await page.setContent(build(), { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    const file = join(outRoot, slug, `${name}.png`);
    await page.screenshot({ path: file });
    console.log('rendered', `${slug}/${name}.png`);
  }
}
await browser.close();
