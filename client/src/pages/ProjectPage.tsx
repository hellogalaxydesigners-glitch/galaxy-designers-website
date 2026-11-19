import type { ReactNode } from 'react';
import { Link, useParams } from 'react-router';
import { ExternalLink } from 'lucide-react';
import { categoryLabel, getProject, relatedProjects } from '@/content/projects';
import { serviceForEnquiryValue } from '@/content/services';
import { siteConfig } from '@/content/site.config';
import { labelFor, SERVICE_OPTIONS } from '@galaxy/shared';
import { Seo, absoluteUrl, breadcrumbJsonLd } from '@/lib/seo';
import { Breadcrumbs } from '@/components/ui/PageIntro';
import { ButtonLink } from '@/components/ui/Button';
import { ResponsiveImage } from '@/components/ui/ResponsiveImage';
import { SampleBadge } from '@/components/ui/SampleBadge';
import { ProjectCard } from '@/components/portfolio/ProjectCard';
import NotFoundPage from './NotFoundPage';

function formatMonth(value: string) {
  const [y, m] = value.split('-').map(Number);
  if (!y || !m) return value;
  return new Date(Date.UTC(y, m - 1, 1)).toLocaleDateString('en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' });
}

export default function ProjectPage() {
  const { slug } = useParams();
  const project = getProject(slug);
  if (!project) return <NotFoundPage />;

  const path = `/work/${project.slug}`;
  const cs = project.caseStudy;
  const related = relatedProjects(project, 3);
  const primaryService = project.services[0];
  const enquiryLink = `/start-a-project?ref=${project.slug}${primaryService ? `&service=${primaryService}` : ''}`;
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Work', path: '/work' },
    { name: project.title, path },
  ];

  const facts: { label: string; value: ReactNode }[] = [
    ...(project.clientName ? [{ label: 'Client', value: project.clientName }] : []),
    { label: 'Industry', value: project.industry },
    ...(project.location ? [{ label: 'Location', value: project.location }] : []),
    { label: 'Category', value: project.categories.map(categoryLabel).join(', ') },
    {
      label: 'Services',
      value: (
        <ul className="grid gap-1">
          {project.services.map((s) => {
            const service = serviceForEnquiryValue(s);
            return (
              <li key={s}>
                {service ? (
                  <Link to={`/services/${service.slug}`} className="underline-offset-4 hover:underline">
                    {service.title}
                  </Link>
                ) : (
                  labelFor(SERVICE_OPTIONS, s)
                )}
              </li>
            );
          })}
        </ul>
      ),
    },
    ...(project.completedOn ? [{ label: 'Completed', value: formatMonth(project.completedOn) }] : []),
  ];

  return (
    <>
      <Seo
        title={`${project.title} – ${project.tagline}`}
        description={project.description}
        path={path}
        type="article"
        image={`${project.cover.src}-1600.webp`}
        imageAlt={project.cover.alt}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'CreativeWork',
            name: project.title,
            headline: project.tagline,
            description: project.description,
            url: absoluteUrl(path),
            image: absoluteUrl(`${project.cover.src}-1600.webp`),
            creator: { '@id': `${absoluteUrl('/')}#organization`, '@type': 'Organization', name: siteConfig.name },
            keywords: [...project.technologies, project.industry].join(', '),
            ...(project.completedOn ? { dateCreated: project.completedOn } : {}),
          },
          breadcrumbJsonLd(crumbs),
        ]}
      />

      {/* Header */}
      <section className="on-dark bg-ink text-white">
        <div className="container-site pt-10 pb-14 sm:pt-14">
          <Breadcrumbs crumbs={crumbs} />
          <div className="mt-10 grid gap-10 sm:mt-14 lg:grid-cols-12">
            <div className="lg:col-span-8">
              {project.isSample && <SampleBadge className="mb-6 text-lavender" />}
              <h1 className="type-display">{project.title}</h1>
              <p className="type-lead mt-6 max-w-[48ch] text-white/75">{project.tagline}</p>
            </div>
            <dl className="grid content-start gap-5 text-[0.9375rem] sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1">
              {facts.map((f) => (
                <div key={f.label} className="border-t border-white/15 pt-3">
                  <dt className="type-meta text-white/50">{f.label}</dt>
                  <dd className="mt-1 text-white/90">{f.value}</dd>
                </div>
              ))}
              {project.liveUrl && (
                <div className="border-t border-white/15 pt-3">
                  <dt className="type-meta text-white/50">Live site</dt>
                  <dd className="mt-1">
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-lavender underline-offset-4 hover:underline">
                      Visit website <ExternalLink aria-hidden className="size-3.5" />
                    </a>
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </div>
        <div className="container-site pb-0">
          <figure className="relative -mb-24 aspect-[16/10] overflow-hidden rounded-md bg-ink-2 sm:-mb-32 lg:-mb-40">
            <ResponsiveImage image={project.cover} sizes="(min-width: 1344px) 1248px, 94vw" priority />
          </figure>
        </div>
      </section>

      <article className="bg-white pt-36 sm:pt-48 lg:pt-56">
        {project.isSample && (
          <div className="container-site">
            <p className="type-small rounded-md border border-dashed border-line bg-paper px-5 py-4 text-muted">
              This is a sample case study. The brand, people and figures are fictional and the visuals are generated mockups, shown to
              demonstrate how projects are presented. It will be replaced with real client work.
            </p>
          </div>
        )}

        {/* 1. Overview */}
        <section aria-labelledby="cs-overview" className="section-tight">
          <div className="container-site grid gap-8 lg:grid-cols-12">
            <h2 id="cs-overview" className="type-h3 text-ink lg:col-span-4">
              Project overview
            </h2>
            <p className="type-lead max-w-[62ch] text-slate lg:col-span-8">{cs.overview}</p>
          </div>
        </section>

        {/* 2–3. Requirement and problem */}
        <section aria-label="The brief" className="section-tight border-t border-line">
          <div className="container-site grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4" />
            <div className="grid gap-12 sm:grid-cols-2 lg:col-span-8">
              <div>
                <h2 className="type-h4 text-ink">Client requirement</h2>
                <p className="mt-3 text-muted">{cs.requirement}</p>
              </div>
              <div>
                <h2 className="type-h4 text-ink">The problem</h2>
                <p className="mt-3 text-muted">{cs.problem}</p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Solution */}
        <section aria-labelledby="cs-solution" className="section-tight bg-paper">
          <div className="container-site grid gap-8 lg:grid-cols-12">
            <h2 id="cs-solution" className="type-h3 text-ink lg:col-span-4">
              Our solution
            </h2>
            <ul className="grid gap-0 lg:col-span-8">
              {cs.solution.map((s) => (
                <li key={s} className="type-lead flex gap-4 border-b border-line py-5 text-slate first:border-t">
                  <span aria-hidden className="mt-[0.6em] size-2 shrink-0 rounded-full bg-violet" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 5. Approach */}
        <section aria-labelledby="cs-approach" className="section-tight">
          <div className="container-site grid gap-8 lg:grid-cols-12">
            <h2 id="cs-approach" className="type-h3 text-ink lg:col-span-4">
              Design and development approach
            </h2>
            <div className="lg:col-span-8">
              <ul className="grid gap-10 sm:grid-cols-3">
                {cs.approach.map((a) => (
                  <li key={a.title}>
                    <h3 className="type-h4 text-ink">{a.title}</h3>
                    <p className="type-small mt-2 text-muted">{a.description}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <h3 className="type-meta text-muted">Technologies</h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {project.technologies.map((t) => (
                    <li key={t} className="rounded-full border border-line px-3 py-1 text-sm text-slate">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Gallery */}
        {project.gallery.length > 0 && (
          <section aria-labelledby="cs-gallery" className="section-tight">
            <div className="container-site">
              <h2 id="cs-gallery" className="sr-only">
                Screens and visuals
              </h2>
              <div className="grid gap-10 md:grid-cols-2 md:gap-8">
                {project.gallery.map((g, i) => (
                  <figure key={g.src} className={i === 0 && project.gallery.length % 2 === 1 ? 'md:col-span-2' : ''}>
                    <div className="overflow-hidden rounded-md bg-paper">
                      <ResponsiveImage image={g} sizes="(min-width: 768px) 47vw, 94vw" className="aspect-[16/10]" />
                    </div>
                    {g.caption && <figcaption className="type-small mt-3 text-muted">{g.caption}</figcaption>}
                  </figure>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 7. Results (only when verified) */}
        {cs.results && cs.results.length > 0 && (
          <section aria-labelledby="cs-results" className="on-dark section-tight bg-ink text-white">
            <div className="container-site grid gap-8 lg:grid-cols-12">
              <h2 id="cs-results" className="type-h3 lg:col-span-4">
                Results
              </h2>
              <dl className="grid gap-8 sm:grid-cols-3 lg:col-span-8">
                {cs.results.map((r) => (
                  <div key={r.label} className="border-t border-white/20 pt-4">
                    <dd className="type-h2">{r.value}</dd>
                    <dt className="mt-2 text-white/70">{r.label}</dt>
                    {r.note && <p className="type-small mt-1 text-white/50">{r.note}</p>}
                  </div>
                ))}
              </dl>
            </div>
          </section>
        )}

        {/* 10. Project CTA */}
        <section aria-label="Discuss a similar project" className="section-tight">
          <div className="container-site">
            <div className="on-dark grid gap-8 rounded-lg bg-ink p-8 text-white sm:p-12 md:grid-cols-12 md:items-center">
              <div className="md:col-span-8">
                <p className="type-h2">Planning something similar?</p>
                <p className="mt-3 max-w-[54ch] text-white/70">
                  Tell us about your goals and we’ll suggest how we would approach it, with a timeline and estimate.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 md:col-span-4 md:justify-end">
                <ButtonLink to={enquiryLink} size="lg">
                  Discuss a similar project
                </ButtonLink>
              </div>
            </div>
          </div>
        </section>
      </article>

      {/* 9. Related */}
      {related.length > 0 && (
        <section aria-labelledby="related-heading" className="on-dark section bg-ink text-white">
          <div className="container-site">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <h2 id="related-heading" className="type-h2">
                Related projects
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
    </>
  );
}
