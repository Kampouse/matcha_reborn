import pbkdf2 from "js-crypto-pbkdf";
import { Clientdb } from "../app";
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
  const hashed = await UsePasswordFromHash(input);
  const content = await Clientdb.query(
    "SELECT username,email FROM users WHERE email = ? AND password_hash  = ?",
    [mail, hashed],
  );
  if (content.success === true && content.data.rows.length === 1) {
    const onput = z
      .object({ username: z.string(), email: z.string() })
      .parse(content.data.rows[0]);
    return onput;
  } else {
    return null;
  }
};

export const deleteAccount = async (inputEmail: string) => {
  const content = await Clientdb.query("DELETE FROM users WHERE email = ? ", [
    inputEmail,
  ]);
  console.log("content", content.data.rows);
  return content.data.rows;
};

export const isExistinUser = async (inputEmail: string) => {
  const datUser = await Clientdb.query(
    "SELECT username,email FROM users WHERE email = ? ",
    [inputEmail],
  );
  if (datUser.data.rows.length === 0) {
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
    const content = await Clientdb.query(
      "INSERT INTO users (email,username,password_hash) VALUES (?,?,?)",
      [input.email, input.username, hashed],
    );

    if (content.data.rowsAffected === 1) {
      return true;
    }
    return false;
  } catch (e) {
    console.log(e);
    return false;
  }
};
