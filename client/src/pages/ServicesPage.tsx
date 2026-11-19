import { Seo, breadcrumbJsonLd } from '@/lib/seo';
import { PageIntro } from '@/components/ui/PageIntro';
import { ButtonLink } from '@/components/ui/Button';
import { ServicesSplit } from '@/components/sections/ServicesSplit';
import { Process } from '@/components/sections/Process';
import { FinalCta } from '@/components/sections/FinalCta';
import { homeContent } from '@/content/home';

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
];

export default function ServicesPage() {
  return (
    <>
      <Seo
        title="Digital Agency Services: Websites, Apps, Automation & AI"
        description="Website development, mobile and web applications, business automation, AI integration, graphic design, UGC video and digital marketing – delivered by one team for businesses in India and worldwide."
        path="/services"
        jsonLd={[breadcrumbJsonLd(crumbs)]}
      />
      <PageIntro
        crumbs={crumbs}
        title="Everything your business needs to grow online, from one team."
        lead={homeContent.services.intro}
      >
        <ButtonLink to="/start-a-project" size="lg">
          Start a project
        </ButtonLink>
        <ButtonLink to="/consultation" size="lg" variant="outline-dark">
          Schedule a consultation
        </ButtonLink>
      </PageIntro>

      <section aria-label="Our services" className="section bg-paper">
        <div className="container-site">
          <ServicesSplit headingLevel="h2" />
        </div>
      </section>

      <Process className="bg-white" />
      <FinalCta />
    </>
  );
}
