import { Link } from 'react-router';
import type { Project } from '@/content/types';
import { categoryLabel } from '@/content/projects';
import { ResponsiveImage } from '@/components/ui/ResponsiveImage';
import { SampleBadge } from '@/components/ui/SampleBadge';
import { cn } from '@/lib/cn';

type Size = 'xl' | 'lg' | 'md';

const aspect: Record<Size, string> = {
  xl: 'aspect-[16/10] lg:aspect-[16/9]',
  lg: 'aspect-[16/10]',
  md: 'aspect-[16/10]',
};

const sizes: Record<Size, string> = {
  xl: '(min-width: 1344px) 1248px, 94vw',
  lg: '(min-width: 1024px) 56vw, 94vw',
  md: '(min-width: 1024px) 40vw, (min-width: 640px) 47vw, 94vw',
};

/**
 * Editorial project card. The whole card is one link to the case study.
 * `tone` adapts text colours to dark or light sections.
 */
export function ProjectCard({
  project,
  size = 'lg',
  tone = 'dark',
  priority = false,
  headingLevel = 'h3',
  className,
}: {
  project: Project;
  size?: Size;
  tone?: 'dark' | 'light';
  priority?: boolean;
  headingLevel?: 'h2' | 'h3';
  className?: string;
}) {
  const Heading = headingLevel;
  const dark = tone === 'dark';
  return (
    <article className={cn('group', className)}>
      <Link to={`/work/${project.slug}`} className="block rounded-md focus-visible:outline-offset-8">
        <div className={cn('relative overflow-hidden rounded-md', dark ? 'bg-ink-2' : 'bg-line', aspect[size])}>
          <ResponsiveImage
            image={project.cover}
            sizes={sizes[size]}
            priority={priority}
            className="transition-transform duration-700 ease-[var(--ease-out-quart)] group-hover:scale-[1.035]"
          />
          {project.isSample && (
            <SampleBadge className="absolute top-3 left-3 border-white/70 bg-ink/75 text-white backdrop-blur-sm sm:top-4 sm:left-4" />
          )}
          <span
            aria-hidden
            className="absolute right-4 bottom-4 hidden translate-y-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-y-0 group-hover:opacity-100 md:inline-flex"
          >
            View case study
          </span>
        </div>

        <div className={cn('mt-5 flex flex-col gap-1.5', size === 'xl' && 'sm:mt-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6')}>
          <Heading className={cn(size === 'xl' ? 'type-h2' : 'type-h3', dark ? 'text-white' : 'text-ink')}>
            {project.title}
          </Heading>
          <p className={cn('type-meta shrink-0', dark ? 'text-lavender' : 'text-violet-strong')}>
            {project.categories.map(categoryLabel).join(', ')}
          </p>
        </div>
        <p className={cn('mt-2 max-w-[60ch]', dark ? 'text-white/70' : 'text-muted')}>{project.tagline}</p>
        <p className={cn('type-meta mt-3', dark ? 'text-white/50' : 'text-muted')}>{project.industry}</p>
      </Link>
    </article>
  );
}

/**
 * Lays out projects in an editorial rhythm:
 * one large feature, then alternating 7/5 and 5/7 pairs with an offset.
 */
export function EditorialProjectGrid({
  projects,
  tone = 'dark',
  firstPriority = false,
  headingLevel = 'h3',
}: {
  projects: Project[];
  tone?: 'dark' | 'light';
  firstPriority?: boolean;
  /** h2 when the grid sits directly under the page's h1 */
  headingLevel?: 'h2' | 'h3';
}) {
  if (!projects.length) return null;
  const [first, ...rest] = projects;
  const pairs: Project[][] = [];
  for (let i = 0; i < rest.length; i += 2) pairs.push(rest.slice(i, i + 2));

  return (
    <div className="grid gap-16 sm:gap-20 lg:gap-28">
      <ProjectCard project={first} size="xl" tone={tone} priority={firstPriority} headingLevel={headingLevel} />
      {pairs.map((pair, i) => {
        const flip = i % 2 === 1;
        return (
          <div key={pair[0].slug} className="grid gap-16 sm:gap-20 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-0">
            <ProjectCard
              project={pair[0]}
              size={flip ? 'md' : 'lg'}
              tone={tone}
              headingLevel={headingLevel}
              className={cn(flip ? 'lg:col-span-5 lg:mt-32' : 'lg:col-span-7')}
            />
            {pair[1] && (
              <ProjectCard
                project={pair[1]}
                size={flip ? 'lg' : 'md'}
                tone={tone}
                headingLevel={headingLevel}
                className={cn(flip ? 'lg:col-span-7' : 'lg:col-span-5 lg:mt-32')}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
