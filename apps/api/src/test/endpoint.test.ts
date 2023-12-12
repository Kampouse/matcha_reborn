import { describe, it, expect } from "vitest";
import type { IAppRouter } from "../server/router/_app";
import { createServer } from "../server/server";
import type { ServerOptions } from "../server/server";
export const testConfiig: ServerOptions = {
    dev: true,
    port: 2022,
    prefix: "/trpc",
};

const serv = createServer(testConfiig);
serv.start();
describe("fetchData function", () => {
    it("should fetch and return data", async () => {
        // Mocking fetch
        // URL to be fetched (can be a dummy URL since fetch is mocked)

        const loginObj = {
            email: "jpmartel98@gmail.com",
            password: process.env.PASSWORD ?? "check your credentials",
        };
        const result = await fetch("http://localhost:2022/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginObj),
        });
        const data = await result.json();

        //compare object to expected object
        const expected = {
            creds: {
                email: "jpmartel98gmail.com",
                username: "Kampouse",
            },
        };
        expect(data).toEqual(expected);
    });
});
