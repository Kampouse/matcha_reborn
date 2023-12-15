import { createTRPCProxyClient } from "@trpc/client";
import superjson from "superjson";
import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import { IAppRouter } from "../../../backend/src/server/router/_app";
export const trpc = createTRPCProxyClient<IAppRouter>({
  transformer: superjson,
  links: [
    httpBatchLink({
      url: `http://localhost:2022/trpc`,
      headers: () => {
        return {
          credentials: "include",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:3000",
        };
      },
    }),
  ],
});

export const Fetch = async (param: string, init?: RequestInit) => {
  try {
    const response = await fetch(`http://localhost:3000${param}`, {
      headers: {
        "Content-Type": "application/json",
        credentials: "include",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Credentials": "true"


      },
      ...init,
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
  }
};
