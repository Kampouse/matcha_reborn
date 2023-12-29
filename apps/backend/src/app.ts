import { createApp, useBase, createRouter, eventHandler, getRouterParam, getRouterParams, Router, use, getQuery, setCookie } from "h3";

import { listen, listenAndWatch } from "listhen";
import { AppUse } from "h3";
import SessionsRouter from "./routers/sessions";
import { defineNodeMiddleware } from "h3";



export const app = () => {
	const App = createApp();

	const midle = defineNodeMiddleware((event) => { console.log("node middleware"); });

	App.options.onRequest = (event) => { console.log("on request"); };
	App.use("/", useBase("/session", SessionsRouter));


	return App;
}
const handler = (req, res) => {
	const App = app();

}


export const vitestListen = () => {
	const App = app();

}

export default app()





//get the  path that are  being used



// listener: { url, getURL, server, close, ... }
