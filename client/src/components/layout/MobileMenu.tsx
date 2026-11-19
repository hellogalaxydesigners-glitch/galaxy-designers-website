import { useEffect, useRef, type RefObject } from 'react';
import { Link } from 'react-router';
import { Mail, MessageCircle, X } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { ButtonExternal, ButtonLink } from '@/components/ui/Button';
import { services } from '@/content/services';
import { mainNav } from '@/content/navigation';
import { mailtoLink, siteConfig, whatsappLink } from '@/content/site.config';
import { cn } from '@/lib/cn';

/** Full-screen navigation for phones and tablets. Behaves as a modal dialog. */
export function MobileMenu({
  open,
  onClose,
  returnFocusRef,
}: {
  open: boolean;
  onClose: () => void;
  returnFocusRef: RefObject<HTMLButtonElement | null>;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const dialog = dialogRef.current;
    dialog?.querySelector<HTMLElement>('[data-autofocus]')?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab' && dialog) {
        // Keep focus inside the menu while it is open
        const focusable = dialog.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    const returnTo = returnFocusRef.current;
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKey);
      returnTo?.focus();
    };
  }, [open, onClose, returnFocusRef]);

  if (!open) return null;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      className="on-dark fixed inset-0 z-50 flex flex-col overflow-y-auto bg-ink text-white lg:hidden"
    >
      <div className="container-site flex h-16 shrink-0 items-center justify-between sm:h-[4.5rem]">
        <Logo />
        <button
          type="button"
          onClick={onClose}
          data-autofocus
          className="-mr-2 flex h-11 items-center gap-2 rounded-full px-3 text-[0.9375rem] font-medium"
        >
          <X aria-hidden className="size-5" />
          Close
        </button>
      </div>

      <nav aria-label="Mobile" className="container-site flex-1 pt-6 pb-10">
        <ul className="grid gap-1">
          {mainNav.map((item) => (
            <li key={item.to}>
              <Link to={item.to} className="type-h2 block py-2">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <p className="type-meta mt-10 text-white/60">Services</p>
        <ul className="mt-3 grid grid-cols-1 gap-x-6 xs:grid-cols-2">
          {services.map((s) => (
            <li key={s.slug}>
              <Link
                to={`/services/${s.slug}`}
                className="flex items-center gap-3 border-b border-white/10 py-3 text-[0.9375rem]"
              >
                <span
                  aria-hidden
                  className={cn('size-2 rounded-full', s.side === 'creative' ? 'bg-violet' : 'bg-blue')}
                />
                {s.title}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          <ButtonLink to="/start-a-project" size="lg">
            Start a project
          </ButtonLink>
          <ButtonLink to="/consultation" size="lg" variant="outline-dark">
            Schedule a consultation
          </ButtonLink>
        </div>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-[0.9375rem] text-white/80">
          <ButtonExternal href={whatsappLink()} variant="outline-dark" icon={<MessageCircle aria-hidden className="size-4" />}>
            WhatsApp us
          </ButtonExternal>
          <ButtonExternal href={mailtoLink()} variant="outline-dark" icon={<Mail aria-hidden className="size-4" />}>
            {siteConfig.contact.email}
          </ButtonExternal>
        </div>
      </nav>
    </div>
  );
}
