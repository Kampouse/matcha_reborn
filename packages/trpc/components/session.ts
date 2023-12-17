import { z } from "zod";
import { procedure, router } from "../utils";
import { SessionsVerif } from "schemas";
import pbkdf from "js-crypto-pbkdf";
export default router({
  password: procedure.input(z.string()).query(async ({ input, ctx }) => {
    const ray = Uint8Array.from([42, 0, 3, 4, 5, 3, 7, 42]);
    const key = await pbkdf.pbkdf2(input, ray, 1000, 32, "SHA-256");
    const hex = Array.prototype.map
      .call(key, (x) => ("00" + x.toString(16)).slice(-2))
      .join("");
    return hex;
  }),

  register: procedure
    .input(
      z.object({
        email: z.string().email(),
        username: z.string().min(3).max(20),
        password: z
          .string()
          .min(5)
          .max(20)
          .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/,
          ),
        re_password: z
          .string()
          .min(5)
          .max(20)
          .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/,
          ),
      }),
    )
    .query(async ({ input, ctx }) => {
      function sanitizeString(str: string) {
        str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim, "");
        return str.trim();
      }
      input.email = input.email;
      input.username = sanitizeString(input.username);
      input.password = sanitizeString(input.password);
      input.re_password = sanitizeString(input.re_password);
      /*
        if (isEmpty) {
            const ray = Uint8Array.from([42, 0, 3, 4, 5, 3, 7, 42]);
            const key = await pbkdf.pbkdf2(input.password, ray, 1000, 32, 'SHA-256');
            */
      // convert the array to a hex string
      /*
                    const hex = Array.prototype.map.call(key, x => ('00' + x.toString(16)).slice(-2)).join('');
                    */
      /*
         const stuff = await caller.database.raw({
             input: `insert into users (name,email,
              username,password_hash) values ( 
             '${input.email}','${input.email}',  '${input.username}' 
             ,'${hex}')`, params: []
         });
         */
      const data = {
        userId: "",
        username: input.email,
        loggedIn: true,
        user: true,
      };
      //setToken(data);
      console.log("stuff");
      return null;
    }),

  //    session: procedure.query(({ ctx }) => { return ctx.getUserServerSide() })
});
