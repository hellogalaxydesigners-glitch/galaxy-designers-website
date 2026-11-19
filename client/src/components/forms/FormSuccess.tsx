import { useEffect, useRef, type ReactNode } from 'react';
import { CheckCircle2, MessageCircle } from 'lucide-react';
import { ButtonExternal, ButtonLink } from '@/components/ui/Button';
import { siteConfig, whatsappLink } from '@/content/site.config';

/** Confirmation shown after a successful submission. Takes focus so screen readers announce it. */
export function FormSuccess({
  title,
  reference,
  children,
  whatsappMessage,
}: {
  title: string;
  reference: string;
  children?: ReactNode;
  whatsappMessage: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref.current?.focus();
    ref.current?.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }, []);

  return (
    <div ref={ref} tabIndex={-1} role="status" className="hero-rise rounded-lg border border-line bg-white p-8 outline-none sm:p-10">
      <CheckCircle2 aria-hidden className="size-10 text-success" />
      <h2 className="type-h2 mt-5 text-ink">{title}</h2>
      <p className="mt-3 text-slate">
        Your reference is <strong className="font-semibold text-ink tabular-nums">{reference}</strong>. {siteConfig.contact.responseTime}
      </p>
      {children}
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonExternal href={whatsappLink(whatsappMessage)} variant="outline-light" icon={<MessageCircle aria-hidden className="size-4" />}>
          Also send on WhatsApp
        </ButtonExternal>
        <ButtonLink to="/work" variant="outline-light">
          Browse our work
        </ButtonLink>
      </div>
    </div>
  );
}
