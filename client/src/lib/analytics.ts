/**
 * Google Analytics 4, loaded only when a measurement ID is configured AND the
 * visitor has accepted analytics cookies. Until then nothing is loaded.
 */
import { siteConfig } from '@/content/site.config';

const CONSENT_KEY = 'gd_analytics_consent';
export type Consent = 'granted' | 'denied' | null;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const analyticsEnabled = () => Boolean(siteConfig.integrations.gaMeasurementId);

export function getConsent(): Consent {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === 'granted' || v === 'denied' ? v : null;
  } catch {
    return null;
  }
}

export function setConsent(value: 'granted' | 'denied') {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* ignore */
  }
  if (value === 'granted') loadAnalytics();
}

let loaded = false;
export function loadAnalytics() {
  const id = siteConfig.integrations.gaMeasurementId;
  if (loaded || !id || typeof window === 'undefined') return;
  loaded = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', id, { anonymize_ip: true });
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(s);
}

/** Records a page view after client-side navigation. */
export function trackPageView(path: string) {
  if (loaded && window.gtag) window.gtag('event', 'page_view', { page_path: path });
}

/** Records a lead (form submitted successfully) – appears as a conversion in GA4. */
export function trackLead(type: string, service?: string) {
  if (loaded && window.gtag) window.gtag('event', 'generate_lead', { enquiry_type: type, service });
}

export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (loaded && window.gtag) window.gtag('event', name, params);
}
