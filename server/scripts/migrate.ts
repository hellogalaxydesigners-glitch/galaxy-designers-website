/**
 * Applies SQL files in server/migrations/ in order, once each.
 * Usage: npm run db:migrate   (needs DATABASE_URL)
 */
import { readdir, readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import pg from 'pg';

const here = dirname(fileURLToPath(import.meta.url));
// Works both from scripts/ (tsx) and dist/ (built)
const MIGRATIONS = join(here, '..', 'migrations');

const url = process.env.DATABASE_URL;
if (!url) {
  console.error('DATABASE_URL is not set. Add it to server/.env (see .env.example).');
  process.exit(1);
}

const sslMode = process.env.DATABASE_SSL ?? 'require';
const client = new pg.Client({
  connectionString: url,
  ssl: sslMode === 'disable' ? false : { rejectUnauthorized: sslMode !== 'no-verify' },
});

await client.connect();
try {
  await client.query(`CREATE TABLE IF NOT EXISTS schema_migrations (
    name text PRIMARY KEY, applied_at timestamptz NOT NULL DEFAULT now())`);
  const done = new Set((await client.query<{ name: string }>('SELECT name FROM schema_migrations')).rows.map((r) => r.name));
  const files = (await readdir(MIGRATIONS)).filter((f) => f.endsWith('.sql')).sort();
  let applied = 0;
  for (const file of files) {
    if (done.has(file)) continue;
    const sql = await readFile(join(MIGRATIONS, file), 'utf8');
    await client.query('BEGIN');
    try {
      await client.query(sql);
      await client.query('INSERT INTO schema_migrations (name) VALUES ($1)', [file]);
      await client.query('COMMIT');
      console.log(`✓ applied ${file}`);
      applied++;
    } catch (err) {
      await client.query('ROLLBACK');
      throw new Error(`Migration ${file} failed: ${(err as Error).message}`);
    }
  }
  console.log(applied ? `Done – ${applied} migration(s) applied.` : 'Database is up to date.');
} finally {
  await client.end();
}
