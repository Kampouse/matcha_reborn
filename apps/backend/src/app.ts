import {
	createApp,
	eventHandler,
	useBase,
} from "h3";

import SessionsRouter from "./routers/sessions";
import "dotenv/config";
import { useClientDB } from "./modules/database";

export const app = () => {

	const App = createApp();
	// append the database client to the app
	//App.use(fromNodeMiddleware(pino({})));
	//App.options.onRequest = (event) => { console.log("on request"); };
	const Clientdb = useClientDB();
	App.use("/", useBase("/session", SessionsRouter));

	// create a  hello wolrld thing
	App.use(SessionsRouter)
	return App;
};



export default app();

//get the  path that are  being used

// listener: { url, getURL, server, close, ... }
