import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { MessageCircle } from 'lucide-react';
import { ButtonExternal, ButtonLink } from '@/components/ui/Button';
import { whatsappLink } from '@/content/site.config';
import { trackEvent } from '@/lib/analytics';
import { cn } from '@/lib/cn';

/** Pages that already show a form – the sticky bar would only cover it. */
const FORM_PAGES = ['/start-a-project', '/contact', '/consultation'];

/**
 * Always-available contact actions.
 * - Phones/tablets: a bottom bar (Start a project + WhatsApp) after scrolling a little.
 * - Desktop: a floating WhatsApp button (the header already has "Start a project").
 */
export function StickyActions() {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);
  const onFormPage = FORM_PAGES.includes(pathname);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const wa = whatsappLink();
  const onWhatsApp = () => trackEvent('whatsapp_click', { page: pathname });

  return (
    <>
      {/* Mobile bottom bar */}
      {!onFormPage && (
        <div
          className={cn(
            'fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-ink/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur transition-transform duration-300 lg:hidden',
            visible ? 'translate-y-0' : 'translate-y-full',
          )}
          aria-hidden={!visible}
          inert={!visible}
        >
          <div className="mx-auto flex max-w-lg gap-3">
            <ButtonLink to="/start-a-project" className="flex-1">
              Start a project
            </ButtonLink>
            <ButtonExternal
              href={wa}
              variant="outline-dark"
              onClick={onWhatsApp}
              icon={<MessageCircle aria-hidden className="size-4" />}
            >
              WhatsApp
            </ButtonExternal>
          </div>
        </div>
      )}

      {/* Desktop floating WhatsApp */}
      <a
        href={wa}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onWhatsApp}
        className="group fixed right-6 bottom-6 z-30 hidden h-14 items-center gap-0 rounded-full bg-[#1f8a5b] pr-4 pl-4 text-white shadow-lg shadow-black/20 transition-[gap,padding] duration-300 hover:gap-2.5 hover:pr-5 focus-visible:gap-2.5 focus-visible:pr-5 lg:flex"
      >
        <MessageCircle aria-hidden className="size-6" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap text-[0.9375rem] font-semibold transition-[max-width] duration-300 group-hover:max-w-40 group-focus-visible:max-w-40">
          Chat on WhatsApp
        </span>
        <span className="sr-only">(opens WhatsApp)</span>
      </a>
    </>
  );
}
