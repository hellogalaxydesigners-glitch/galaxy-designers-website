import { homeContent } from '@/content/home';

export function WhyUs() {
  const { heading, intro, points } = homeContent.whyUs;
  return (
    <section aria-labelledby="why-heading" className="section bg-white">
      <div className="container-site grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <h2 id="why-heading" className="type-h2 max-w-[16ch] text-ink">
              {heading}
            </h2>
            <p className="type-lead mt-6 max-w-[44ch] text-muted">{intro}</p>
          </div>
        </div>
        <ul className="grid gap-x-10 sm:grid-cols-2 lg:col-span-7">
          {points.map((p, i) => (
            <li key={p.title} className="border-t border-line py-7">
              <div className="flex items-center gap-3">
                {/* Alternate the two halves of the mark */}
                <svg viewBox="0 0 12 24" className="h-5 w-2.5 shrink-0" aria-hidden>
                  {i % 2 === 0 ? <path d="M12 0A12 12 0 0 0 12 24z" fill="#7B5CFF" /> : <path d="M0 0A12 12 0 0 1 0 24z" fill="#2F6BFF" />}
                </svg>
                <h3 className="type-h4 text-ink">{p.title}</h3>
              </div>
              <p className="mt-2.5 text-muted">{p.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
