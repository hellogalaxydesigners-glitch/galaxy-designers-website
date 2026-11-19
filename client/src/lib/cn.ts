/** Joins class names, skipping falsy values. */
export function cn(...parts: Array<string | false | null | undefined | 0 | 0n>) {
  return parts.filter(Boolean).join(' ');
}
