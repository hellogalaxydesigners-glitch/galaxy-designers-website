import { useEffect, useId, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { ChevronDown, Menu } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { ButtonLink } from '@/components/ui/Button';
import { ServiceGlyph } from '@/components/services/ServiceGlyph';
import { MobileMenu } from './MobileMenu';
import { servicesBySide } from '@/content/services';
import { homeContent } from '@/content/home';
import { cn } from '@/lib/cn';

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'relative px-3 py-2 text-[0.9375rem] font-medium transition-colors',
    isActive ? 'text-white' : 'text-white/70 hover:text-white',
    isActive && 'after:absolute after:inset-x-3 after:-bottom-0.5 after:h-px after:bg-lavender',
  );

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const panelId = useId();
  const servicesRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menus on navigation
  useEffect(() => {
    setServicesOpen(false);
    setMenuOpen(false);
  }, [location.pathname]);

  // Close the services panel on outside click or Escape
  useEffect(() => {
    if (!servicesOpen) return;
    const onPointer = (e: PointerEvent) => {
      if (!servicesRef.current?.contains(e.target as Node)) setServicesOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setServicesOpen(false);
        servicesRef.current?.querySelector<HTMLButtonElement>('button')?.focus();
      }
    };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [servicesOpen]);

  const servicesActive = location.pathname.startsWith('/services');

  return (
    <header
      className={cn(
        'on-dark sticky top-0 z-40 bg-ink transition-[border-color] duration-300',
        scrolled ? 'border-b border-white/10' : 'border-b border-transparent',
      )}
    >
      <div className="container-site flex h-16 items-center justify-between gap-6 sm:h-[4.5rem]">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          <NavLink to="/work" className={navLinkClass}>
            Work
          </NavLink>

          <div ref={servicesRef} className="relative">
            <button
              type="button"
              aria-expanded={servicesOpen}
              aria-controls={panelId}
              onClick={() => setServicesOpen((v) => !v)}
              className={cn(
                'flex items-center gap-1 px-3 py-2 text-[0.9375rem] font-medium transition-colors',
                servicesActive || servicesOpen ? 'text-white' : 'text-white/70 hover:text-white',
              )}
            >
              Services
              <ChevronDown aria-hidden className={cn('size-4 transition-transform', servicesOpen && 'rotate-180')} />
            </button>

            <div
              id={panelId}
              hidden={!servicesOpen}
              className="absolute top-full left-1/2 mt-3 w-[44rem] -translate-x-1/2 rounded-lg border border-white/10 bg-ink-2 p-6 shadow-2xl shadow-black/40"
            >
              <div className="grid grid-cols-2 gap-8">
                {(['creative', 'engineering'] as const).map((side) => (
                  <div key={side}>
                    <p className={cn('type-meta mb-3', side === 'creative' ? 'text-lavender' : 'text-sky')}>
                      {side === 'creative' ? homeContent.services.creative.title : homeContent.services.engineering.title}
                    </p>
                    <ul className="grid gap-1">
                      {servicesBySide[side].map((s) => (
                        <li key={s.slug}>
                          <Link
                            to={`/services/${s.slug}`}
                            className="group flex items-start gap-3 rounded-md p-2 -mx-2 hover:bg-white/5"
                          >
                            <ServiceGlyph id={s.glyph} side={s.side} onDark className="size-8 mt-0.5" />
                            <span>
                              <span className="block text-[0.9375rem] font-semibold text-white">{s.title}</span>
                              <span className="block text-sm leading-snug text-white/60">{s.summary}</span>
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                <Link to="/services" className="text-sm font-semibold text-white underline-offset-4 hover:underline">
                  View all services
                </Link>
                <Link to="/consultation" className="text-sm text-white/70 underline-offset-4 hover:text-white hover:underline">
                  Not sure what you need? Schedule a consultation
                </Link>
              </div>
            </div>
          </div>

          <NavLink to="/about" className={navLinkClass}>
            About
          </NavLink>
          <NavLink to="/contact" className={navLinkClass}>
            Contact
          </NavLink>
        </nav>

        <div className="flex items-center gap-2">
          {/* Wrapped so the "hidden on phones" rule isn't overridden by the button's own display style */}
          <div className="hidden sm:block">
            <ButtonLink to="/start-a-project">Start a project</ButtonLink>
          </div>
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-expanded={menuOpen}
            aria-haspopup="dialog"
            className="-mr-2 flex h-11 items-center gap-2 rounded-full px-3 text-[0.9375rem] font-medium text-white lg:hidden"
          >
            <Menu aria-hidden className="size-5" />
            Menu
          </button>
        </div>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} returnFocusRef={menuButtonRef} />
    </header>
  );
}
