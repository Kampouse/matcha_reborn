import { set, z } from "zod";
import { IAppRouter } from "./_app";
import { procedure, router } from "../utils";
import type { ResultSet } from "@libsql/client/.";
const User = z.array(
  z.object({
    uid: z.string(),
    email: z.string(),
  }),
);
const raw = z.object({
  input: z.string(),
  params: z.array(z.any()),
});
export default router({
  raw: procedure.input(raw).query(async ({ ctx, input }) => {
    const stuff = await ctx.db.execute(input.input, [...input.params]);
    console.log("raw", stuff);

    return stuff.rows;
  }),
  example: procedure.query(({ ctx }) => {
    try {
      const content = ctx.db.execute("select * from  users").then((result) => {
        return result.rows;
      });
      content.then((result) => {
        console.log("example", result);
      });
      return content;
    } catch (e) {
      console.log(e);
    }
  }),
});
