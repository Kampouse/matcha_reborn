import {
	createApp,
	useBase,
} from "h3";

import SessionsRouter from "./routers/sessions";
import { Client } from "@planetscale/database";
import type {
	Connection,
	ExecutedQuery,
} from "@planetscale/database";
import "dotenv/config";
const database = () => {
	const config = {
		host: process.env.DATABASE_HOST,
		username: process.env.DATABASE_USERNAME,
		password: process.env.DATABASE_PASSWORD,
	};
	const Clientdb = new Client(config);
	return Clientdb;
};
class wrappedClient {
	client: Connection;
	constructor(client: Connection) {
		this.client = client;
	}
	//third param  is a optional validator for the query

	async query(
		query: string,
		params,
	): Promise<{ success: boolean; data: ExecutedQuery }> {
		try {
			return {
				success: true,
				data: (await this.client.execute(query, params)) as ExecutedQuery,
			};
		} catch (error) {
			return { success: false, data: error };
		}
	}
	async execute(query: string, params) {
		return await this.execute(query, params);
	}
	async transaction(query, params) {
		return await this.transaction(query, params);
	}
	async refresh() {
		return await this.client.refresh();
	}
}
export const Clientdb = new wrappedClient(database().connection());
export const app = () => {
	const App = createApp();
	// append the database client to the app
	//App.use(fromNodeMiddleware(pino({})));
	//App.options.onRequest = (event) => { console.log("on request"); };
	App.use("/", useBase("/session", SessionsRouter));
	return App;
};
export default app;

//get the  path that are  being used

// listener: { url, getURL, server, close, ... }
