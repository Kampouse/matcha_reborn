import { vitest, beforeAll, describe, it, expect, afterAll, test } from "vitest";
import { app } from "../app";
import { toNodeListener } from "h3";
import { createServer } from "node:http";
beforeAll(() => {
    const server = toNodeListener(app());
    createServer(server).listen(process.env.PORT || 3000);
});
//dummie test
describe("session", () => {
    test("should be able to set a cookie", async () => {
        const data = await fetch("http://localhost:3000/session/login", { method: "GET" })
        const body = await data.json();
        expect(body).toEqual({ hello: "session" });


        //expect(body).toEqual({ hello: "session" });
    })


})
afterAll(() => {




})