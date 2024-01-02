import { getCookie, readBody, readValidatedBody, setResponseStatus } from "h3";
import { createRouter, eventHandler, setCookie } from "h3";
import z from "zod";
import { Clientdb } from "../app";
import { readZodBody } from "../utils";
import { ValidateUser } from "../modules/sessions";
import { Session } from "inspector";

const SessionsRouter = createRouter({});
SessionsRouter.post(
  "/login",
  eventHandler(async (event) => {
    const content = z.object({ email: z.string(), password: z.string() });

    const body = await readZodBody(event, content);
    if (body.success) {
      const valid = await ValidateUser(body.data.email, body.data.password);
      if (valid) {
        setCookie(event, "session", "session", { httpOnly: true });
        return { payload: { success: true, data: valid } };
      } else {
        setResponseStatus(event, 401);
        return { payload: { success: false, data: "invalid credentials" } };
      }
    }
    return { payload: body.data };
  }),
);

SessionsRouter.get(
  "/logout",
  eventHandler(async (event) => {
    return { session: "session" };
  }),
);

SessionsRouter.post(
  "/register",
  eventHandler(async (event) => {}),
);

SessionsRouter.post(
  "/",
  eventHandler((event) => {
    return { session: "session" };
  }),
);

export default SessionsRouter.handler;
