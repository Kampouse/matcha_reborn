import { connect, Client } from "@planetscale/database";
import dotenv from "dotenv";
import z from "zod";
dotenv.config();
const config = {
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
};

export const Clientdb = new Client(config).connection();
