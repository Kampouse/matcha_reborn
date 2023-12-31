import { read } from "fs";
import { getCookie, readBody, readValidatedBody, setResponseStatus } from "h3";
import { createApp, useBase, createRouter, eventHandler, getRouterParam, getRouterParams, Router, use, getQuery, setCookie } from "h3";
import type { CreateRouterOptions, H3Event } from "h3";
import z from "zod";
import { zu } from 'zod_utilz'

const routeroptions: CreateRouterOptions = {


};
const readZodBody = async <T extends z.ZodType>(event: H3Event, schema: T): Promise<{ success: boolean, data: z.infer<T> }> => {
    try {
        const jsonparser = zu.stringToJSON();
        const body = await readBody(event);
        const parsed = jsonparser.parse(body);
        const validated = schema.safeParse(parsed);
        return { success: validated.success, data: validated };
    } catch (error) { return { success: false, data: error }; }
}

//fix the the type so it can take the zodtype and return the type of the zodtype 

const SessionsRouter = createRouter({});


SessionsRouter.post("/login", eventHandler(async (event) => {
    //const credss = zu.stringToJSON()
    //conver
    const content = z.object({ email: z.string(), password: z.string() });
    type content = z.infer<typeof content>;


    const body = await readZodBody(event, content);

    if (body.success) {
        return { payload: body.data };
    }
    else {
        return { payload: body.data };
    }


})


)




SessionsRouter.post("/", eventHandler((event) => {
    return { session: "session" };

}));

export default SessionsRouter.handler;
