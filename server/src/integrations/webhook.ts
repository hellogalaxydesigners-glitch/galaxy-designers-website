/**
 * Sends every enquiry as JSON to a CRM or automation tool
 * (HubSpot workflow, Zoho Flow, Make, Zapier, n8n, Pipedream …).
 * If CRM_WEBHOOK_SECRET is set, the body is signed with HMAC-SHA256 in the
 * X-Galaxy-Signature header (hex) so the receiver can verify it.
 */
import { createHmac } from 'node:crypto';
import { config } from '../config';
import type { StoredEnquiry } from '../storage';

export async function sendWebhook(e: StoredEnquiry) {
  const body = JSON.stringify({ event: 'enquiry.created', enquiry: { ...e, ipHash: undefined } });
  const headers: Record<string, string> = { 'Content-Type': 'application/json', 'User-Agent': 'GalaxyDesigners-Website/1.0' };
  if (config.CRM_WEBHOOK_SECRET) {
    headers['X-Galaxy-Signature'] = createHmac('sha256', config.CRM_WEBHOOK_SECRET).update(body).digest('hex');
  }
  const res = await fetch(config.CRM_WEBHOOK_URL!, { method: 'POST', headers, body, signal: AbortSignal.timeout(10_000) });
  if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
}
