/**
 * Validation rules for every enquiry form.
 * The same schemas run in the browser (instant feedback) and on the server
 * (the source of truth — the API never trusts the browser).
 */
import { z } from 'zod';
import { isCountryCode } from './countries';
import {
  CURRENCY_VALUES,
  MEETING_VALUES,
  SERVICE_VALUES,
  TIME_WINDOW_VALUES,
  TIMELINE_VALUES,
} from './options';

const fullName = z
  .string({ error: 'Enter your full name' })
  .trim()
  .min(2, { error: 'Enter your full name' })
  .max(120, { error: 'Name must be 120 characters or fewer' });

const email = z
  .string({ error: 'Enter your email address' })
  .trim()
  .min(1, { error: 'Enter your email address' })
  .max(200, { error: 'Email must be 200 characters or fewer' })
  .email({ error: 'Enter a valid email address, like name@company.com' });

const PHONE_PATTERN = /^\+?[\d\s().-]{7,22}$/;
const phone = z
  .string()
  .trim()
  .max(25, { error: 'Phone number is too long' })
  .refine((v) => v === '' || (PHONE_PATTERN.test(v) && v.replace(/\D/g, '').length >= 7), {
    error: 'Enter a phone number with country code, like +91 98765 43210',
  });

const requiredPhone = phone.refine((v) => v !== '', {
  error: 'Enter a phone or WhatsApp number so we can reach you',
});

const country = z
  .string({ error: 'Select your country' })
  .refine((v) => isCountryCode(v), { error: 'Select your country' });

const optionalText = (max: number) =>
  z.string().trim().max(max, { error: `Keep this under ${max} characters` }).optional().default('');

/** Accepts "example.com" or "https://example.com"; stores a full https URL. */
const websiteUrl = z
  .string()
  .trim()
  .max(300, { error: 'Website address is too long' })
  .optional()
  .default('')
  .transform((v) => (v && !/^https?:\/\//i.test(v) ? `https://${v}` : v))
  .refine((v) => v === '' || /^https?:\/\/[^\s/$.?#][^\s]*\.[^\s]{2,}$/i.test(v), {
    error: 'Enter a valid website address, like example.com',
  });

/* -------------------------------------------------------------------------- */
/* Form schemas (what the visitor fills in)                                    */
/* -------------------------------------------------------------------------- */

export const projectFormSchema = z.object({
  fullName,
  companyName: optionalText(160),
  email,
  phone: requiredPhone,
  country,
  service: z.enum(SERVICE_VALUES, { error: 'Select the service you need' }),
  budgetCurrency: z.enum(CURRENCY_VALUES, { error: 'Select a currency' }),
  budgetAmount: optionalText(120),
  timeline: z.enum(TIMELINE_VALUES, { error: 'Select a timeline' }),
  description: z
    .string({ error: 'Tell us about your project' })
    .trim()
    .min(20, { error: 'Tell us a little more – at least 20 characters' })
    .max(5000, { error: 'Keep the description under 5,000 characters' }),
  websiteUrl,
});

export const contactFormSchema = z.object({
  fullName,
  companyName: optionalText(160),
  email,
  phone: phone.optional().default(''),
  country: country.optional().or(z.literal('')).default(''),
  message: z
    .string({ error: 'Write a short message' })
    .trim()
    .min(10, { error: 'Write a short message – at least 10 characters' })
    .max(5000, { error: 'Keep the message under 5,000 characters' }),
});

const slot = z.object({
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, { error: 'Choose a date' }),
  window: z.enum(TIME_WINDOW_VALUES, { error: 'Choose a time of day' }),
});

export const consultationFormSchema = z
  .object({
    fullName,
    companyName: optionalText(160),
    email,
    phone: phone.optional().default(''),
    country,
    timeZone: z.string().trim().min(1, { error: 'Select your time zone' }).max(80),
    meetingType: z.enum(MEETING_VALUES, { error: 'Choose how you would like to meet' }),
    service: z.enum(SERVICE_VALUES, { error: 'Select a topic' }),
    preferredSlots: z
      .array(slot)
      .min(1, { error: 'Suggest at least one date' })
      .max(3, { error: 'Suggest up to three dates' }),
    notes: optionalText(2000),
  })
  .superRefine((val, ctx) => {
    if ((val.meetingType === 'whatsapp' || val.meetingType === 'phone') && !val.phone) {
      ctx.addIssue({
        code: 'custom',
        path: ['phone'],
        message: 'Add a phone or WhatsApp number for this type of call',
      });
    }
  });

export type ProjectFormInput = z.input<typeof projectFormSchema>;
export type ProjectFormValues = z.output<typeof projectFormSchema>;
export type ContactFormInput = z.input<typeof contactFormSchema>;
export type ContactFormValues = z.output<typeof contactFormSchema>;
export type ConsultationFormInput = z.input<typeof consultationFormSchema>;
export type ConsultationFormValues = z.output<typeof consultationFormSchema>;

/* -------------------------------------------------------------------------- */
/* API payload (form + tracking + spam signals)                                */
/* -------------------------------------------------------------------------- */

const trimmed = (max: number) => z.string().trim().max(max).optional().default('');

/** Where the enquiry came from. Collected automatically by the website. */
export const trackingSchema = z.object({
  sourcePage: trimmed(300),
  landingPage: trimmed(300),
  referrer: trimmed(500),
  relatedProject: trimmed(120),
  utmSource: trimmed(200),
  utmMedium: trimmed(200),
  utmCampaign: trimmed(200),
  utmTerm: trimmed(200),
  utmContent: trimmed(200),
});

/** Spam signals: a hidden honeypot field, the time the form was opened, optional Turnstile token. */
export const spamSchema = z.object({
  hp: z.string().max(500).optional().default(''),
  startedAt: z.number().int().nonnegative().optional(),
  turnstileToken: z.string().max(4096).optional().default(''),
});

export const enquiryPayloadSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('project'), data: projectFormSchema, tracking: trackingSchema.prefault({}), spam: spamSchema.prefault({}) }),
  z.object({ type: z.literal('quote'), data: projectFormSchema, tracking: trackingSchema.prefault({}), spam: spamSchema.prefault({}) }),
  z.object({ type: z.literal('contact'), data: contactFormSchema, tracking: trackingSchema.prefault({}), spam: spamSchema.prefault({}) }),
  z.object({ type: z.literal('consultation'), data: consultationFormSchema, tracking: trackingSchema.prefault({}), spam: spamSchema.prefault({}) }),
]);

export type EnquiryPayload = z.input<typeof enquiryPayloadSchema>;
export type ParsedEnquiry = z.output<typeof enquiryPayloadSchema>;
export type Tracking = z.input<typeof trackingSchema>;

/** API response shapes */
export type EnquirySuccess = { ok: true; reference: string };
export type EnquiryFailure = {
  ok: false;
  error: string;
  fieldErrors?: Record<string, string>;
};
export type EnquiryResponse = EnquirySuccess | EnquiryFailure;
