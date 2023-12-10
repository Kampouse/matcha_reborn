import { IContext } from "../context";
import { router } from "../utils";

import {
  CreateFastifyContextOptions,
  fastifyRequestHandler,
} from "@trpc/server/adapters/fastify";
//trpc.register. register. useQuery(() => content)
import example from "./example";
import database from "./database";
import session from "./session";
import { Clientdb as db } from "../database";
export const appRouter = router({
  example,
  database,
  session,
});

// how to create a caller for this router
// import { createCaller } from "solid-start-trpc";
export type IAppRouter = typeof appRouter;
