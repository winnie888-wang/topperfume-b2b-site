import React from "react";
import { renderToString } from "react-dom/server";
import { Router, Route, Switch } from "wouter";
import Home from "../client/src/pages/Home";
import Collection from "../client/src/pages/Collection";
import ProductDetail from "../client/src/pages/ProductDetail";
import LowMoqPerfume from "../client/src/pages/LowMoqPerfume";
import Contact from "../client/src/pages/Contact";
import NotFound from "../client/src/pages/NotFound";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc } from "../client/src/lib/trpc";

// The client replaces this initial markup when React mounts. Keep the same
// route components so product facts and navigation do not diverge in raw HTML.
export function prerenderBody(path: string) {
  const queryClient = new QueryClient();
  const client = trpc.createClient({ links: [] });
  return renderToString(<trpc.Provider client={client} queryClient={queryClient}><QueryClientProvider client={queryClient}><Router ssrPath={path}><Switch>
    <Route path="/" component={Home} />
    <Route path="/collections/:category" component={Collection} />
    <Route path="/products/:slug" component={ProductDetail} />
    <Route path="/low-moq-perfume-manufacturer" component={LowMoqPerfume} />
    <Route path="/contact" component={Contact} />
    <Route component={NotFound} />
  </Switch></Router></QueryClientProvider></trpc.Provider>);
}
