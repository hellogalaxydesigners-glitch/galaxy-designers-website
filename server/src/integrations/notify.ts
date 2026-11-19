/**
 * Runs every configured notification after an enquiry is saved.
 * Failures never affect the visitor (the enquiry is already stored);
 * each result is recorded on the enquiry for follow-up.
 *
 * To add a channel (e.g. WhatsApp Business API, Slack), add a step below.
 */
import { config } from '../config';
import type { EnquiryStore, StoredEnquiry } from '../storage';
import { sendTeamNotification, sendVisitorConfirmation } from './email';
import { sendWebhook } from './webhook';

type StepResult = { status: 'sent' | 'skipped' | 'failed'; detail?: string; at: string };

async function run(name: string, enabled: boolean, fn: () => Promise<void>): Promise<[string, StepResult]> {
  const at = new Date().toISOString();
  if (!enabled) return [name, { status: 'skipped', detail: 'not configured', at }];
  try {
    await fn();
    return [name, { status: 'sent', at }];
  } catch (err) {
    const detail = (err as Error).message;
    console.error(`[notify] ${name} failed:`, detail);
    return [name, { status: 'failed', detail, at }];
  }
}

export async function notifyNewEnquiry(store: EnquiryStore, enquiry: StoredEnquiry) {
  const results = await Promise.all([
    run('email', config.emailEnabled, () => sendTeamNotification(enquiry)),
    run(
      'confirmationEmail',
      config.emailEnabled && config.SEND_CONFIRMATION_EMAIL && enquiry.status !== 'spam_suspected',
      () => sendVisitorConfirmation(enquiry),
    ),
    run('crmWebhook', Boolean(config.CRM_WEBHOOK_URL), () => sendWebhook(enquiry)),
  ]);
  const summary = Object.fromEntries(results);
  try {
    await store.recordNotifications(enquiry.id, summary);
  } catch (err) {
    console.error('[notify] could not record notification result:', (err as Error).message);
  }
  return summary;
}
