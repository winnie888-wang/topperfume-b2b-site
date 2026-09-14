import { GA4_MEASUREMENT_ID, isAnalyticsEnabled } from '@shared/analytics';

export const CONSENT_KEY = 'topperfume.analytics-consent.v1';
export const CONSENT_CHANGED = 'topperfume:consent-changed';
export const OPEN_CONSENT = 'topperfume:open-consent';
export type ConsentChoice = 'granted' | 'denied';
let sessionChoice: ConsentChoice | null = null;
let loaded = false;

export function readConsent(): ConsentChoice | null {
  if (typeof window === 'undefined') return null;
  if (sessionChoice !== null) return sessionChoice;
  try {
    const choice = window.localStorage.getItem(CONSENT_KEY);
    return choice === 'granted' || choice === 'denied' ? choice : sessionChoice;
  } catch { return sessionChoice; }
}
export function canTrack() {
  return typeof window !== 'undefined' && readConsent() === 'granted' &&
    isAnalyticsEnabled(window.location.hostname, document.querySelector('meta[name="robots"]')?.getAttribute('content') ?? '');
}
export function initializeAnalytics() {
  if (!canTrack() || loaded) return;
  loaded = true;
  (window as unknown as Record<string, unknown>)[`ga-disable-${GA4_MEASUREMENT_ID}`] = false;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function (...args: unknown[]) { window.dataLayer!.push(args); };
  const deny = { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' };
  window.gtag('consent', 'default', deny);
  window.gtag('consent', 'update', { ...deny, analytics_storage: 'granted' });
  window.gtag('js', new Date());
  window.gtag('config', GA4_MEASUREMENT_ID, { send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false });
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`;
  document.head.appendChild(script);
}
export function chooseConsent(choice: ConsentChoice) {
  sessionChoice = choice;
  let persisted = false;
  try { window.localStorage.setItem(CONSENT_KEY, choice); persisted = true; } catch { /* Session-only choice when storage is unavailable. */ }
  if (choice === 'denied') {
    (window as unknown as Record<string, unknown>)[`ga-disable-${GA4_MEASUREMENT_ID}`] = true;
    // Stop loaded enhanced measurement too, then reload with the tag completely absent.
    for (const cookie of document.cookie.split(';')) {
      const name = cookie.split('=')[0].trim();
      if (!/^_ga(?:_|$)/.test(name)) continue;
      for (const domain of ['', window.location.hostname, '.topperfume.cn']) {
        document.cookie = `${name}=; Max-Age=0; path=/;${domain ? ` domain=${domain};` : ''}`;
      }
    }
    if (loaded && persisted) { window.location.reload(); return; }
  } else {
    (window as unknown as Record<string, unknown>)[`ga-disable-${GA4_MEASUREMENT_ID}`] = false;
    initializeAnalytics();
  }
  window.dispatchEvent(new Event(CONSENT_CHANGED));
}
