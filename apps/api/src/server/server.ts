import ws from "@fastify/websocket";
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import fastify from "fastify";
import { z } from "zod";
import { appRouter } from "./router/_app";
import { createContext } from "./context";
import cors from "@fastify/cors";
import cookie from "@fastify/cookie";
import { Clientdb as db } from "./database";
import type { FastifyCookieOptions } from "@fastify/cookie";
import {
  ValidateUser,
  isExistinUser,
  createUser,
  deleteAccount,
} from "../utils/session";
// change this
export interface ServerOptions {
  dev?: boolean;
  port?: number;
  prefix?: string;
}

export default function createServer(opts: ServerOptions) {
  const dev = opts.dev ?? true;
  const port = opts.port ?? 3000;
  const prefix = opts.prefix ?? "/trpc";
  const server = fastify({ logger: dev });


  void server.register(cookie, {
    secret: "my-secret", // for cookies signature
    hook: "onRequest", // set to false to disable cookie autoparsing or set autoparsing on any of the following hooks: 'onRequest', 'preParsing', 'preHandler', 'preValidation'. default: 'onRequest'

    parseOptions: {}, // options for
  } satisfies FastifyCookieOptions);
  void server.register(ws);

  void server
    .register(fastifyTRPCPlugin, {
      prefix,
      useWSS: true,
      trpcOptions: {
        router: appRouter,
        createContext,
        Headers: {
          credentials: "include", // Include credentials in requests
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Allow-Origin": "http://localhost:3000/*",
        },
      },
    })
    .register(cors, { origin: "*", credentials: true });


  // make this work some day
  server.register(async function (instance, opts, done) {
    //add a crsf token to the cookie
    return instance.addHook("preHandler", async (request, reply) => {
      reply.setCookie("csrfToken", "what even is this", { path: "/" });
      done();
    });
  });





  server.get("/", (req, reply) => {
    // `reply.unsignCookie()` is also available
    reply
      .setCookie("foo", "foo", {
        path: "/",
        sameSite: "lax",
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
        httpOnly: true,
      })

      .send({ hello: "world" })
      .status(302);
  });

  //make a 302 to set the cookie
  server.post("/login", async (req, res) => {
    const creds = req.body;
    console.log("login", req.body);
    const parsed_creds = z
      .object({
        email: z.string(),
        password: z.string(),
      })
      .parse(creds);
    //remove @ from email // this shoul not be preesent
    const mail = parsed_creds.email.replace("@", "");
    const data = await ValidateUser(parsed_creds.password, mail);
    //const content = await db.execute("SELECT * FROM users WHERE email = ?", [mail])
    if (data !== null) {
      //res.setCookie('username', 'hello', {
      // path: "localhost:3000",
      //})
      //
      return res.send({ creds: data });
    } else {
      res.status(401);
      throw new Error("invalid credentials");
    }
  });

  server.get("/logout", async (req, res) => {
    console.log("logout", req.cookies);

    return { hello: req.cookies?.username };
  });

  server.post("/register", async (req, res) => {
    const validated_input = z
      .object({
        email: z.string(),
        username: z.string(),
        password: z.string(),
        re_password: z.string(),
      })
      .parse(req.body);
    const userExist = await isExistinUser(validated_input.email);
    if (userExist) {
      res.status(401);
      //TODO: make this a custom error
      throw new Error("user already exists");
    } else {
      res.status(200);
      const data = await createUser(validated_input);

      const obj_sent = {
        creds: {
          email: validated_input.email,
          username: validated_input.username,
        },
      };
      res.send(obj_sent);
    }
  });

  server.delete("/delete_user", async (req, res) => {
    const validated_input = z
      .object({
        email: z.string(),
      })
      .parse(req.body);
    const userExist = await isExistinUser(validated_input.email);
    if (userExist) {
      const data = await deleteAccount(validated_input.email);
      res.status(200);
      //TODO: make this a custom error
    } else {
      res.status(401);
      throw new Error("user does not exists");
    }
  });
  // delete user account
  const stop = async () => {
    await server.close();
  };
  const start = async () => {
    try {
      await server.listen({ port });
      console.log("listening on port", port);
    } catch (err) {
      server.log.error(err);
      process.exit(1);
    }
  };
  return { server, start, stop };
}
