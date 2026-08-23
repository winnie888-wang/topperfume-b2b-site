import { useEffect } from "react";
import { useLocation } from "wouter";
import { trackPageView } from "@/lib/analytics";

export function AnalyticsRouteTracker() {
  const [location] = useLocation();

  useEffect(() => {
    const timer = window.setTimeout(() => trackPageView(location), 0);
    return () => window.clearTimeout(timer);
  }, [location]);

  return null;
}
