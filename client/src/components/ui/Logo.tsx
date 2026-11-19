import { Link } from 'react-router';
import { cn } from '@/lib/cn';

/** Inline logo (mark + wordmark) from the brand pack. */
export function Logo({ tone = 'dark', className }: { tone?: 'dark' | 'light'; className?: string }) {
  const src = tone === 'dark' ? '/brand/logo-inline-on-dark.svg' : '/brand/logo-inline-on-light.svg';
  return (
    <Link to="/" className={cn('inline-flex shrink-0 items-center', className)} aria-label="Galaxy Designers – home">
      <img src={src} alt="Galaxy Designers" width={570} height={88} className="h-7 w-auto sm:h-8" />
    </Link>
  );
}

/** The G/D brand mark on its own. */
export function BrandMark({ className, title }: { className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 88 88" className={className} role={title ? 'img' : undefined} aria-hidden={title ? undefined : true}>
      {title ? <title>{title}</title> : null}
      <path fill="#7B5CFF" d="M41.8 87.945A44 44 0 0 1 41.8 0.055L41.8 11.073A33 33 0 0 0 30.8 74.245L30.8 55L21.8 55L21.8 44L41.8 44Z" />
      <path fill="#2F6BFF" fillRule="evenodd" d="M46.2 0.055A44 44 0 0 1 46.2 87.945ZM57.2 13.755A33 33 0 0 1 57.2 74.245Z" />
    </svg>
  );
}
