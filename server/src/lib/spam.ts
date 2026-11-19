/**
 * Spam protection, in layers:
 *  1. Rate limiting per IP (see app.ts)
 *  2. Honeypot – a hidden field people never see; bots fill it in
 *  3. Minimum time to fill in the form
 *  4. Optional Cloudflare Turnstile verification (when TURNSTILE_SECRET_KEY is set)
 *  5. Content heuristics – suspicious messages are stored but flagged
 */
import { config } from '../config';

const MIN_FILL_MS = 3_000;

export type SpamVerdict =
  | { kind: 'ok' }
  | { kind: 'silent-drop'; reason: string } // obvious bot: pretend success, store nothing
  | { kind: 'reject'; message: string } // tell the visitor what to do
  | { kind: 'flag'; reason: string }; // store, but mark as spam_suspected

export async function checkSpam(input: {
  hp: string;
  startedAt?: number;
  turnstileToken: string;
  ip: string | undefined;
  text: string;
}): Promise<SpamVerdict> {
  if (input.hp.trim() !== '') return { kind: 'silent-drop', reason: 'honeypot' };

  if (input.startedAt && Date.now() - input.startedAt < MIN_FILL_MS) {
    return { kind: 'silent-drop', reason: 'too-fast' };
  }

  if (config.TURNSTILE_SECRET_KEY) {
    if (!input.turnstileToken) {
      return { kind: 'reject', message: 'Please complete the spam check above the submit button and try again.' };
    }
    const ok = await verifyTurnstile(input.turnstileToken, input.ip);
    if (!ok) return { kind: 'reject', message: 'The spam check could not be verified. Refresh the page and try again.' };
  }

  const links = (input.text.match(/https?:\/\//gi) ?? []).length;
  if (links > 4) return { kind: 'flag', reason: 'many-links' };
  if (/\b(viagra|casino|crypto ?airdrop|seo backlinks? package)\b/i.test(input.text)) {
    return { kind: 'flag', reason: 'keywords' };
  }

  return { kind: 'ok' };
}

async function verifyTurnstile(token: string, ip: string | undefined) {
  try {
    const body = new URLSearchParams({ secret: config.TURNSTILE_SECRET_KEY!, response: token });
    if (ip) body.set('remoteip', ip);
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body,
      signal: AbortSignal.timeout(8_000),
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch (err) {
    console.error('[spam] Turnstile verification failed:', (err as Error).message);
    return false;
  }
}
