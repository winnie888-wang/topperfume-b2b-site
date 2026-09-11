/**
 * Maison Mercantile design reminder: all routes share a quiet-luxury, product-first B2B experience.
 * Use editorial hierarchy and transparent preview states; never use price-led or factory-portal patterns.
 */
import { Toaster } from "@/components/ui/sonner";
import { lazy, Suspense } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import "./refinement.css";
import "./catalogue.css";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
const Contact = lazy(() => import("./pages/Contact"));
const Collection = lazy(() => import("./pages/Collection"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
import NotFound from "./pages/NotFound";
const LowMoqPerfume = lazy(() => import("./pages/LowMoqPerfume"));
import { AnalyticsRouteTracker } from "./components/AnalyticsRouteTracker";
function Router() {
  // make sure to consider if you need authentication for certain routes
  return <><AnalyticsRouteTracker /><Suspense fallback={<main className="route-loading" role="status">Loading products…</main>}><Switch><Route path="/" component={Home} /><Route path="/contact" component={Contact} /><Route path="/low-moq-perfume-manufacturer" component={LowMoqPerfume} /><Route path="/collections/:category" component={Collection} /><Route path="/products/:slug" component={ProductDetail} /><Route component={NotFound} /></Switch></Suspense></>;
}

export default function App() {
  return <ErrorBoundary><ThemeProvider defaultTheme="light"><TooltipProvider><Toaster richColors position="bottom-right" /><Router /></TooltipProvider></ThemeProvider></ErrorBoundary>;
}
