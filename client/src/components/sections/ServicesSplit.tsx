import { Link } from 'react-router';
import { servicesBySide } from '@/content/services';
import { homeContent } from '@/content/home';
import type { Service, Side } from '@/content/types';
import { ServiceGlyph } from '@/components/services/ServiceGlyph';
import { cn } from '@/lib/cn';

/**
 * The services overview, split into the two halves of the brand mark.
 * Used on the homepage and the /services page.
 */
export function ServicesSplit({ headingLevel = 'h3' }: { headingLevel?: 'h2' | 'h3' }) {
  return (
    <div className="grid gap-16 lg:grid-cols-2 lg:gap-0">
      <ServiceColumn side="creative" headingLevel={headingLevel} />
      <ServiceColumn side="engineering" headingLevel={headingLevel} />
    </div>
  );
}

function ServiceColumn({ side, headingLevel }: { side: Side; headingLevel: 'h2' | 'h3' }) {
  const meta = side === 'creative' ? homeContent.services.creative : homeContent.services.engineering;
  const Heading = headingLevel;
  return (
    <section
      aria-labelledby={`services-${side}`}
      className={cn(side === 'creative' ? 'lg:border-r lg:border-line lg:pr-12' : 'lg:pl-12')}
    >
      <div className="flex items-center gap-4 pb-6">
        {/* Half of the logo circle marks each discipline */}
        <svg viewBox="0 0 20 40" className={cn('h-10 w-5 shrink-0', side === 'engineering' && 'order-first')} aria-hidden>
          {side === 'creative' ? (
            <path d="M20 0A20 20 0 0 0 20 40z" fill="#7B5CFF" />
          ) : (
            <path d="M0 0A20 20 0 0 1 0 40z" fill="#2F6BFF" />
          )}
        </svg>
        <div>
          <Heading id={`services-${side}`} className="type-h3 text-ink">
            {meta.title}
          </Heading>
          <p className="type-small text-muted">{meta.description}</p>
        </div>
      </div>
      <ul className="border-t border-line">
        {servicesBySide[side].map((s) => (
          <ServiceRow key={s.slug} service={s} level={headingLevel === 'h2' ? 'h3' : 'h4'} />
        ))}
      </ul>
    </section>
  );
}

function ServiceRow({ service, level }: { service: Service; level: 'h3' | 'h4' }) {
  const RowHeading = level;
  const creative = service.side === 'creative';
  return (
    <li className="border-b border-line">
      <Link
        to={`/services/${service.slug}`}
        className="group grid grid-cols-[3rem_1fr] gap-x-5 gap-y-3 py-7 sm:grid-cols-[3.5rem_1fr]"
      >
        <ServiceGlyph id={service.glyph} side={service.side} className="size-12 sm:size-14" />
        <div>
          <RowHeading className="type-h4 text-ink sm:text-[1.25rem]">
            <span className="bg-[length:0%_1px] bg-left-bottom bg-no-repeat bg-gradient-to-r from-current to-current pb-0.5 transition-[background-size] duration-300 group-hover:bg-[length:100%_1px]">
              {service.title}
            </span>
          </RowHeading>
          <p className="mt-1.5 text-muted">{service.summary}</p>
          <ul className="mt-4 grid gap-1.5">
            {service.keyBenefits.map((b) => (
              <li key={b} className="type-small flex gap-2.5 text-slate">
                <span aria-hidden className={cn('mt-[0.55em] size-1.5 shrink-0 rounded-full', creative ? 'bg-violet' : 'bg-blue')} />
                {b}
              </li>
            ))}
          </ul>
          <p className={cn('type-meta mt-5 font-semibold', creative ? 'text-violet-strong' : 'text-blue-strong')}>
            View details<span className="sr-only"> about {service.title}</span>
          </p>
        </div>
      </Link>
    </li>
  );
}
