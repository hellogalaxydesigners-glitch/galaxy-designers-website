/**
 * Development-only storage: appends enquiries to server/data/enquiries.jsonl.
 * Lets you test the forms end to end before a database exists.
 * Never used in production (the server refuses STORAGE_DRIVER=file there).
 */
import { randomUUID } from 'node:crypto';
import { appendFile, mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import type { EnquiryStore, StoredEnquiry } from './types';

// Relative to the folder the server is started from (npm scripts run inside server/)
const DATA_DIR = join(process.cwd(), 'data');
const FILE = join(DATA_DIR, 'enquiries.jsonl');

async function readAll(): Promise<StoredEnquiry[]> {
  try {
    const raw = await readFile(FILE, 'utf8');
    return raw
      .split('\n')
      .filter(Boolean)
      .map((l) => JSON.parse(l) as StoredEnquiry);
  } catch {
    return [];
  }
}

export function createFileStore(): EnquiryStore {
  return {
    name: 'file',
    async ping() {
      await mkdir(DATA_DIR, { recursive: true });
    },
    async insert(record) {
      await mkdir(DATA_DIR, { recursive: true });
      const stored: StoredEnquiry = { id: randomUUID(), ...record };
      await appendFile(FILE, JSON.stringify(stored) + '\n', 'utf8');
      return stored;
    },
    async recordNotifications(id, result) {
      const all = await readAll();
      const updated = all.map((e) => (e.id === id ? { ...e, notifications: result } : e));
      await writeFile(FILE, updated.map((e) => JSON.stringify(e)).join('\n') + '\n', 'utf8');
    },
    async list({ limit, offset, type }) {
      const all = (await readAll()).filter((e) => !type || e.type === type).reverse();
      return all.slice(offset, offset + limit);
    },
  };
}
