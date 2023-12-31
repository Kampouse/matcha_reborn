import type { inferAsyncReturnType } from "@trpc/server";
import type { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";

export const createContextInner = async (opts: CreateFastifyContextOptions) => {
  const { req, res } = opts;

  const data = await fetch("http://localhost:2022/login");
  const cookie = data.headers.get("set-cookie");

  console.log(">>> cookie ->>>:", cookie);

  if (!cookie) {
    return {
      req,
      res,
      user: "",
    };
  }
  const user = cookie[0].split(";")[0].split("=")[1];
  return {
    req,
    res,
    user,
  };
};

export const createContext = async (opts: CreateFastifyContextOptions) => {
  return await createContextInner(opts);
};

export type IContext = inferAsyncReturnType<typeof createContext>;
