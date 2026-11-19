import { useEffect, useId, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';
import { Search, X } from 'lucide-react';
import { categoryLabel, portfolioCategories, projects, searchProjects } from '@/content/projects';
import type { PortfolioCategoryId } from '@/content/types';
import { Seo, breadcrumbJsonLd } from '@/lib/seo';
import { PageIntro } from '@/components/ui/PageIntro';
import { Button, ButtonLink } from '@/components/ui/Button';
import { EditorialProjectGrid } from '@/components/portfolio/ProjectCard';
import { FinalCta } from '@/components/sections/FinalCta';
import { cn } from '@/lib/cn';

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Work', path: '/work' },
];

const isCategory = (v: string | null): v is PortfolioCategoryId => portfolioCategories.some((c) => c.id === v);

export default function WorkPage() {
  // Filters live in the URL (?category=websites&q=logistics) so filtered views can be shared.
  const [params, setParams] = useSearchParams();
  // The pre-rendered page shows all projects; URL filters apply once the page is interactive.
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const rawCategory = ready ? params.get('category') : null;
  const category = isCategory(rawCategory) ? rawCategory : null;
  const query = ready ? (params.get('q') ?? '') : '';
  const searchId = useId();

  const counts = useMemo(() => {
    const map = new Map<PortfolioCategoryId, number>();
    for (const p of projects) for (const c of p.categories) map.set(c, (map.get(c) ?? 0) + 1);
    return map;
  }, []);

  const results = useMemo(() => {
    const inCategory = category ? projects.filter((p) => p.categories.includes(category)) : projects;
    return searchProjects(inCategory, query);
  }, [category, query]);

  const update = (next: { category?: string | null; q?: string }) => {
    const p = new URLSearchParams(params);
    if ('category' in next) {
      if (next.category) p.set('category', next.category);
      else p.delete('category');
    }
    if ('q' in next) {
      if (next.q) p.set('q', next.q);
      else p.delete('q');
    }
    setParams(p, { replace: true, preventScrollReset: true });
  };

  const hasSamples = projects.some((p) => p.isSample);
  const filtered = Boolean(category || query);

  return (
    <>
      <Seo
        title="Our Work: Websites, Apps, Automation & Creative Projects"
        description="Case studies from Galaxy Designers: websites, mobile apps, web applications, UI/UX design, branding, marketing campaigns, UGC video and AI automation projects."
        path="/work"
        jsonLd={[breadcrumbJsonLd(crumbs)]}
      />
      <PageIntro
        crumbs={crumbs}
        title="Work across design, technology and growth."
        lead="Each project starts with a business problem. Browse by discipline or search by industry, technology or project type."
      />

      <section aria-label="Projects" className="on-dark bg-ink pb-24 text-white sm:pb-32">
        {/* Filters */}
        <div className="sticky top-16 z-20 border-y border-white/10 bg-ink/95 backdrop-blur sm:top-[4.5rem]">
          <div className="container-site flex flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between">
            <div
              role="group"
              aria-label="Filter by category"
              className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:-mx-0 sm:flex-wrap sm:px-0 sm:pb-0"
            >
              <FilterChip active={!category} onClick={() => update({ category: null })} label="All" count={projects.length} />
              {portfolioCategories.map((c) => (
                <FilterChip
                  key={c.id}
                  active={category === c.id}
                  onClick={() => update({ category: category === c.id ? null : c.id })}
                  label={c.label}
                  count={counts.get(c.id) ?? 0}
                />
              ))}
            </div>
            <div className="relative w-full lg:w-72">
              <label htmlFor={searchId} className="sr-only">
                Search projects
              </label>
              <Search aria-hidden className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-white/50" />
              <input
                id={searchId}
                type="search"
                value={query}
                onChange={(e) => update({ q: e.target.value })}
                placeholder="Search projects"
                className="h-11 w-full rounded-full border border-white/20 bg-white/5 pr-10 pl-11 text-[0.9375rem] text-white placeholder:text-white/45 focus:border-lavender focus:outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => update({ q: '' })}
                  className="absolute top-1/2 right-2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-white/60 hover:text-white"
                >
                  <X aria-hidden className="size-4" />
                  <span className="sr-only">Clear search</span>
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="container-site pt-12 sm:pt-16">
          <p className="type-meta text-white/60" aria-live="polite">
            {results.length === projects.length && !filtered
              ? `${projects.length} projects`
              : `${results.length} of ${projects.length} projects${category ? ` in ${categoryLabel(category)}` : ''}${query ? ` matching “${query}”` : ''}`}
          </p>
          {hasSamples && (
            <p className="type-small mt-3 max-w-[70ch] text-white/60">
              Projects marked “Sample project” use fictional brands to show how case studies are presented. They will be replaced with published client work.
            </p>
          )}

          <div key={`${category ?? 'all'}|${query}`} className="hero-rise mt-12">
            {results.length > 0 ? (
              <EditorialProjectGrid projects={results} tone="dark" headingLevel="h2" />
            ) : (
              <div className="rounded-lg border border-dashed border-white/20 px-6 py-16 text-center sm:px-12">
                <h2 className="type-h3">No projects match this search</h2>
                <p className="mx-auto mt-3 max-w-[48ch] text-white/70">
                  Try a different word or category. If you don’t see your type of project here, we may still be a good fit – ask us.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <Button variant="outline-dark" onClick={() => update({ category: null, q: '' })}>
                    Clear filters
                  </Button>
                  <ButtonLink to="/start-a-project">Tell us about your project</ButtonLink>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}

function FilterChip({ active, onClick, label, count }: { active: boolean; onClick: () => void; label: string; count: number }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        'inline-flex h-9 shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-medium whitespace-nowrap transition-colors',
        active ? 'border-white bg-white text-ink' : 'border-white/20 text-white/80 hover:border-white/50 hover:text-white',
      )}
    >
      {label}
      <span className={cn('tabular-nums', active ? 'text-ink/60' : 'text-white/45')}>{count}</span>
    </button>
  );
}
