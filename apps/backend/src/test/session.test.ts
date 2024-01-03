import {
  vitest,
  beforeAll,
  describe,
  it,
  expect,
  afterAll,
  test,
} from "vitest";
import { app } from "../app";
import { toNodeListener } from "h3";
import { createServer } from "node:http";
import { faker } from "@faker-js/faker";

beforeAll(() => {
  const server = toNodeListener(app());
  createServer(server).listen(process.env.PORT || 3000);
});
//dummie test
describe("valid login", () => {
  test("should be able to set a cookie", async () => {
    const input = { email: "jpmartel99@gmail.com", password: process.env.PASSWORD };
    const data = await fetch("http://localhost:3000/session/login", {
      method: "POST",
      body: JSON.stringify(input),
    });

    const body = await data.json();

    expect(body).toEqual({
      payload: { success: true, data: { email: "jpmartel99@gmail.com", username: "Kamper_lol" } },
      //expect(body).toEqual({ hello: "session" });
    });
  });
});
describe("valid register", () => {
  test("should be able to register", async () => {
    const pass = faker.internet.password();
    const register = {
      email: faker.internet.email(),
      username: faker.internet.userName(),
      re_password: pass,
      password: pass
    };
    const data = await fetch("http://localhost:3000/session/register", {
      method: "POST",
      body: JSON.stringify(register),
    });
    const body = await data.json();
    console.log("body content", body);
    expect(body).toEqual({
      payload: { success: true, data: { email: register.email, username: register.username } },
      //expect(body).toEqual({ hello: "session" });
    });
  });
});






afterAll(async () => {








});
