import { useEffect, useState } from 'react';
import { chooseConsent, CONSENT_CHANGED, initializeAnalytics, OPEN_CONSENT, readConsent } from '@/lib/consent';

export function CookieConsent() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(readConsent() === null);
    initializeAnalytics();
    const show = () => setOpen(true);
    const close = () => setOpen(false);
    window.addEventListener(OPEN_CONSENT, show);
    window.addEventListener(CONSENT_CHANGED, close);
    return () => { window.removeEventListener(OPEN_CONSENT, show); window.removeEventListener(CONSENT_CHANGED, close); };
  }, []);
  if (!open) return null;
  return <section className="cookie-consent" aria-label="Analytics preferences"><h2>Optional analytics</h2><p>Allow Google Analytics cookies to help us understand visits and product interest? Analytics stays off until you agree. You can use the catalogue and send inquiries without agreeing. Change your choice at any time in Cookie preferences.</p><a href="/privacy">Privacy notice</a><div><button onClick={() => chooseConsent('denied')}>Reject analytics</button><button onClick={() => chooseConsent('granted')}>Allow analytics</button>{readConsent() !== null && <button onClick={() => setOpen(false)}>Close</button>}</div></section>;
}
