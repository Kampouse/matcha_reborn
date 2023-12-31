import { createApp, useBase, createRouter, eventHandler, getRouterParam, getRouterParams, Router, use, getQuery, setCookie, fromNodeMiddleware } from "h3";

import { listen, listenAndWatch } from "listhen";
import { AppUse } from "h3";
import SessionsRouter from "./routers/sessions";
import { defineNodeMiddleware } from "h3";
import { connect, Client } from "@planetscale/database";
import pino from 'pino-http'
const database = () => {
	const config = {
		host: process.env.DATABASE_HOST,
		username: process.env.DATABASE_USERNAME,
		password: process.env.DATABASE_PASSWORD,
	};
	const Clientdb = new Client(config);
	return Clientdb;

}
export const Clientdb = database().connection();
export const app = () => {
	const App = createApp();
	// append the database client to the app
	const midle = defineNodeMiddleware((event) => { console.log("node middleware"); });
	//App.use(fromNodeMiddleware(pino({})));
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
export default app;





//get the  path that are  being used



// listener: { url, getURL, server, close, ... }
