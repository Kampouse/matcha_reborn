import { serverConfig } from "../config";
import createServer from "./server";

//createServer(serverConfig);

export const viteNodeApp = createServer(serverConfig).server;
