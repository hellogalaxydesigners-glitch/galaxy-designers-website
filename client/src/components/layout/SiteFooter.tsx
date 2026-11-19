import { Link } from 'react-router';
import { BrandMark } from '@/components/ui/Logo';
import { services } from '@/content/services';
import { footerNav } from '@/content/navigation';
import { mailtoLink, siteConfig, telLink, whatsappLink } from '@/content/site.config';

const SOCIAL_LABELS: Record<keyof typeof siteConfig.social, string> = {
  linkedin: 'LinkedIn',
  instagram: 'Instagram',
  behance: 'Behance',
  dribbble: 'Dribbble',
  x: 'X',
  youtube: 'YouTube',
  facebook: 'Facebook',
};

export function SiteFooter() {
  const year = new Date().getFullYear();
  const socials = (Object.entries(siteConfig.social) as [keyof typeof siteConfig.social, string][]).filter(([, url]) => url);
  const { contact } = siteConfig;

  return (
    <footer className="on-dark bg-ink pb-24 text-white lg:pb-0">
      <div className="container-site border-t border-white/10 pt-16 pb-12 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <BrandMark className="size-12" />
            <p className="mt-6 max-w-[34ch] text-white/70">
              Websites, apps, automation, AI and creative marketing for businesses in India and around the world.
            </p>
            <dl className="mt-8 grid gap-4 text-[0.9375rem]">
              <div>
                <dt className="text-white/50">Email</dt>
                <dd>
                  <a href={mailtoLink()} className="underline-offset-4 hover:underline">
                    {contact.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-white/50">Phone / WhatsApp</dt>
                <dd className="flex flex-wrap gap-x-3">
                  <a href={telLink()} className="underline-offset-4 hover:underline">
                    {contact.phoneDisplay}
                  </a>
                  <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="text-lavender underline-offset-4 hover:underline">
                    Message on WhatsApp
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-white/50">Location</dt>
                <dd>{contact.address || contact.locationDisplay}</dd>
              </div>
            </dl>
          </div>

          <nav aria-label="Services" className="lg:col-span-4">
            <h2 className="type-meta text-white/50">Services</h2>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link to={`/services/${s.slug}`} className="text-white/85 underline-offset-4 hover:text-white hover:underline">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company" className="lg:col-span-2">
            <h2 className="type-meta text-white/50">Company</h2>
            <ul className="mt-4 grid gap-2.5">
              {footerNav.company.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-white/85 underline-offset-4 hover:text-white hover:underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Work with us" className="lg:col-span-2">
            <h2 className="type-meta text-white/50">Work with us</h2>
            <ul className="mt-4 grid gap-2.5">
              {footerNav.start.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-white/85 underline-offset-4 hover:text-white hover:underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            {socials.length > 0 && (
              <>
                <h2 className="type-meta mt-8 text-white/50">Follow</h2>
                <ul className="mt-4 grid gap-2.5">
                  {socials.map(([key, url]) => (
                    <li key={key}>
                      <a href={url} target="_blank" rel="noopener noreferrer" className="text-white/85 underline-offset-4 hover:text-white hover:underline">
                        {SOCIAL_LABELS[key]}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p suppressHydrationWarning>
            © {year} {siteConfig.legalName}. All rights reserved.
          </p>
          <p>
            <Link to="/privacy" className="underline-offset-4 hover:text-white hover:underline">
              Privacy policy
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
