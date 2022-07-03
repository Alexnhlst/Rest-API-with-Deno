import { Client } from "https://deno.land/x/mysql@v2.10.2/mod.ts";

const client = await new Client().connect({
  port: 3306,
  username: "root",
  db: "mysql",
});
