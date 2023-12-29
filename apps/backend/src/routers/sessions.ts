import { getCookie } from "h3";
import { createApp, useBase, createRouter, eventHandler, getRouterParam, getRouterParams, Router, use, getQuery, setCookie } from "h3";
import type { CreateRouterOptions } from "h3";


const routeroptions: CreateRouterOptions = {


};


const SessionsRouter = createRouter({});


SessionsRouter.get("/login", eventHandler((event) => {


    setCookie(event, "foo", "bar", { path: "/", sameSite: "lax", expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), httpOnly: true });
    //console log the cookie 
    //return the cookie
    console.log(getCookie(event, "foo"));
    return { hello: "session" };
}));

SessionsRouter.post("/", eventHandler((event) => {
    return { hello: "session" };

}));

export default SessionsRouter.handler;
