/**
 * Email notifications through any SMTP provider.
 * Enabled when SMTP_HOST, NOTIFY_EMAIL_TO and NOTIFY_EMAIL_FROM are set.
 */
import nodemailer, { type Transporter } from 'nodemailer';
import {
  countryName,
  CURRENCY_OPTIONS,
  labelFor,
  MEETING_OPTIONS,
  SERVICE_OPTIONS,
  TIME_WINDOW_OPTIONS,
  TIMELINE_OPTIONS,
} from '@galaxy/shared';
import { config } from '../config';
import type { StoredEnquiry } from '../storage';
import { escapeHtml } from '../lib/util';

let transporter: Transporter | null = null;
function getTransporter() {
  transporter ??= nodemailer.createTransport({
    host: config.SMTP_HOST,
    port: config.SMTP_PORT,
    secure: config.SMTP_SECURE,
    auth: config.SMTP_USER ? { user: config.SMTP_USER, pass: config.SMTP_PASS } : undefined,
  });
  return transporter;
}

const TYPE_LABEL: Record<string, string> = {
  project: 'New project enquiry',
  quote: 'Quotation request',
  contact: 'Contact message',
  consultation: 'Consultation request',
};

/** Rows shown in the team notification, in reading order. Empty values are skipped. */
function summaryRows(e: StoredEnquiry): [string, string][] {
  const d = e.details as {
    timeZone?: string;
    meetingType?: string;
    preferredSlots?: { date: string; window: string }[];
  };
  const rows: [string, string | null | undefined][] = [
    ['Reference', e.reference],
    ['Name', e.fullName],
    ['Company', e.companyName],
    ['Email', e.email],
    ['Phone / WhatsApp', e.phone],
    ['Country', e.country ? countryName(e.country) : null],
    ['Service', e.service ? labelFor(SERVICE_OPTIONS, e.service) : null],
    ['Budget', e.budgetCurrency ? `${labelFor(CURRENCY_OPTIONS, e.budgetCurrency)}${e.budgetAmount ? ` – ${e.budgetAmount}` : ' – not specified'}` : null],
    ['Timeline', e.timeline ? labelFor(TIMELINE_OPTIONS, e.timeline) : null],
    ['Website', e.websiteUrl],
    ['Meeting type', d.meetingType ? labelFor(MEETING_OPTIONS, d.meetingType) : null],
    ['Visitor time zone', d.timeZone],
    [
      'Preferred times',
      d.preferredSlots?.map((s) => `${s.date} – ${labelFor(TIME_WINDOW_OPTIONS, s.window)}`).join('; '),
    ],
    ['Related project', e.relatedProject],
    ['Submitted from', e.sourcePage],
    ['First page visited', e.landingPage],
    ['Referrer', e.referrer],
    ['Campaign', [e.utmSource, e.utmMedium, e.utmCampaign].filter(Boolean).join(' / ')],
    ['Received', new Date(e.createdAt).toUTCString()],
  ];
  return rows.filter((r): r is [string, string] => Boolean(r[1]));
}

export async function sendTeamNotification(e: StoredEnquiry) {
  const rows = summaryRows(e);
  const subject = `${TYPE_LABEL[e.type] ?? 'Enquiry'}: ${e.fullName}${e.companyName ? ` (${e.companyName})` : ''}${e.status === 'spam_suspected' ? ' [possible spam]' : ''}`;
  const text = [
    `${TYPE_LABEL[e.type]} – ${e.reference}`,
    '',
    ...rows.map(([k, v]) => `${k}: ${v}`),
    '',
    'Message:',
    e.message ?? '(none)',
  ].join('\n');
  const html = `<div style="font-family:Arial,sans-serif;font-size:14px;color:#262A36;max-width:640px">
    <h2 style="font-size:18px;color:#0A0F2C;margin:0 0 16px">${escapeHtml(TYPE_LABEL[e.type])}</h2>
    <table cellpadding="6" style="border-collapse:collapse;width:100%">
      ${rows.map(([k, v]) => `<tr><td style="color:#5B6075;vertical-align:top;width:170px;border-bottom:1px solid #eee">${escapeHtml(k)}</td><td style="border-bottom:1px solid #eee">${escapeHtml(v)}</td></tr>`).join('')}
    </table>
    <h3 style="font-size:15px;margin:20px 0 8px">Message</h3>
    <p style="white-space:pre-wrap;line-height:1.5;margin:0">${escapeHtml(e.message ?? '(none)')}</p>
  </div>`;

  await getTransporter().sendMail({
    from: config.NOTIFY_EMAIL_FROM,
    to: config.NOTIFY_EMAIL_TO,
    replyTo: `${e.fullName} <${e.email}>`,
    subject,
    text,
    html,
  });
}

/** Optional short confirmation to the visitor (SEND_CONFIRMATION_EMAIL=true). */
export async function sendVisitorConfirmation(e: StoredEnquiry) {
  const firstName = e.fullName.split(/\s+/)[0];
  const text = `Hi ${firstName},

Thank you for contacting Galaxy Designers. We have received your ${e.type === 'consultation' ? 'consultation request' : 'enquiry'} (reference ${e.reference}) and will reply within one business day.

If anything is urgent, reply to this email.

Galaxy Designers${config.SITE_URL ? `\n${config.SITE_URL}` : ''}`;
  await getTransporter().sendMail({
    from: config.NOTIFY_EMAIL_FROM,
    to: e.email,
    replyTo: config.NOTIFY_EMAIL_TO,
    subject: `We received your enquiry – ${e.reference}`,
    text,
  });
}
