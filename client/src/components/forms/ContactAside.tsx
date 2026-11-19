import type { ReactNode } from 'react';
import { CalendarDays, Mail, MessageCircle, Phone } from 'lucide-react';
import { Link } from 'react-router';
import { mailtoLink, siteConfig, telLink, whatsappLink } from '@/content/site.config';

/** "Prefer another way?" panel shown next to every form. */
export function ContactAside({ children, showConsultation = true }: { children?: ReactNode; showConsultation?: boolean }) {
  const { contact } = siteConfig;
  return (
    <aside className="grid content-start gap-8">
      {children}
      <div>
        <h2 className="type-h4 text-ink">Prefer another way?</h2>
        <ul className="mt-4 grid gap-1 border-t border-line">
          <li>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 border-b border-line py-4 text-slate hover:text-ink">
              <MessageCircle aria-hidden className="size-5 text-success" />
              <span>
                <span className="block font-semibold text-ink group-hover:underline">WhatsApp</span>
                <span className="type-small text-muted">{contact.phoneDisplay}</span>
              </span>
            </a>
          </li>
          <li>
            <a href={mailtoLink()} className="group flex items-center gap-3 border-b border-line py-4 text-slate hover:text-ink">
              <Mail aria-hidden className="size-5 text-violet-strong" />
              <span>
                <span className="block font-semibold text-ink group-hover:underline">Email</span>
                <span className="type-small text-muted">{contact.email}</span>
              </span>
            </a>
          </li>
          <li>
            <a href={telLink()} className="group flex items-center gap-3 border-b border-line py-4 text-slate hover:text-ink">
              <Phone aria-hidden className="size-5 text-blue-strong" />
              <span>
                <span className="block font-semibold text-ink group-hover:underline">Call</span>
                <span className="type-small text-muted">{contact.phoneDisplay}</span>
              </span>
            </a>
          </li>
          {showConsultation && (
            <li>
              <Link to="/consultation" className="group flex items-center gap-3 border-b border-line py-4 text-slate hover:text-ink">
                <CalendarDays aria-hidden className="size-5 text-ink" />
                <span>
                  <span className="block font-semibold text-ink group-hover:underline">Schedule a consultation</span>
                  <span className="type-small text-muted">Pick times that suit your time zone</span>
                </span>
              </Link>
            </li>
          )}
        </ul>
        <p className="type-small mt-4 text-muted">{contact.responseTime}</p>
      </div>
    </aside>
  );
}
