import { config } from '../config';
import { createFileStore } from './file';
import { createPostgresStore } from './postgres';
import type { EnquiryStore } from './types';

/**
 * Returns the configured store, or null when storage is not configured
 * (production without DATABASE_URL). In that case the API answers 503 and
 * the form tells the visitor to use email or WhatsApp – nothing is lost silently.
 */
export function createStore(): EnquiryStore | null {
  if (config.storageDriver === 'postgres') {
    if (!config.DATABASE_URL) {
      console.error('[storage] DATABASE_URL is not set – enquiries cannot be saved. See .env.example.');
      return null;
    }
    return createPostgresStore(config.DATABASE_URL, config.DATABASE_SSL);
  }
  if (config.isProd) {
    console.error('[storage] STORAGE_DRIVER=file is for local development only. Set DATABASE_URL.');
    return null;
  }
  console.warn('[storage] Using local file storage (server/data/enquiries.jsonl). Set DATABASE_URL to use PostgreSQL.');
  return createFileStore();
}

export type { EnquiryStore, EnquiryRecord, StoredEnquiry } from './types';
