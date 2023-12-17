import { z } from "zod";
import { procedure, router } from "./utils";

export default router({
    hello: procedure
        .input(z.object({ name: z.string() }))
        .query(async ({ input, ctx }) => {
            //const working = await caller.session.session()
            return `Hello ${input.name}`;
        }),
    random: procedure
        .input(z.object({ num: z.number() }))
        .mutation(({ input }) => {
            return Math.floor(Math.random() * 100) / input.num;
        }),
});
