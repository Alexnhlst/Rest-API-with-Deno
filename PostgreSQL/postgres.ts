import { Client, Pool } from "https://deno.land/x/postgres@v0.15.0/mod.ts";

const client = new Client({
  user: "postgres",
  password: "password",
  database: "postgres",
  hostname: "localhost",
  port: 6543,
});

await client.connect();

await client.queryObject(
  "CREATE TABLE IF NOT EXISTS test_table (column_1 VARCHAR)"
);

await client.queryObject(
  "INSERT INTO test_table (column_1) VALUES ('string 1'), ('string 2')"
);

const result = await client.queryObject("SELECT * FROM test_table");

console.log(result);

await client.end();

const clientPool = new Pool(
  {
    user: "postgres",
    password: "password",
    database: "postgres",
    hostname: "localhost",
    port: 6543,
  },
  2
);

const clientInstance = await clientPool.connect();

const resultPool = await clientInstance.queryObject("SELECT * FROM test_table");

console.log(resultPool);

clientInstance.release();

await clientPool.end();
