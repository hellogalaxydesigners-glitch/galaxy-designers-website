import { testimonials } from '@/content/testimonials';
import { homeContent } from '@/content/home';
import { siteConfig } from '@/content/site.config';
import { SampleBadge } from '@/components/ui/SampleBadge';

/**
 * Client testimonials. Placeholders are labelled; the section hides itself
 * when there is nothing to show.
 */
export function Testimonials() {
  const visible = testimonials.filter((t) => !t.isPlaceholder || siteConfig.features.showPlaceholderTestimonials);
  if (!visible.length) return null;

  return (
    <section aria-labelledby="testimonials-heading" className="section bg-paper">
      <div className="container-site">
        <h2 id="testimonials-heading" className="type-h2 text-ink">
          {homeContent.testimonials.heading}
        </h2>
        <ul className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {visible.map((t, i) => (
            <li key={i}>
              <figure className="flex h-full flex-col border-t-2 border-ink pt-6">
                {t.isPlaceholder && <SampleBadge label="Placeholder" className="mb-4 self-start text-muted" />}
                <blockquote className="type-lead flex-1 text-slate">
                  <p>“{t.quote}”</p>
                </blockquote>
                <figcaption className="mt-6">
                  <span className="block font-semibold text-ink">{t.name}</span>
                  {(t.role || t.company) && (
                    <span className="type-small block text-muted">{[t.role, t.company].filter(Boolean).join(', ')}</span>
                  )}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
