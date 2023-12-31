import { createApp, useBase, createRouter, eventHandler, getRouterParam, getRouterParams, Router, use, getQuery, setCookie, fromNodeMiddleware } from "h3";

import { listen, listenAndWatch } from "listhen";
import { AppUse } from "h3";
import SessionsRouter from "./routers/sessions";
import { defineNodeMiddleware } from "h3";
import z from "zod";
import { connect, Client } from "@planetscale/database";
import type { Connection, DatabaseError } from "@planetscale/database";
import pino from 'pino-http'
import "dotenv/config";
const database = () => {
	const config = {
		host: process.env.DATABASE_HOST,
		username: process.env.DATABASE_USERNAME,
		password: process.env.DATABASE_PASSWORD,
	};
	const Clientdb = new Client(config);
	return Clientdb;

}
class wrappedClient {
	client: Connection;
	constructor(client: Connection) {
		this.client = client;
	}
	//third param  is a optional validator for the query 

	async query(query: string, params) {
		try {
			return {
				success: true,
				data: await this.client.execute(query, params) as unknown
			}
		}
		catch (error: unknown) {
			return { success: false, data: error };
		}
	}
	async execute(query: string, params) { return await this.execute(query, params); }
	async transaction(query, params) { return await this.transaction(query, params); }
	async refresh() { return await this.client.refresh(); }
}
export const Clientdb = new wrappedClient(database().connection());
export const app = () => {
	const App = createApp();
	// append the database client to the app
	//App.use(fromNodeMiddleware(pino({})));
	//App.options.onRequest = (event) => { console.log("on request"); };
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
