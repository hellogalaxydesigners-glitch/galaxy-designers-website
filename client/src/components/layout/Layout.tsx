import { useEffect, type ReactNode } from 'react';
import { useLocation } from 'react-router';
import { SiteHeader } from './SiteHeader';
import { SiteFooter } from './SiteFooter';
import { StickyActions } from './StickyActions';
import { ConsentBanner } from './ConsentBanner';
import { trackPageView } from '@/lib/analytics';

/** Scrolls to the top (or to #hash) on navigation and records a page view. */
function RouteEffects() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView();
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    }
    trackPageView(pathname);
  }, [pathname, hash]);
  return null;
}

export function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only-focusable fixed top-3 left-3 z-[60] rounded-full bg-white px-4 py-2 font-semibold text-ink shadow"
      >
        Skip to main content
      </a>
      <RouteEffects />
      <SiteHeader />
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <SiteFooter />
      <StickyActions />
      <ConsentBanner />
    </>
  );
}
