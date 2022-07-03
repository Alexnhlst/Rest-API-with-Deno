import { Client, Pool } from "https://deno.land/x/postgres@v0.15.0/mod.ts";

const client = new Client({
  user: "postgres",
  password: "password",
  database: "postgres",
  hostname: "localhost",
  port: 6543,
});
