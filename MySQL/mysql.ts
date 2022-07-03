import { Client } from "https://deno.land/x/mysql@v2.10.2/mod.ts";

const client = await new Client().connect({
  port: 3306,
  username: "root",
  db: "mysql",
});

await client.execute(
  "CREATE TABLE IF NOT EXISTS test_table (column_1 VARCHAR(100))"
);

await client.execute(
  "INSERT INTO test_table (column_1) VALUES ('string 1'), ('string 2')"
);

const result = await client.query("SELECT * FROM test_table");

console.log(result);

await client.close();

const clientPool = await new Client().connect({
  port: 3306,
  username: "root",
  db: "mysql",
  poolSize: 2,
});

const resultPool = await clientPool.query("SELECT * FROM test_table");

console.log(resultPool);

await clientPool.close();
