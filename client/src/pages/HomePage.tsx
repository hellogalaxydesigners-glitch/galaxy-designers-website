import { Link } from 'react-router';
import { homeContent } from '@/content/home';
import { featuredProjects } from '@/content/projects';
import { siteConfig } from '@/content/site.config';
import { Seo, organizationJsonLd, websiteJsonLd } from '@/lib/seo';
import { ButtonLink } from '@/components/ui/Button';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { OrbitHero } from '@/components/sections/OrbitHero';
import { ServicesSplit } from '@/components/sections/ServicesSplit';
import { EditorialProjectGrid } from '@/components/portfolio/ProjectCard';
import { WhyUs } from '@/components/sections/WhyUs';
import { Process } from '@/components/sections/Process';
import { Industries } from '@/components/sections/Industries';
import { Testimonials } from '@/components/sections/Testimonials';
import { FinalCta } from '@/components/sections/FinalCta';

export default function HomePage() {
  const { hero, services, portfolio } = homeContent;
  return (
    <>
      <Seo
        rawTitle
        title="Galaxy Designers | Website, App, Automation & AI Development Agency"
        description={siteConfig.description}
        path="/"
        jsonLd={[organizationJsonLd(), websiteJsonLd()]}
      />

      {/* ------------------------------------------------------------ Hero */}
      <section aria-labelledby="hero-heading" className="on-dark relative overflow-hidden bg-ink text-white">
        {/* Phones: the orbit sits behind the headline as a quiet backdrop */}
        <div aria-hidden className="pointer-events-none absolute -top-20 -right-44 w-[26rem] opacity-45 sm:-right-24 sm:w-[34rem] lg:hidden">
          <OrbitHero compact />
        </div>

        <div className="container-site relative grid items-center gap-10 pt-24 pb-16 sm:pt-24 sm:pb-24 lg:grid-cols-12 lg:min-h-[min(46rem,calc(100svh-4.5rem))] lg:py-16">
          <div className="lg:col-span-7">
            <p className="hero-rise type-meta text-lavender">{hero.kicker}</p>
            <h1 id="hero-heading" className="hero-rise type-display mt-6 max-w-[13ch]" style={{ animationDelay: '0.05s' }}>
              {hero.headline}
            </h1>
            <p className="hero-rise type-lead mt-8 max-w-[54ch] text-white/75" style={{ animationDelay: '0.12s' }}>
              {hero.supporting}
            </p>
            <div className="hero-rise mt-10 flex flex-wrap gap-3" style={{ animationDelay: '0.18s' }}>
              <ButtonLink to={hero.primaryCta.to} size="lg">
                {hero.primaryCta.label}
              </ButtonLink>
              <ButtonLink to={hero.secondaryCta.to} size="lg" variant="outline-dark">
                {hero.secondaryCta.label}
              </ButtonLink>
            </div>
          </div>
          <div className="hidden lg:col-span-5 lg:block">
            <nav aria-label="Our services">
              <OrbitHero />
            </nav>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- Services */}
      <section aria-labelledby="services-heading" className="section bg-paper">
        <div className="container-site">
          <SectionHeader
            id="services-heading"
            title={services.heading}
            intro={services.intro}
            action={
              <ButtonLink to="/services" variant="outline-light">
                All services
              </ButtonLink>
            }
          />
          <div className="mt-14 lg:mt-20">
            <ServicesSplit />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- Portfolio */}
      <section aria-labelledby="work-heading" className="on-dark section bg-ink text-white">
        <div className="container-site">
          <SectionHeader
            id="work-heading"
            tone="dark"
            title={portfolio.heading}
            intro={portfolio.intro}
            action={
              <ButtonLink to="/work" variant="outline-dark">
                View all work
              </ButtonLink>
            }
          />
          <div className="mt-14 lg:mt-20">
            <EditorialProjectGrid projects={featuredProjects} tone="dark" />
          </div>
          <div className="mt-20 flex flex-col items-start gap-5 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-[52ch] text-white/70">Have a similar project in mind? Tell us about it and we will suggest an approach.</p>
            <ButtonLink to="/start-a-project">Discuss your project</ButtonLink>
          </div>
        </div>
      </section>

      <WhyUs />
      <Process />
      <Industries />
      <Testimonials />

      <section aria-label="Not sure where to start" className="section-tight bg-white">
        <div className="container-site">
        <div className="grid gap-6 border-y border-line py-10 md:grid-cols-12 md:items-center">
          <p className="type-h3 text-ink md:col-span-8">
            Not sure which service you need? A short call usually makes it clear.
          </p>
          <div className="flex flex-wrap gap-3 md:col-span-4 md:justify-end">
            <ButtonLink to="/consultation" variant="outline-light">
              Schedule a consultation
            </ButtonLink>
            <Link to="/start-a-project?type=quote" className="inline-flex h-11 items-center px-2 font-semibold text-violet-strong underline-offset-4 hover:underline">
              Request a quotation
            </Link>
          </div>
        </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
