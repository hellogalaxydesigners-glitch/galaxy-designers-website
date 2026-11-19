/**
 * Sends enquiries to the backend API. Returns a typed result instead of
 * throwing, so forms can show a precise message for each failure.
 */
import type { EnquiryPayload, EnquiryResponse } from '@galaxy/shared';
import { siteConfig } from '@/content/site.config';

const TIMEOUT_MS = 20_000;

export async function submitEnquiry(payload: EnquiryPayload): Promise<EnquiryResponse> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(`${siteConfig.integrations.apiBaseUrl}/api/enquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    let body: EnquiryResponse | null = null;
    try {
      body = (await res.json()) as EnquiryResponse;
    } catch {
      /* non-JSON response */
    }
    if (body && typeof body.ok === 'boolean') return body;
    if (res.status === 429) {
      return { ok: false, error: 'Too many submissions from your connection. Wait a few minutes and try again.' };
    }
    return {
      ok: false,
      error: `The server could not process the form (error ${res.status}). Try again, or contact us by email or WhatsApp.`,
    };
  } catch (err) {
    const aborted = err instanceof DOMException && err.name === 'AbortError';
    return {
      ok: false,
      error: aborted
        ? 'The request timed out. Check your connection and try again.'
        : 'Could not reach our server. Check your internet connection and try again, or contact us by email or WhatsApp.',
    };
  } finally {
    clearTimeout(timer);
  }
}
