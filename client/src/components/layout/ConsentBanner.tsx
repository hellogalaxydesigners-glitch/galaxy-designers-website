import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { analyticsEnabled, getConsent, loadAnalytics, setConsent } from '@/lib/analytics';
import { Button } from '@/components/ui/Button';

/**
 * Asks for analytics consent. Only appears when Google Analytics is configured
 * (VITE_GA_ID). Required for visitors from the UK and EU.
 */
export function ConsentBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!analyticsEnabled()) return;
    const consent = getConsent();
    if (consent === 'granted') loadAnalytics();
    else if (consent === null) setShow(true);
  }, []);

  if (!show) return null;

  const choose = (v: 'granted' | 'denied') => {
    setConsent(v);
    setShow(false);
  };

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-3 bottom-3 z-50 rounded-lg border border-line bg-white p-5 shadow-xl sm:inset-x-auto sm:left-6 sm:bottom-6 sm:max-w-md"
    >
      <p className="type-small text-slate">
        We use analytics cookies to understand how visitors use this site, so we can improve it. You can accept or decline.{' '}
        <Link to="/privacy" className="font-medium text-violet-strong underline underline-offset-2">
          Privacy policy
        </Link>
      </p>
      <div className="mt-4 flex gap-3">
        <Button onClick={() => choose('granted')}>Accept analytics</Button>
        <Button variant="outline-light" onClick={() => choose('denied')}>
          Decline
        </Button>
      </div>
    </div>
  );
}
