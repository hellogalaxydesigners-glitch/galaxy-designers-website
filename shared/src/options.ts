/**
 * Option lists shared by the website forms and the API.
 * Edit labels here and both the browser and the server stay in sync.
 */

export const SERVICE_OPTIONS = [
  { value: 'website-development', label: 'Website Development' },
  { value: 'mobile-app', label: 'Mobile Application' },
  { value: 'web-app', label: 'Web Application' },
  { value: 'automation', label: 'Automation' },
  { value: 'ai-integration', label: 'AI Integration' },
  { value: 'graphic-design', label: 'Graphic Designing' },
  { value: 'ugc-video', label: 'UGC Videos' },
  { value: 'digital-marketing', label: 'Digital Marketing' },
  { value: 'other', label: 'Other' },
] as const;

export type ServiceValue = (typeof SERVICE_OPTIONS)[number]['value'];
export const SERVICE_VALUES = SERVICE_OPTIONS.map((o) => o.value) as [ServiceValue, ...ServiceValue[]];

export const TIMELINE_OPTIONS = [
  { value: 'asap', label: 'As soon as possible' },
  { value: '1-3-months', label: 'Within 1–3 months' },
  { value: '3-6-months', label: 'Within 3–6 months' },
  { value: '6-plus-months', label: 'More than 6 months away' },
  { value: 'flexible', label: 'Flexible / not decided' },
] as const;

export type TimelineValue = (typeof TIMELINE_OPTIONS)[number]['value'];
export const TIMELINE_VALUES = TIMELINE_OPTIONS.map((o) => o.value) as [TimelineValue, ...TimelineValue[]];

/**
 * Currencies offered on the budget field. No price ranges are shown on the
 * site: the client picks a currency and may type an approximate figure.
 * To introduce ranges later, add them in client/src/content/enquiry.ts.
 */
export const CURRENCY_OPTIONS = [
  { value: 'INR', label: 'INR – Indian rupee (₹)' },
  { value: 'USD', label: 'USD – US dollar ($)' },
  { value: 'GBP', label: 'GBP – British pound (£)' },
  { value: 'EUR', label: 'EUR – Euro (€)' },
  { value: 'CAD', label: 'CAD – Canadian dollar (C$)' },
  { value: 'AUD', label: 'AUD – Australian dollar (A$)' },
  { value: 'AED', label: 'AED – UAE dirham' },
  { value: 'SGD', label: 'SGD – Singapore dollar (S$)' },
  { value: 'OTHER', label: 'Other currency' },
] as const;

export type CurrencyValue = (typeof CURRENCY_OPTIONS)[number]['value'];
export const CURRENCY_VALUES = CURRENCY_OPTIONS.map((o) => o.value) as [CurrencyValue, ...CurrencyValue[]];

export const MEETING_OPTIONS = [
  { value: 'video', label: 'Video call (Google Meet / Zoom)' },
  { value: 'whatsapp', label: 'WhatsApp call' },
  { value: 'phone', label: 'Phone call' },
] as const;

export type MeetingValue = (typeof MEETING_OPTIONS)[number]['value'];
export const MEETING_VALUES = MEETING_OPTIONS.map((o) => o.value) as [MeetingValue, ...MeetingValue[]];

export const TIME_WINDOW_OPTIONS = [
  { value: 'morning', label: 'Morning (9am – 12pm)' },
  { value: 'afternoon', label: 'Afternoon (12pm – 4pm)' },
  { value: 'evening', label: 'Evening (4pm – 8pm)' },
] as const;

export type TimeWindowValue = (typeof TIME_WINDOW_OPTIONS)[number]['value'];
export const TIME_WINDOW_VALUES = TIME_WINDOW_OPTIONS.map((o) => o.value) as [TimeWindowValue, ...TimeWindowValue[]];

export const ENQUIRY_TYPES = ['project', 'quote', 'contact', 'consultation'] as const;
export type EnquiryType = (typeof ENQUIRY_TYPES)[number];

export function labelFor<T extends { value: string; label: string }>(options: readonly T[], value: string | undefined | null) {
  return options.find((o) => o.value === value)?.label ?? value ?? '';
}
