/**
 * Creates optimised WebP images for the portfolio.
 *
 *   Source:  client/portfolio-source/<project-slug>/<name>.(jpg|jpeg|png|webp)
 *   Output:  client/public/portfolio/<project-slug>/<name>-640.webp, -1024.webp, -1600.webp
 *
 * Run with:  npm run images
 * Only new or changed images are processed.
 */
import { mkdir, readdir, stat } from 'node:fs/promises';
import { dirname, extname, join, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(root, 'portfolio-source');
const OUT = join(root, 'public', 'portfolio');
const WIDTHS = [640, 1024, 1600];
const EXT = new Set(['.jpg', '.jpeg', '.png', '.webp']);

async function newer(src: string, out: string) {
  try {
    const [a, b] = await Promise.all([stat(src), stat(out)]);
    return a.mtimeMs > b.mtimeMs;
  } catch {
    return true;
  }
}

async function main() {
  let projects: string[];
  try {
    projects = (await readdir(SRC, { withFileTypes: true })).filter((d) => d.isDirectory()).map((d) => d.name);
  } catch {
    console.log(`No source folder at ${SRC}. Create portfolio-source/<project-slug>/ and add images.`);
    return;
  }
  let count = 0;
  for (const slug of projects) {
    const files = (await readdir(join(SRC, slug))).filter((f) => EXT.has(extname(f).toLowerCase()));
    await mkdir(join(OUT, slug), { recursive: true });
    for (const file of files) {
      const name = basename(file, extname(file));
      const src = join(SRC, slug, file);
      for (const w of WIDTHS) {
        const out = join(OUT, slug, `${name}-${w}.webp`);
        if (!(await newer(src, out))) continue;
        await sharp(src)
          .resize({ width: w, withoutEnlargement: false })
          .webp({ quality: w <= 640 ? 72 : 78, effort: 5 })
          .toFile(out);
        count++;
      }
    }
  }
  console.log(`Optimised ${count} image file(s).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
