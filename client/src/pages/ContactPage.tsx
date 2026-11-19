import { Link } from 'react-router';
import { CalendarDays, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { mailtoLink, siteConfig, telLink, whatsappLink } from '@/content/site.config';
import { Seo, breadcrumbJsonLd, organizationJsonLd } from '@/lib/seo';
import { PageIntro } from '@/components/ui/PageIntro';
import { ButtonLink } from '@/components/ui/Button';
import { ContactForm } from '@/components/forms/ContactForm';

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Contact', path: '/contact' },
];

const SOCIAL_LABELS: Record<string, string> = {
  linkedin: 'LinkedIn',
  instagram: 'Instagram',
  behance: 'Behance',
  dribbble: 'Dribbble',
  x: 'X',
  youtube: 'YouTube',
  facebook: 'Facebook',
};

export default function ContactPage() {
  const { contact, social } = siteConfig;
  const socials = Object.entries(social).filter(([, url]) => url);

  const methods = [
    { icon: MessageCircle, label: 'WhatsApp', value: contact.phoneDisplay, href: whatsappLink(), external: true, note: 'Fastest for quick questions' },
    { icon: Mail, label: 'Email', value: contact.email, href: mailtoLink(), external: false, note: 'For briefs and documents' },
    { icon: Phone, label: 'Phone', value: contact.phoneDisplay, href: telLink(), external: false, note: `Business hours, ${contact.businessTimeZone.replace('_', ' ')} time` },
  ];

  return (
    <>
      <Seo
        title="Contact Galaxy Designers"
        description="Contact Galaxy Designers by form, email, phone or WhatsApp. We work with businesses in India, the UK, US, Canada, Australia and worldwide."
        path="/contact"
        jsonLd={[breadcrumbJsonLd(crumbs), organizationJsonLd()]}
      />
      <PageIntro
        crumbs={crumbs}
        title="Let’s talk."
        lead="Whether you have a detailed brief or just an idea, we’re happy to help you work out the next step."
      />

      <section aria-label="Contact details and form" className="section-tight bg-paper">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="grid content-start gap-10 lg:col-span-4">
            <ul className="grid border-t border-line">
              {methods.map((m) => (
                <li key={m.label}>
                  <a
                    href={m.href}
                    {...(m.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="group flex gap-4 border-b border-line py-5"
                  >
                    <m.icon aria-hidden className="mt-0.5 size-5 shrink-0 text-violet-strong" />
                    <span>
                      <span className="type-meta block text-muted">{m.label}</span>
                      <span className="block font-semibold text-ink group-hover:underline">{m.value}</span>
                      <span className="type-small block text-muted">{m.note}</span>
                    </span>
                  </a>
                </li>
              ))}
              <li className="flex gap-4 border-b border-line py-5">
                <MapPin aria-hidden className="mt-0.5 size-5 shrink-0 text-violet-strong" />
                <span>
                  <span className="type-meta block text-muted">Location</span>
                  <span className="block font-semibold text-ink">{contact.address || contact.locationDisplay}</span>
                </span>
              </li>
            </ul>

            {socials.length > 0 && (
              <div>
                <h2 className="type-h4 text-ink">Follow our work</h2>
                <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                  {socials.map(([k, url]) => (
                    <li key={k}>
                      <a href={url} target="_blank" rel="noopener noreferrer" className="font-medium text-violet-strong underline-offset-4 hover:underline">
                        {SOCIAL_LABELS[k] ?? k}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="rounded-lg bg-ink p-7 text-white">
              <CalendarDays aria-hidden className="size-6 text-lavender" />
              <h2 className="type-h4 mt-4">Prefer to talk it through?</h2>
              <p className="type-small mt-2 text-white/70">Suggest a few times in your own time zone and we’ll confirm a call.</p>
              <ButtonLink to="/consultation" className="mt-5">
                Schedule a consultation
              </ButtonLink>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="rounded-lg border border-line bg-white p-6 sm:p-10">
              <h2 className="type-h3 text-ink">Send us a message</h2>
              <p className="type-small mt-2 mb-8 text-muted">
                {contact.responseTime} For a detailed project brief, use{' '}
                <Link to="/start-a-project" className="font-medium text-violet-strong underline underline-offset-2">
                  Start a project
                </Link>
                .
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
