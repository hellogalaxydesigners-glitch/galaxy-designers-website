/**
 * Records where a visitor came from (first landing page, referrer, UTM tags)
 * for the duration of their visit, so every enquiry can be attributed.
 * Nothing is sent anywhere until the visitor submits a form.
 */
import type { Tracking } from '@galaxy/shared';

const KEY = 'gd_visit';

interface Visit {
  landingPage: string;
  referrer: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmTerm: string;
  utmContent: string;
}

function read(): Visit | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Visit) : null;
  } catch {
    return null;
  }
}

let memoryVisit: Visit | null = null;

/** Call once when the app starts in the browser. */
export function captureVisit() {
  if (typeof window === 'undefined') return;
  const existing = read();
  const params = new URLSearchParams(window.location.search);
  const hasUtm = ['utm_source', 'utm_medium', 'utm_campaign'].some((k) => params.has(k));
  if (existing && !hasUtm) {
    memoryVisit = existing;
    return;
  }
  const externalReferrer =
    document.referrer && !document.referrer.startsWith(window.location.origin) ? document.referrer : '';
  const visit: Visit = {
    landingPage: window.location.pathname + window.location.search,
    referrer: externalReferrer || existing?.referrer || '',
    utmSource: params.get('utm_source') ?? '',
    utmMedium: params.get('utm_medium') ?? '',
    utmCampaign: params.get('utm_campaign') ?? '',
    utmTerm: params.get('utm_term') ?? '',
    utmContent: params.get('utm_content') ?? '',
  };
  memoryVisit = visit;
  try {
    sessionStorage.setItem(KEY, JSON.stringify(visit));
  } catch {
    /* storage unavailable (private mode) – keep in memory only */
  }
}

export function getTracking(extra: { relatedProject?: string } = {}): Tracking {
  const visit = memoryVisit ?? read();
  const clip = (v: string | undefined, n: number) => (v ?? '').slice(0, n);
  return {
    sourcePage: typeof window !== 'undefined' ? clip(window.location.pathname + window.location.search, 300) : '',
    landingPage: clip(visit?.landingPage, 300),
    referrer: clip(visit?.referrer, 500),
    relatedProject: clip(extra.relatedProject, 120),
    utmSource: clip(visit?.utmSource, 200),
    utmMedium: clip(visit?.utmMedium, 200),
    utmCampaign: clip(visit?.utmCampaign, 200),
    utmTerm: clip(visit?.utmTerm, 200),
    utmContent: clip(visit?.utmContent, 200),
  };
}
