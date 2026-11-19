/**
 * GET /api/admin/enquiries – read-only export of recent enquiries.
 * Protected by ADMIN_TOKEN (send as "Authorization: Bearer <token>").
 *   ?format=csv   download as CSV (opens in Excel / Google Sheets)
 *   ?type=project filter by type
 *   ?limit=100&offset=0
 * Disabled entirely when ADMIN_TOKEN is not set.
 *
 * This is the starting point for a future admin dashboard.
 */
import { timingSafeEqual } from 'node:crypto';
import { Router } from 'express';
import { config } from '../config';
import type { EnquiryStore, StoredEnquiry } from '../storage';

function tokenMatches(header: string | undefined) {
  if (!config.ADMIN_TOKEN || !header?.startsWith('Bearer ')) return false;
  const given = Buffer.from(header.slice(7));
  const expected = Buffer.from(config.ADMIN_TOKEN);
  return given.length === expected.length && timingSafeEqual(given, expected);
}

const CSV_FIELDS: (keyof StoredEnquiry)[] = [
  'createdAt', 'reference', 'type', 'status', 'fullName', 'companyName', 'email', 'phone', 'country',
  'service', 'budgetCurrency', 'budgetAmount', 'timeline', 'message', 'websiteUrl', 'details',
  'sourcePage', 'landingPage', 'referrer', 'relatedProject', 'utmSource', 'utmMedium', 'utmCampaign',
];

function toCsv(rows: StoredEnquiry[]) {
  const cell = (v: unknown) => {
    let s = v == null ? '' : typeof v === 'object' ? JSON.stringify(v) : String(v);
    if (/^[=+\-@]/.test(s)) s = `'${s}`; // stop spreadsheet formula injection
    return `"${s.replace(/"/g, '""')}"`;
  };
  return [CSV_FIELDS.join(','), ...rows.map((r) => CSV_FIELDS.map((f) => cell(r[f])).join(','))].join('\r\n');
}

export function adminRouter(store: EnquiryStore | null) {
  const router = Router();
  router.get('/enquiries', async (req, res) => {
    if (!config.ADMIN_TOKEN) return res.status(404).json({ ok: false, error: 'Not found' });
    if (!tokenMatches(req.get('authorization'))) return res.status(401).json({ ok: false, error: 'Unauthorised' });
    if (!store) return res.status(503).json({ ok: false, error: 'Storage is not configured' });

    const limit = Math.min(Math.max(Number(req.query.limit) || 100, 1), 1000);
    const offset = Math.max(Number(req.query.offset) || 0, 0);
    const type = typeof req.query.type === 'string' ? req.query.type : undefined;
    const rows = await store.list({ limit, offset, type });

    res.set('Cache-Control', 'no-store');
    if (req.query.format === 'csv') {
      res.set('Content-Type', 'text/csv; charset=utf-8');
      res.set('Content-Disposition', `attachment; filename="enquiries-${new Date().toISOString().slice(0, 10)}.csv"`);
      return res.send('﻿' + toCsv(rows));
    }
    res.json({ ok: true, count: rows.length, enquiries: rows.map(({ ipHash: _ip, ...r }) => r) });
  });
  return router;
}
