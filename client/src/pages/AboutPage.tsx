import { aboutContent as c } from '@/content/about';
import { Seo, breadcrumbJsonLd, organizationJsonLd } from '@/lib/seo';
import { PageIntro } from '@/components/ui/PageIntro';
import { ButtonLink } from '@/components/ui/Button';
import { BrandMark } from '@/components/ui/Logo';
import { ServicesSplit } from '@/components/sections/ServicesSplit';
import { FinalCta } from '@/components/sections/FinalCta';

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
];

export default function AboutPage() {
  return (
    <>
      <Seo
        title="About Galaxy Designers – Creative & Technology Agency"
        description="Galaxy Designers brings design, development, automation, AI and marketing under one roof for growing businesses in India and around the world."
        path="/about"
        jsonLd={[breadcrumbJsonLd(crumbs), organizationJsonLd()]}
      />
      <PageIntro
        crumbs={crumbs}
        title={c.intro.headline}
        lead={c.intro.lead}
        aside={<BrandMark className="hidden size-40 lg:ml-auto lg:block" />}
      >
        <ButtonLink to="/work" size="lg">
          See our work
        </ButtonLink>
        <ButtonLink to="/contact" size="lg" variant="outline-dark">
          Contact us
        </ButtonLink>
      </PageIntro>

      {/* Story */}
      <section aria-labelledby="story-heading" className="section bg-white">
        <div className="container-site grid gap-10 lg:grid-cols-12">
          <h2 id="story-heading" className="type-h2 text-ink lg:col-span-4">
            {c.story.heading}
          </h2>
          <div className="type-lead prose-site max-w-[62ch] text-slate lg:col-span-7 lg:col-start-6">
            {c.story.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & mission – the two halves */}
      <section aria-label="Vision and mission" className="bg-paper">
        <div className="container-site grid md:grid-cols-2">
          {[
            { ...c.vision, side: 'creative' as const },
            { ...c.mission, side: 'engineering' as const },
          ].map((block) => (
            <div key={block.heading} className={`section-tight ${block.side === 'creative' ? 'md:border-r md:border-line md:pr-12' : 'md:pl-12'}`}>
              <svg viewBox="0 0 20 40" className="h-10 w-5" aria-hidden>
                {block.side === 'creative' ? <path d="M20 0A20 20 0 0 0 20 40z" fill="#7B5CFF" /> : <path d="M0 0A20 20 0 0 1 0 40z" fill="#2F6BFF" />}
              </svg>
              <h2 className="type-h3 mt-5 text-ink">{block.heading}</h2>
              <p className="type-lead mt-4 max-w-[46ch] text-slate">{block.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What we do */}
      <section aria-labelledby="what-heading" className="section bg-white">
        <div className="container-site">
          <h2 id="what-heading" className="type-h2 text-ink">
            {c.whatWeDo.heading}
          </h2>
          <p className="type-lead mt-5 max-w-[62ch] text-muted">{c.whatWeDo.text}</p>
          <div className="mt-14">
            <ServicesSplit />
          </div>
        </div>
      </section>

      {/* Approach */}
      <section aria-labelledby="approach-heading" className="on-dark section bg-ink text-white">
        <div className="container-site">
          <h2 id="approach-heading" className="type-h2">
            {c.approach.heading}
          </h2>
          <ol className="mt-12 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-4">
            {c.approach.points.map((p, i) => (
              <li key={p.title} className="border-t border-white/15 py-7">
                <span className="type-meta text-lavender tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="type-h4 mt-2">{p.title}</h3>
                <p className="mt-2 text-white/70">{p.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Values */}
      <section aria-labelledby="values-heading" className="section bg-paper">
        <div className="container-site grid gap-10 lg:grid-cols-12">
          <h2 id="values-heading" className="type-h2 text-ink lg:col-span-4">
            {c.values.heading}
          </h2>
          <dl className="lg:col-span-7 lg:col-start-6">
            {c.values.list.map((v) => (
              <div key={v.title} className="grid gap-2 border-t border-line py-6 sm:grid-cols-[12rem_1fr] sm:gap-8">
                <dt className="type-h4 text-ink">{v.title}</dt>
                <dd className="text-muted">{v.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Why work with us */}
      <section aria-labelledby="why-heading" className="section bg-white">
        <div className="container-site grid gap-10 lg:grid-cols-12">
          <h2 id="why-heading" className="type-h2 text-ink lg:col-span-4">
            {c.whyWorkWithUs.heading}
          </h2>
          <ul className="grid gap-x-10 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
            {c.whyWorkWithUs.points.map((p, i) => (
              <li key={p} className="flex gap-3 border-t border-line py-5 text-slate">
                <span aria-hidden className={`mt-[0.55em] size-2 shrink-0 rounded-full ${i % 2 ? 'bg-blue' : 'bg-violet'}`} />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
