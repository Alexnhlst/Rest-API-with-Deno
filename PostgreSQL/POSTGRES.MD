## Table of contents

1. [Installing PostgreSQL](#installing-postgresql)
2. [Writing the connection](#writing-the-connection)
3. [First query](#first-query)
4. [Pool connection](#pool-connection)


### PostgreSQL

PostgreSQL is also commonly referred to as Postgres or `pgsql/psql/pg`.
The driver for connecting to PostgreSQL are provided by Deno Drivers [^1][^2]

---

### Installing PostgreSQL

The installation is provided using Docker. If there are any permission errors, the command must be executed with `sudo`.

```shell
docker run --rm -p 6543:5432 -e POSTGRES_PASSWORD=password postgres
```

- `--rm` will clean up the container after killing it. [^3]
- `-p` is short for `--port`. It links a port on the container with a port on the local system, allowing the connection.
- `-e` is short for `--env`. It is used to pass an env variable to container.

> If an error is raised, it probably means that the port is already used for something else. 

---

### Writing the connection

As the installation of libraries for Deno is as simple as importing a URL, we can follow the Readme.
In a new file called `postgres.ts` this line is added.

```ts
import { Client, Pool } from "https://deno.land/x/postgres@v0.15.0/mod.ts";
```

This line will import the Postgres client and allows to acces Postgres.
To establish a connection, we need to initiate the connection with the Postgres settings.
By default, a fresh Postgres installation will have username `postgres` and password `password` unless something else is specified.

```typescript
const client = new Client({
  user: "postgres",
  password: "password",
  database: "postgres",
  hostname: "localhost",
  port: 6543,
});
```

Run the file with `deno run --allow-env --allow-net postgres.ts`, if the application outputs nothing and exits with a code 0 it means that all is working.

---

### First query

Since a connection is established with the database, it's time to execute some queries.
The first query will create a new table.

```ts
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
```

```shell
deno run --allow-env --allow-net postgres.ts
```

An output similar to this should be produced.

```shell
QueryObjectResult {
  command: "SELECT",
  rowCount: 2,
  warnings: [],
  query: Query {
    args: [],
    camelcase: undefined,
    fields: undefined,
    result_type: 1,
    text: "SELECT * FROM test_table"
  },
  columns: [ "column_1" ],
  rows: [ { column_1: "string 1" }, { column_1: "string 2" } ]
}
```

---

### Pool connection

Instead of using the `Client` class, the `Pool` class is used to create a pool connection. Pool needs a `release()` when finished querying the database for that session. Pool and Client perform the same, however by using Pool, you will reduce the time it takes to create a connection for each query This is especially beneficial for applicatios with thousands of requests per second. 

```ts
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
```

To only get the rows, `results.row` will give an array of objects representing the result;

[^1]: [Deno drivers](https://github.com/denodrivers)
[^2]: [PostgreSQL drivers](https://github.com/denodrivers/postgres)
[^3]: [Docker documentation](https://docs.docker.com/engine/reference/run/#clean-up---rm)