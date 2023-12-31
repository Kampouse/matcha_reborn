import { getCookie, readBody, readValidatedBody, setResponseStatus } from "h3";
import { createRouter, eventHandler, setCookie } from "h3";
import z from "zod";
import { Clientdb } from "../app";
import { readZodBody } from "../utils";

const SessionsRouter = createRouter({});
SessionsRouter.post("/login", eventHandler(async (event) => {
    const content = z.object({ email: z.string(), password: z.string() });
    const body = await readZodBody(event, content);
    if (!body.success) {
        const result = await Clientdb.query("SELECT * FROM users WHERE email = ?", ["hello"]);
        if (result.success) {
            return { payload: result.data };
        }
    }
    return { payload: body.data };



})


)




SessionsRouter.post("/", eventHandler((event) => {
    return { session: "session" };

}));

export default SessionsRouter.handler;
