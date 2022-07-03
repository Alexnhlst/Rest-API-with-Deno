import { DB } from "https://deno.land/x/sqlite@v3.2.1/mod.ts";

const db = new DB("test.db");

db.query("CREATE TABLE IF NOT EXISTS test_table (column_1 VARCHAR(100))");
db.query("INSERT INTO test_table (column_1) VALUES ('string 1'), ('string 2')");

const resultArray = [...db.query("SELECT * FROM test_table")];

const resultObject = [...db.queryEntries("SELECT * FROM test_table")];

console.log({ resultArray, resultObject });

db.close();
