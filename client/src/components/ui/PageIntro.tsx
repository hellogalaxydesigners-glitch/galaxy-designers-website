import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { cn } from '@/lib/cn';

export interface Crumb {
  name: string;
  path: string;
}

/** Opening band for inner pages: breadcrumb, H1, lead and optional actions. */
export function PageIntro({
  crumbs,
  title,
  lead,
  children,
  aside,
  className,
}: {
  crumbs: Crumb[];
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
  aside?: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn('on-dark relative overflow-hidden bg-ink text-white', className)}>
      <div className="container-site pt-10 pb-16 sm:pt-14 sm:pb-20 lg:pb-24">
        <Breadcrumbs crumbs={crumbs} />
        <div className={cn('mt-10 grid gap-10 sm:mt-14', aside && 'lg:grid-cols-12 lg:items-end')}>
          <div className={cn(aside && 'lg:col-span-8')}>
            <h1 className="type-h1 max-w-[20ch]">{title}</h1>
            {lead ? <p className="type-lead mt-6 max-w-[58ch] text-white/75">{lead}</p> : null}
            {children ? <div className="mt-9 flex flex-wrap gap-3">{children}</div> : null}
          </div>
          {aside ? <div className="lg:col-span-4">{aside}</div> : null}
        </div>
      </div>
    </section>
  );
}

export function Breadcrumbs({ crumbs, tone = 'dark' }: { crumbs: Crumb[]; tone?: 'dark' | 'light' }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className={cn('type-meta flex flex-wrap items-center gap-x-2 gap-y-1', tone === 'dark' ? 'text-white/60' : 'text-muted')}>
        {crumbs.map((c, i) => {
          const last = i === crumbs.length - 1;
          return (
            <li key={c.path} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className={tone === 'dark' ? 'text-white/90' : 'text-ink'}>
                  {c.name}
                </span>
              ) : (
                <>
                  <Link to={c.path} className="underline-offset-4 hover:underline">
                    {c.name}
                  </Link>
                  <span aria-hidden="true">/</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
