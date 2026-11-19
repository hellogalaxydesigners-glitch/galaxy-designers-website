import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/** Left-aligned section heading with optional intro and action. */
export function SectionHeader({
  id,
  title,
  intro,
  action,
  tone = 'light',
  className,
}: {
  id?: string;
  title: ReactNode;
  intro?: ReactNode;
  action?: ReactNode;
  tone?: 'light' | 'dark';
  className?: string;
}) {
  return (
    <div className={cn('grid gap-6 lg:grid-cols-12 lg:items-end', className)}>
      <div className="lg:col-span-8">
        <h2 id={id} className={cn('type-h2 max-w-[22ch]', tone === 'dark' ? 'text-white' : 'text-ink')}>
          {title}
        </h2>
        {intro ? (
          <p className={cn('type-lead mt-5 max-w-[58ch]', tone === 'dark' ? 'text-white/70' : 'text-muted')}>{intro}</p>
        ) : null}
      </div>
      {action ? <div className="lg:col-span-4 lg:justify-self-end">{action}</div> : null}
    </div>
  );
}
