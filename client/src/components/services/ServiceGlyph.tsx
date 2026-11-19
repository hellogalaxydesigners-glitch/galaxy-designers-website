/**
 * One geometric glyph per service, drawn from the same half-circle language
 * as the logo. The accent element takes the colour of the service's side:
 * violet for creative services, blue for engineering.
 */
import type { GlyphId, Side } from '@/content/types';
import { cn } from '@/lib/cn';

interface Props {
  id: GlyphId;
  side: Side;
  className?: string;
  /** Use lighter strokes on dark backgrounds */
  onDark?: boolean;
}

export function ServiceGlyph({ id, side, className, onDark }: Props) {
  const accent = side === 'creative' ? '#7B5CFF' : '#2F6BFF';
  const stroke = onDark ? 'rgba(255,255,255,0.85)' : '#0A0F2C';
  const common = { fill: 'none', stroke, strokeWidth: 1.75, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

  return (
    <svg viewBox="0 0 48 48" className={cn('size-12 shrink-0', className)} aria-hidden="true">
      {GLYPHS[id](accent, common)}
    </svg>
  );
}

type Common = { fill: string; stroke: string; strokeWidth: number; strokeLinecap: 'round'; strokeLinejoin: 'round' };

const GLYPHS: Record<GlyphId, (accent: string, c: Common) => React.ReactNode> = {
  // Browser frame with a half-disc "hero" inside
  website: (a, c) => (
    <>
      <rect x="5" y="9" width="38" height="30" rx="3" {...c} />
      <path d="M5 16h38" {...c} />
      <path d="M24 22a8 8 0 0 0 0 16z" fill={a} />
      <path d="M28 26h9M28 31h6" {...c} />
    </>
  ),
  // Phone with half-disc screen element
  mobile: (a, c) => (
    <>
      <rect x="14" y="4" width="20" height="40" rx="4" {...c} />
      <path d="M21 9h6" {...c} />
      <path d="M24 17a7 7 0 0 1 0 14z" fill={a} />
      <path d="M24 17a7 7 0 0 0 0 14" {...c} />
    </>
  ),
  // Dashboard grid where one tile becomes a half-disc
  webapp: (a, c) => (
    <>
      <rect x="5" y="7" width="38" height="34" rx="3" {...c} />
      <path d="M17 7v34M17 20h26" {...c} />
      <path d="M22 34l6-6 5 4 6-8" {...c} />
      <path d="M11 12a4 4 0 0 1 0 8z" fill={a} />
    </>
  ),
  // Two linked loops – a process that runs itself
  automation: (a, c) => (
    <>
      <circle cx="15" cy="24" r="9" {...c} />
      <path d="M33 15a9 9 0 0 1 0 18z" fill={a} />
      <path d="M33 15a9 9 0 0 0 0 18" {...c} />
      <path d="M22 18.5l4 0M22 29.5l4 0" {...c} />
      <path d="M24 16.5l2 2-2 2M26 27.5l-2 2 2 2" {...c} />
    </>
  ),
  // Network of nodes around a split core
  ai: (a, c) => (
    <>
      <path d="M24 16a8 8 0 0 0 0 16z" fill={a} />
      <path d="M24 16a8 8 0 0 1 0 16" {...c} />
      <circle cx="8" cy="10" r="2.5" {...c} />
      <circle cx="40" cy="10" r="2.5" {...c} />
      <circle cx="8" cy="38" r="2.5" {...c} />
      <circle cx="40" cy="38" r="2.5" {...c} />
      <path d="M10 12l8 6M38 12l-8 6M10 36l8-6M38 36l-8-6" {...c} />
    </>
  ),
  // A bezier curve with its anchor and handle – the designer's tool
  graphic: (a, c) => (
    <>
      <path d="M6 38C14 12 30 12 42 30" {...c} />
      <rect x="3" y="35" width="6" height="6" rx="1" {...c} />
      <rect x="39" y="27" width="6" height="6" rx="1" {...c} />
      <path d="M24 10l8 0" {...c} />
      <circle cx="21" cy="10" r="3.5" fill={a} />
    </>
  ),
  // Play mark within a frame
  video: (a, c) => (
    <>
      <rect x="4" y="10" width="40" height="28" rx="3" {...c} />
      <path d="M20 17v14l11-7z" fill={a} />
      <path d="M4 32h40" {...c} strokeDasharray="2 4" />
    </>
  ),
  // Signal arcs radiating from a half-disc source
  marketing: (a, c) => (
    <>
      <path d="M8 18a6 6 0 0 1 0 12z" fill={a} />
      <path d="M8 18a6 6 0 0 0 0 12" {...c} />
      <path d="M20 14a14 14 0 0 1 0 20" {...c} />
      <path d="M28 9a21 21 0 0 1 0 30" {...c} />
      <path d="M36 4a28 28 0 0 1 0 40" {...c} />
    </>
  ),
};
