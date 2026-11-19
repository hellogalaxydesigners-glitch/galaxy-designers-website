import { useParams, Link } from 'react-router';
import { ChevronDown } from 'lucide-react';
import { getService, services } from '@/content/services';
import { projectsInCategories } from '@/content/projects';
import { siteConfig } from '@/content/site.config';
import { Seo, absoluteUrl, breadcrumbJsonLd, faqJsonLd } from '@/lib/seo';
import { PageIntro } from '@/components/ui/PageIntro';
import { ButtonLink } from '@/components/ui/Button';
import { ServiceGlyph } from '@/components/services/ServiceGlyph';
import { ProjectCard } from '@/components/portfolio/ProjectCard';
import { FinalCta } from '@/components/sections/FinalCta';
import { cn } from '@/lib/cn';
import NotFoundPage from './NotFoundPage';

export default function ServicePage() {
  const { slug } = useParams();
  const service = getService(slug);
  if (!service) return <NotFoundPage />;

  const creative = service.side === 'creative';
  const accentText = creative ? 'text-violet-strong' : 'text-blue-strong';
  const accentBg = creative ? 'bg-violet' : 'bg-blue';
  const path = `/services/${service.slug}`;
  const enquiryLink = `/start-a-project?service=${service.enquiryValue}`;
  const related = projectsInCategories(service.relatedCategories).slice(0, 3);
  const others = services.filter((s) => s.slug !== service.slug);
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: service.title, path },
  ];

  return (
    <>
      <Seo
        rawTitle
        title={`${service.seo.title} | ${siteConfig.name}`}
        description={service.seo.description}
        path={path}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: service.title,
            serviceType: service.title,
            description: service.seo.description,
            url: absoluteUrl(path),
            provider: { '@id': `${absoluteUrl('/')}#organization`, '@type': 'Organization', name: siteConfig.name },
            areaServed: ['India', 'United States', 'United Kingdom', 'Canada', 'Australia', 'Worldwide'],
          },
          breadcrumbJsonLd(crumbs),
          faqJsonLd(service.faqs),
        ]}
      />

      <PageIntro
        crumbs={crumbs}
        title={service.title}
        lead={service.summary}
        aside={
          <div className="hidden items-center gap-5 lg:flex lg:justify-end">
            <ServiceGlyph id={service.glyph} side={service.side} onDark className="size-28" />
          </div>
        }
      >
        <ButtonLink to={enquiryLink} size="lg">
          Start a project
        </ButtonLink>
        <ButtonLink to={`/consultation?service=${service.enquiryValue}`} size="lg" variant="outline-dark">
          Schedule a consultation
        </ButtonLink>
      </PageIntro>

      {/* Overview + who it is for */}
      <section aria-labelledby="overview-heading" className="section bg-white">
        <div className="container-site grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 id="overview-heading" className="type-h2 text-ink">
              What we do
            </h2>
            <div className="type-lead prose-site mt-6 max-w-[60ch] text-slate">
              {service.intro.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <aside aria-labelledby="ideal-heading" className="lg:col-span-4 lg:col-start-9">
            <h2 id="ideal-heading" className="type-h4 text-ink">
              Ideal for
            </h2>
            <ul className="mt-4 border-t border-line">
              {service.idealFor.map((item) => (
                <li key={item} className="flex gap-3 border-b border-line py-4 text-slate">
                  <span aria-hidden className={cn('mt-[0.55em] size-2 shrink-0 rounded-full', accentBg)} />
                  {item}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      {/* Deliverables */}
      <section aria-labelledby="deliver-heading" className="section bg-paper">
        <div className="container-site">
          <h2 id="deliver-heading" className="type-h2 max-w-[20ch] text-ink">
            What you get
          </h2>
          <ul className="mt-12 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
            {service.deliverables.map((d) => (
              <li key={d.title} className="border-t border-ink/15 py-7">
                <h3 className="type-h4 text-ink">{d.title}</h3>
                <p className="mt-2 text-muted">{d.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Approach */}
      <section aria-labelledby="approach-heading" className="section bg-white">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="approach-heading" className="type-h2 text-ink">
              How we approach it
            </h2>
            {service.technologies?.length ? (
              <div className="mt-10">
                <h3 className="type-meta text-muted">Tools and technologies</h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {service.technologies.map((t) => (
                    <li key={t} className="rounded-full border border-line px-3 py-1 text-sm text-slate">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
          <ol className="grid gap-0 lg:col-span-7 lg:col-start-6">
            {service.approach.map((step, i) => (
              <li key={step.title} className="grid grid-cols-[3rem_1fr] gap-4 border-t border-line py-7">
                <span className={cn('type-h3 tabular-nums', accentText)}>{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="type-h4 text-ink">{step.title}</h3>
                  <p className="mt-2 text-muted">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Related work */}
      {related.length > 0 && (
        <section aria-labelledby="related-heading" className="on-dark section bg-ink text-white">
          <div className="container-site">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <h2 id="related-heading" className="type-h2">
                Related work
              </h2>
              <ButtonLink to="/work" variant="outline-dark">
                View all work
              </ButtonLink>
            </div>
            <div className="mt-12 grid gap-14 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {related.map((p) => (
                <ProjectCard key={p.slug} project={p} size="md" tone="dark" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Quote prompt */}
      <section aria-label="Request a quotation" className="section-tight bg-paper">
        <div className="container-site">
          <div className="grid gap-6 rounded-lg bg-white p-8 sm:p-10 md:grid-cols-12 md:items-center">
            <div className="md:col-span-8">
              <p className="type-h3 text-ink">Need a quotation for {service.title}?</p>
              <p className="mt-2 text-muted">Tell us what you need. We will reply with questions, an approach and a cost estimate.</p>
            </div>
            <div className="md:col-span-4 md:justify-self-end">
              <ButtonLink to={`/start-a-project?type=quote&service=${service.enquiryValue}`}>Request a quotation</ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-heading" className="section bg-white">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <h2 id="faq-heading" className="type-h2 text-ink lg:col-span-4">
            Common questions
          </h2>
          <div className="lg:col-span-7 lg:col-start-6">
            {service.faqs.map((f) => (
              <details key={f.question} className="group border-t border-line last:border-b">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left [&::-webkit-details-marker]:hidden">
                  <span className="type-h4 text-ink">{f.question}</span>
                  <ChevronDown aria-hidden className="size-5 shrink-0 text-muted transition-transform group-open:rotate-180" />
                </summary>
                <p className="measure -mt-2 pb-6 text-muted">{f.answer}</p>
              </details>
            ))}
            <p className="mt-8 text-muted">
              Have a different question?{' '}
              <Link to="/contact" className="font-semibold text-violet-strong underline-offset-4 hover:underline">
                Contact us
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Other services – internal links */}
      <nav aria-labelledby="other-heading" className="section-tight border-t border-line bg-paper">
        <div className="container-site">
          <h2 id="other-heading" className="type-h4 text-ink">
            Other services
          </h2>
          <ul className="mt-6 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((s) => (
              <li key={s.slug}>
                <Link to={`/services/${s.slug}`} className="flex items-center gap-3 border-b border-line py-4 text-slate hover:text-ink">
                  <ServiceGlyph id={s.glyph} side={s.side} className="size-8" />
                  <span className="font-medium underline-offset-4 hover:underline">{s.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <FinalCta primary={{ label: 'Start a project', to: enquiryLink }} />
    </>
  );
}
