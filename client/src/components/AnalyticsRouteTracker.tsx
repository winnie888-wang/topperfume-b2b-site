import { useEffect } from "react";
import { useLocation } from "wouter";
import { trackPageView } from "@/lib/analytics";
import { CONSENT_CHANGED } from '@/lib/consent';

export function AnalyticsRouteTracker() {
  const [location] = useLocation();

  useEffect(() => {
    const timer = window.setTimeout(() => trackPageView(location), 0);
    const onConsent = () => trackPageView(location);
    window.addEventListener(CONSENT_CHANGED, onConsent);
    return () => { window.clearTimeout(timer); window.removeEventListener(CONSENT_CHANGED, onConsent); };
  }, [location]);

  return null;
}
