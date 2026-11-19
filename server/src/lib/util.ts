import { createHash, randomInt } from 'node:crypto';
import { config } from '../config';

const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // no 0/O/1/I to avoid confusion

/** Human-friendly reference, e.g. GD-261119-K7QM */
export function makeReference(date = new Date()) {
  const ymd = date.toISOString().slice(2, 10).replace(/-/g, '');
  const suffix = Array.from({ length: 4 }, () => ALPHABET[randomInt(ALPHABET.length)]).join('');
  return `GD-${ymd}-${suffix}`;
}

/** One-way hash of the IP so repeated spam can be spotted without storing the address. */
export function hashIp(ip: string | undefined) {
  if (!ip) return null;
  const salt = config.IP_HASH_SALT ?? 'galaxy-designers-default-salt';
  return createHash('sha256').update(`${salt}:${ip}`).digest('hex').slice(0, 32);
}

export const emptyToNull = (v: string | undefined | null) => (v && v.trim() !== '' ? v.trim() : null);

export function escapeHtml(value: unknown) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
