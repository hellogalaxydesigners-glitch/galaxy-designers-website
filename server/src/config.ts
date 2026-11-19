/**
 * Server configuration, read from environment variables (see .env.example).
 * Invalid values stop the server at start-up with a clear message.
 */
import { z } from 'zod';

const bool = z
  .string()
  .optional()
  .transform((v) => v === 'true' || v === '1');

const schema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().int().positive().default(8787),
  /** Public URL of the website, e.g. https://www.galaxydesigners.com (used for CORS and email links) */
  SITE_URL: z.string().url().optional(),
  /** Extra allowed origins for the API, comma-separated (only needed if the site and API are on different domains) */
  CORS_ORIGINS: z.string().optional(),
  /** Number of proxies in front of the app (Render, Railway, Nginx = 1) so visitor IPs are read correctly */
  TRUST_PROXY: z.coerce.number().int().nonnegative().default(1),

  /** PostgreSQL connection string (Supabase: Project settings → Database → Connection string → URI) */
  DATABASE_URL: z.string().optional(),
  DATABASE_SSL: z.enum(['require', 'no-verify', 'disable']).default('require'),
  /**
   * Where enquiries are stored: "postgres" (default when DATABASE_URL is set) or
   * "file" (local development only – writes to server/data/enquiries.jsonl).
   */
  STORAGE_DRIVER: z.enum(['postgres', 'file']).optional(),

  /** Secret used to anonymise IP addresses before storing them. Any long random string. */
  IP_HASH_SALT: z.string().min(16).optional(),

  /** Cloudflare Turnstile secret key. When set, every form must pass the Turnstile check. */
  TURNSTILE_SECRET_KEY: z.string().optional(),

  /** Email notifications (any SMTP provider: Google Workspace, Zoho, Brevo, Resend SMTP, Amazon SES …) */
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.coerce.number().int().positive().default(587),
  SMTP_SECURE: bool,
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  NOTIFY_EMAIL_TO: z.string().optional(),
  NOTIFY_EMAIL_FROM: z.string().optional(),
  /** Also send a short confirmation email to the person who submitted the form */
  SEND_CONFIRMATION_EMAIL: bool,

  /** CRM / automation webhook (HubSpot, Zoho, Make, Zapier, n8n …). Receives every enquiry as JSON. */
  CRM_WEBHOOK_URL: z.string().url().optional(),
  /** Optional secret – adds an HMAC-SHA256 signature header so the receiver can verify the request */
  CRM_WEBHOOK_SECRET: z.string().optional(),

  /** Token for the read-only enquiries export (GET /api/admin/enquiries). Leave empty to disable. */
  ADMIN_TOKEN: z.string().min(24).optional(),

  /** Folder with the built website (client/dist). Defaults to ../client/dist relative to the server folder. */
  CLIENT_DIST: z.string().optional(),
});

const parsed = schema.safeParse(
  Object.fromEntries(Object.entries(process.env).map(([k, v]) => [k, v === '' ? undefined : v])),
);

if (!parsed.success) {
  console.error('✖ Invalid server configuration:');
  for (const issue of parsed.error.issues) console.error(`  ${issue.path.join('.')}: ${issue.message}`);
  process.exit(1);
}

const env = parsed.data;

export const config = {
  ...env,
  isProd: env.NODE_ENV === 'production',
  storageDriver: env.STORAGE_DRIVER ?? (env.DATABASE_URL ? 'postgres' : env.NODE_ENV === 'production' ? 'postgres' : 'file'),
  emailEnabled: Boolean(env.SMTP_HOST && env.NOTIFY_EMAIL_TO && env.NOTIFY_EMAIL_FROM),
  allowedOrigins: [env.SITE_URL, ...(env.CORS_ORIGINS?.split(',') ?? [])]
    .filter(Boolean)
    .map((o) => o!.trim().replace(/\/$/, '')),
};

export type Config = typeof config;
