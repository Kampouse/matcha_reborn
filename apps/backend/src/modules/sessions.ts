import * as argon2 from "argon2";
import { Clientdb } from "../app";
import { z } from "zod";
const UsePasswordFromHash = async (input: string) => {
  // argoion2id standart ... pbkdf2
  const key = await argon2.hash(input, { type: 2 })
  console.log("key", key);
  return key;
};

export const ValidateUser = async (mail: string, input: string) => {
  const hashed = await UsePasswordFromHash(input);
  const content = await Clientdb.query(
    "SELECT * FROM users WHERE email = ?",
    [mail],
  );
  console.log("content", content.data.rows);
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

export const isExistingUser = async (inputEmail: string, username: string) => {

  console.log("datUser", inputEmail);


  // make a query where it check if the email or username is already in the database
  const datUser = await Clientdb.query(
    "SELECT username,email FROM users WHERE email = ? OR username = ? ",
    [inputEmail, username],
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

  if (input.password == undefined) {
    console.log("input", input);
    return false;


  }

  const hashed = await UsePasswordFromHash(input.password);

  try {
    const content = await Clientdb.query(
      "INSERT INTO users (email,username,password_hash) VALUES (?,?,?)",
      [input.email, input.username, hashed],
    );
    if (content.success === true) {
      return true;
    }
    else {
      return { success: false, data: content.data.rowsAffected, reason: "could not write to the database existing user" };
    }
  } catch (e) {
    console.log(e);
    return false;
  }
};
