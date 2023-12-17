/* @refresh reload */
import "./index.css";

import { render } from "solid-js/web";
import superjson from "superjson";
import { Router } from "@solidjs/router";
import { QueryClientProvider, QueryClient } from "@tanstack/solid-query";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { IAppRouter } from "../../backend/src/server/router/_app";

import { onMount } from "solid-js";
import App from "./app";
const queried = new QueryClient({
  defaultOptions: { queries: { staleTime: 1000 * 60 * 5 } },
});
const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?",
  );
}

render(
  () => (
    <QueryClientProvider client={queried}>
      <Router>
        <App />
      </Router>
    </QueryClientProvider>
  ),
  root,
);
