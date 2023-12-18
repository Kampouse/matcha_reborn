/* @refresh reload */
import "./index.css";

import { render } from "solid-js/web";
import superjson from "superjson";
import { Router } from "@solidjs/router";
import { QueryClientProvider, QueryClient } from "@tanstack/solid-query";
import type { IAppRouter } from "@repo/trpc";
import { serverConfig } from "@repo/trpc";


import {
  createTRPCProxyClient,
  createWSClient,
  httpBatchLink,
  splitLink,
  wsLink,
  
} from "@trpc/client";






import App from "./app";


const { port, prefix } = serverConfig;
  const urlEnd = `localhost:${port}${prefix}`;
  const wsClient = createWSClient({ url: `ws://${urlEnd}` });
  export  const trpc = createTRPCProxyClient<IAppRouter>({
    links: [
      splitLink({
        condition(op) {
          return op.type === "subscription";
        },
        true: wsLink({ client: wsClient }),
        false: httpBatchLink({ url: `http://${urlEnd}` }),
      }),
    ],
    transformer: superjson,
    // add credentials to all requests
  });

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
