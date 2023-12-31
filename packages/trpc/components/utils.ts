import { initTRPC, TRPCError } from "@trpc/server";
import type { IContext } from "./context";
export const t = initTRPC.context<IContext>().create();
export const middleware = t.middleware;
export const router = t.router;
export const procedure = t.procedure;
