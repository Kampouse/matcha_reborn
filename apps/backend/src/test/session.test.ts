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
beforeAll(() => {
  const server = toNodeListener(app());
  createServer(server).listen(process.env.PORT || 3000);
});
//dummie test
describe("valid login", () => {
  test("should be able to set a cookie", async () => {
    const input = { email: "hello", password: "world" };
    const data = await fetch("http://localhost:3000/session/login", {
      method: "POST",
      body: JSON.stringify(input),
    });

    const body = await data.json();

    expect(body).toEqual({
      payload: { success: true, data: { email: "hello", password: "world" } },
      //expect(body).toEqual({ hello: "session" });
    });
  });
});

afterAll(() => {});
