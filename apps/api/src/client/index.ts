import {
  createTRPCProxyClient,
  createWSClient,
  httpBatchLink,
  splitLink,
  wsLink,
} from "@trpc/client";
import superjson from "superjson";
import { serverConfig } from "../config";
import type { IAppRouter } from "../server/router/_app";
import "./polyfill";
import { vitest } from "vitest";

const tester = async (fn: any, expected: any) => {
  const output = await fn();

  if (output !== expected) {
    console.log(">>> output:", output);
    console.log(">>> expected:", expected);
  }
  console.log(">>> success");
};
async function start() {
  const { port, prefix } = serverConfig;
  const urlEnd = `localhost:${port}${prefix}`;
  const wsClient = createWSClient({ url: `ws://${urlEnd}` });
  const trpc = createTRPCProxyClient<IAppRouter>({
    links: [
      splitLink({
        condition(op) {
          return op.type === "subscription";
        },
        true: wsLink({ client: wsClient }),
        false: httpBatchLink({ url: `http://${urlEnd}` }),
      }),
    ],
    // add credentials to all requests
  });

  const loginObj = {
    username: "kampouse",
    password: "password",
  };
  const expected = JSON.stringify({
    creds: { username: "kampouse", password: "password" },
  });
  tester(async () => {
    const result = await fetch("http://localhost:2022/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginObj),
    });
    const data = await result.json();
    return JSON.stringify(data);
  }, expected);

  // tester(() =>  fetch("http://localhost:2022/"), { hello: 'world' })

  tester(() => trpc.example.hello.query({ name: "world" }), "Hello world");
}

void start();
