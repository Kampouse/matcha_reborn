import pbkdf2 from "js-crypto-pbkdf";
import { Clientdb } from "../server/database";
import { z } from "zod";
const UsePasswordFromHash = async (input: string) => {
  const ray = Uint8Array.from([42, 0, 3, 4, 5, 3, 7, 42]);
  // argoion2id standart ... pbkdf2   
  const key = await pbkdf2.pbkdf2(input, ray, 1000, 32, "SHA-256");
  const hex = Array.prototype.map
    .call(key, (x) => ("00" + x.toString(16)).slice(-2))
    .join("");
  return hex;
};

export const ValidateUser = async (input: string, mail: string) => {
  try {
    const hashed = await UsePasswordFromHash(input);
    const content = await Clientdb.execute(
      "SELECT username,email FROM users WHERE email = ? AND password_hash  = ?",
      [mail, hashed],
    );
    if (content.rows.length === 0) {
      return null;
    }
    console.log("content", content.rows[0]);
    const output = z
      .object({
        username: z.string(),
        email: z.string(),
      })
      .safeParse(content.rows[0]);
    if (output.success) {
      return output.data;
    } else {
      console.log("output", output.error);
      return null;
    }
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const deleteAccount = async (inputEmail: string) => {
  const content = await Clientdb.execute("DELETE FROM users WHERE email = ? ", [
    inputEmail,
  ]);
  console.log("content", content.rows);
  return content.rows;
};

export const isExistinUser = async (inputEmail: string) => {
  const datUser = await Clientdb.execute(
    "SELECT username,email FROM users WHERE email = ? ",
    [inputEmail],
  );
  if (datUser.rows.length === 0) {
    return false;
  }
  return true;
};
export const createUser = async (input: {
  email: string;
  username: string;
  password: string;
}) => {
  const hashed = await UsePasswordFromHash(input.password);

  try {
    const content = await Clientdb.execute(
      "INSERT INTO users (email,username,password_hash) VALUES (?,?,?)",
      [input.email, input.username, hashed],
    );
    console.log("content", content.rows);
    return content.rows;

  } catch (e) {
    console.log(e);
    return false;


  };





}