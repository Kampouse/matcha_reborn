import { faker } from '@faker-js/faker';
import { describe, it, expect } from "vitest";
import { createServer } from "../server/server";
import type { ServerOptions } from "../server/server";
faker.seed(123);
export const testConfiig: ServerOptions = {
    dev: true,
    port: 2022,
    prefix: "/trpc",
};
const serv = createServer(testConfiig);
serv.start();
describe("login test", () => {
    it("send data to server to login", async () => {
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

describe("register test test", () => {
    it("should send data to  server to register user", async () => {
        // Mocking fetch
        // URL to be fetched (can be a dummy URL since fetch is mocked)

        const pass = faker.internet.password();

        const regist_obj = {
            email: faker.internet.email(),
            username: faker.internet.userName(),
            password: pass,
            re_password: pass
        };
        //clean up to make sure the user is not already in the database
        const deleted = await fetch("http://localhost:2022/delete_user", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: regist_obj.email }) });
        const result = await fetch("http://localhost:2022/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(regist_obj),
        });
        const data = await result.json();

        //compare object to expected object
        const expected = {
            creds: {
                email: regist_obj.email,
                username: regist_obj.username,
            },
        };
        expect(data).toEqual(expected);
    });
});


