import { CalendarDays, Mail, MessageCircle } from 'lucide-react';
import { homeContent } from '@/content/home';
import { mailtoLink, siteConfig, whatsappLink } from '@/content/site.config';
import { ButtonLink } from '@/components/ui/Button';

/**
 * Closing call to action used at the bottom of most pages.
 * Headline and buttons can be overridden per page.
 */
export function FinalCta({
  headline = homeContent.finalCta.headline,
  supporting = homeContent.finalCta.supporting,
  primary = homeContent.finalCta.primary,
}: {
  headline?: string;
  supporting?: string;
  primary?: { label: string; to: string };
}) {
  return (
    <section aria-labelledby="cta-heading" className="on-dark relative overflow-hidden bg-ink text-white">
      {/* Two soft lights – violet and blue – echo the halves of the mark */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            'radial-gradient(40rem 26rem at 8% 110%, rgba(123,92,255,0.35), transparent 70%), radial-gradient(40rem 26rem at 92% -10%, rgba(47,107,255,0.3), transparent 70%)',
        }}
      />
      <div className="container-site section relative">
        <h2 id="cta-heading" className="type-display max-w-[14ch]">
          {headline}
        </h2>
        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
          <p className="type-lead max-w-[50ch] text-white/75 lg:col-span-6">{supporting}</p>
          <div className="flex flex-wrap gap-3 lg:col-span-6 lg:justify-end">
            <ButtonLink to={primary.to} size="lg">
              {primary.label}
            </ButtonLink>
            <ButtonLink to={homeContent.finalCta.secondary.to} size="lg" variant="outline-dark" icon={<CalendarDays aria-hidden className="size-4" />}>
              {homeContent.finalCta.secondary.label}
            </ButtonLink>
          </div>
        </div>
        <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/10 pt-6 text-[0.9375rem] text-white/75">
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-white">
            <MessageCircle aria-hidden className="size-4 text-lavender" /> Message us on WhatsApp
          </a>
          <a href={mailtoLink()} className="inline-flex items-center gap-2 hover:text-white">
            <Mail aria-hidden className="size-4 text-lavender" /> {siteConfig.contact.email}
          </a>
          <span>{siteConfig.contact.responseTime}</span>
        </div>
      </div>
    </section>
  );
}
