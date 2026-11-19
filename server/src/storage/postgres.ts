import pg from 'pg';
import type { EnquiryRecord, EnquiryStore, StoredEnquiry } from './types';

const COLUMNS = {
  reference: 'reference',
  type: 'type',
  status: 'status',
  fullName: 'full_name',
  companyName: 'company_name',
  email: 'email',
  phone: 'phone',
  country: 'country',
  service: 'service',
  budgetCurrency: 'budget_currency',
  budgetAmount: 'budget_amount',
  timeline: 'timeline',
  message: 'message',
  websiteUrl: 'website_url',
  details: 'details',
  sourcePage: 'source_page',
  landingPage: 'landing_page',
  referrer: 'referrer',
  relatedProject: 'related_project',
  utmSource: 'utm_source',
  utmMedium: 'utm_medium',
  utmCampaign: 'utm_campaign',
  utmTerm: 'utm_term',
  utmContent: 'utm_content',
  ipHash: 'ip_hash',
  userAgent: 'user_agent',
  createdAt: 'created_at',
} as const satisfies Record<keyof EnquiryRecord, string>;

type Row = Record<string, unknown> & { id: string; created_at: Date };

function fromRow(row: Row): StoredEnquiry {
  const out: Record<string, unknown> = { id: row.id };
  for (const [key, col] of Object.entries(COLUMNS)) out[key] = row[col];
  out.createdAt = row.created_at instanceof Date ? row.created_at.toISOString() : row.created_at;
  return out as unknown as StoredEnquiry;
}

export function createPostgresStore(connectionString: string, sslMode: 'require' | 'no-verify' | 'disable'): EnquiryStore {
  const pool = new pg.Pool({
    connectionString,
    ssl: sslMode === 'disable' ? false : { rejectUnauthorized: sslMode !== 'no-verify' },
    max: 5,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 10_000,
  });
  pool.on('error', (err) => console.error('[db] idle client error:', err.message));

  return {
    name: 'postgres',
    async ping() {
      await pool.query('SELECT 1');
    },
    async insert(record) {
      const keys = Object.keys(COLUMNS) as (keyof EnquiryRecord)[];
      const cols = keys.map((k) => COLUMNS[k]);
      const values = keys.map((k) => (k === 'details' ? JSON.stringify(record.details) : record[k]));
      const placeholders = keys.map((_, i) => `$${i + 1}`);
      const { rows } = await pool.query<Row>(
        `INSERT INTO enquiries (${cols.join(', ')}) VALUES (${placeholders.join(', ')}) RETURNING *`,
        values,
      );
      return fromRow(rows[0]);
    },
    async recordNotifications(id, result) {
      await pool.query('UPDATE enquiries SET notifications = $2::jsonb, updated_at = now() WHERE id = $1', [id, JSON.stringify(result)]);
    },
    async list({ limit, offset, type }) {
      const params: unknown[] = [limit, offset];
      let where = '';
      if (type) {
        params.push(type);
        where = 'WHERE type = $3';
      }
      const { rows } = await pool.query<Row>(
        `SELECT * FROM enquiries ${where} ORDER BY created_at DESC LIMIT $1 OFFSET $2`,
        params,
      );
      return rows.map(fromRow);
    },
  };
}
