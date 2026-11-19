import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { SERVICE_VALUES, type ServiceValue } from '@galaxy/shared';
import { Seo, breadcrumbJsonLd } from '@/lib/seo';
import { PageIntro } from '@/components/ui/PageIntro';
import { ConsultationForm } from '@/components/forms/ConsultationForm';
import { ContactAside } from '@/components/forms/ContactAside';

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Schedule a consultation', path: '/consultation' },
];

export default function ConsultationPage() {
  const [params] = useSearchParams();
  const [service, setService] = useState<ServiceValue | undefined>();
  useEffect(() => {
    const s = params.get('service');
    setService(s && (SERVICE_VALUES as string[]).includes(s) ? (s as ServiceValue) : undefined);
  }, [params]);

  return (
    <>
      <Seo
        title="Schedule a Consultation"
        description="Request a consultation call with Galaxy Designers at a time that suits your time zone – by video, WhatsApp or phone."
        path="/consultation"
        jsonLd={[breadcrumbJsonLd(crumbs)]}
      />
      <PageIntro
        crumbs={crumbs}
        title="Schedule a consultation"
        lead="A focused conversation about your goals and options. Suggest a few times in your own time zone, and we’ll confirm one by email."
      />
      <section aria-label="Consultation request" className="section-tight bg-paper">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="rounded-lg border border-line bg-white p-6 sm:p-10">
              <ConsultationForm initialService={service} />
            </div>
          </div>
          <div className="lg:col-span-4">
            <ContactAside showConsultation={false}>
              <div>
                <h2 className="type-h4 text-ink">What to expect</h2>
                <ul className="prose-site mt-3 text-slate">
                  <li>About 30 minutes, by video, WhatsApp or phone.</li>
                  <li>We’ll ask about your goals, audience and timeline.</li>
                  <li>You’ll leave with clear options and next steps.</li>
                  <li>No preparation needed – but links or documents help.</li>
                </ul>
              </div>
            </ContactAside>
          </div>
        </div>
      </section>
    </>
  );
}
