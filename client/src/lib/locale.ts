/** Helpers for adapting forms to the visitor's location and time zone. */

export function visitorTimeZone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
  } catch {
    return 'UTC';
  }
}

/** Countries that can be inferred reliably from a time zone. Others are left for the visitor to choose. */
const TZ_COUNTRY: Record<string, string> = {
  'Asia/Kolkata': 'IN',
  'Asia/Calcutta': 'IN',
  'Europe/London': 'GB',
  'Asia/Dubai': 'AE',
  'Asia/Singapore': 'SG',
  'Australia/Sydney': 'AU',
  'Australia/Melbourne': 'AU',
  'Australia/Brisbane': 'AU',
  'Australia/Perth': 'AU',
  'Australia/Adelaide': 'AU',
  'America/Toronto': 'CA',
  'America/Vancouver': 'CA',
  'America/Edmonton': 'CA',
  'America/Winnipeg': 'CA',
  'America/Halifax': 'CA',
  'America/New_York': 'US',
  'America/Chicago': 'US',
  'America/Denver': 'US',
  'America/Los_Angeles': 'US',
  'America/Phoenix': 'US',
};

export function guessCountryFromTimeZone(): string | null {
  if (typeof window === 'undefined') return null;
  return TZ_COUNTRY[visitorTimeZone()] ?? null;
}

/** Every IANA time zone the browser knows, with a sensible fallback list. */
export function allTimeZones(): string[] {
  try {
    const list = (Intl as unknown as { supportedValuesOf?: (k: string) => string[] }).supportedValuesOf?.('timeZone');
    if (list?.length) return list;
  } catch {
    /* ignore */
  }
  return ['Asia/Kolkata', 'Asia/Dubai', 'Asia/Singapore', 'Europe/London', 'Europe/Paris', 'America/New_York', 'America/Chicago', 'America/Los_Angeles', 'America/Toronto', 'Australia/Sydney', 'UTC'];
}

/** "GMT+5:30" style offset label for a time zone at a given moment. */
export function offsetLabel(timeZone: string, at = new Date()) {
  try {
    const part = new Intl.DateTimeFormat('en-GB', { timeZone, timeZoneName: 'shortOffset' })
      .formatToParts(at)
      .find((p) => p.type === 'timeZoneName');
    return part?.value ?? '';
  } catch {
    return '';
  }
}

/** Offset of a time zone from UTC in minutes at a given instant. */
function tzOffsetMinutes(timeZone: string, at: Date) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-US', {
      timeZone,
      hourCycle: 'h23',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
      .formatToParts(at)
      .map((p) => [p.type, p.value]),
  );
  const asUtc = Date.UTC(+parts.year, +parts.month - 1, +parts.day, +parts.hour, +parts.minute, +parts.second);
  return (asUtc - at.getTime()) / 60000;
}

/**
 * Converts a local wall-clock time in one zone to a formatted time in another,
 * e.g. 9:00 on 2026-11-24 in Europe/London → "2:30 pm" in Asia/Kolkata.
 */
export function convertTime(date: string, hour: number, fromZone: string, toZone: string) {
  try {
    const [y, m, d] = date.split('-').map(Number);
    const guess = new Date(Date.UTC(y, m - 1, d, hour, 0));
    const instant = new Date(guess.getTime() - tzOffsetMinutes(fromZone, guess) * 60000);
    return new Intl.DateTimeFormat('en-GB', { timeZone: toZone, hour: 'numeric', minute: '2-digit', hour12: true }).format(instant);
  } catch {
    return '';
  }
}
