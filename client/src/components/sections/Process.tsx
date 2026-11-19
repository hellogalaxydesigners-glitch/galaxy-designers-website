import { homeContent } from '@/content/home';
import { cn } from '@/lib/cn';

/**
 * The six-step working process. Numbered because it is a true sequence.
 * Horizontal track on large screens, vertical timeline on phones.
 */
export function Process({ className }: { className?: string }) {
  const { heading, intro, steps } = homeContent.process;
  return (
    <section aria-labelledby="process-heading" className={cn('section bg-paper', className)}>
      <div className="container-site">
        <h2 id="process-heading" className="type-h2 max-w-[18ch] text-ink">
          {heading}
        </h2>
        <p className="type-lead mt-5 max-w-[52ch] text-muted">{intro}</p>

        <ol className="relative mt-14 grid gap-0 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-3 xl:grid-cols-6 xl:gap-x-6">
          {steps.map((step, i) => (
            <li key={step.title} className="relative pb-10 pl-10 sm:pl-0 xl:pb-0">
              {/* Vertical line on phones */}
              {i < steps.length - 1 && <span aria-hidden className="absolute top-3 bottom-0 left-[0.4375rem] w-px bg-line sm:hidden" />}
              <div className="relative flex items-center sm:mb-6">
                <span
                  aria-hidden
                  className={cn(
                    'absolute top-1/2 -left-10 size-3.5 -translate-y-1/2 rounded-full border-[3px] border-paper sm:static sm:translate-y-0',
                    i < 3 ? 'bg-violet' : 'bg-blue',
                  )}
                />
                <span aria-hidden className="ml-4 hidden h-px flex-1 bg-line sm:block" />
              </div>
              <p className="type-meta mt-0 text-muted tabular-nums sm:mt-0">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="type-h4 mt-1 text-ink">{step.title}</h3>
              <p className="type-small mt-2 text-muted">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
