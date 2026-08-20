/**
 * Maison Mercantile design reminder: all routes share a quiet-luxury, product-first B2B experience.
 * Use editorial hierarchy and transparent preview states; never use price-led or factory-portal patterns.
 */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import ProductDetail from "./pages/ProductDetail";

function Router() {
  return <Switch><Route path="/" component={Home} /><Route path="/collections/:category" component={Collection} /><Route path="/products/:slug" component={ProductDetail} /><Route component={Home} /></Switch>;
}

export default function App() {
  return <ErrorBoundary><ThemeProvider defaultTheme="light"><TooltipProvider><Toaster richColors position="bottom-right" /><Router /></TooltipProvider></ThemeProvider></ErrorBoundary>;
}
