## Table of contents

1. [Installing MySQL](#installing-mysql)
2. [Writing the connection](#writing-the-connection)
3. [First query](#first-query)
4. [Pool connection](#pool-connection)


### MySQL

The driver for `deno_mysql` also supports MariaDB. [^1]

---

### Installing MySQL

The installation is provided using Docker. If there are any permission errors, the command must be executed with `sudo`.

> The default username for MySQL is root and the password is root, however, the Deno client does not yet support authentication for version 8 or newer, so password login is disabled

```shell
# MySQL
docker run --rm -p 3306:3306 -e MYSQL_ALLOW_EMPTY_PASSWORD=yes mysql

# MariaDB
docker run --rm -p 3306:3306 -e MYSQL_ALLOW_EMPTY_PASSWORD=yes mariadb
```

- `--rm` will clean up the container after killing it.
- `-p` is short for `--port`. It links a port on the container with a port on the local system, allowing the connection.
- `-e` is short for `--env`. It is used to pass an env variable to container.

> If an error is raised, it probably means that the port is already used for something else. 

---

### Writing the connection

For `MySQL`, the script will be hosted in the file `mysql.ts`. [^2]
The starting point is importing the client.

```ts
import { Client } from "https://deno.land/x/mysql@v2.10.2/mod.ts";
```

This line will import the MySQL client and allows to acces MySQL.
To establish a connection, we need to initiate the connection with the MySQL settings.

```typescript
const client = await new Client().connect({
  port: 3306,
  username: "root",
  db: "mysql",
});
```

Run the file with `deno run --allow-env --allow-net mysql.ts`, if the application outputs nothing and exits with a code 0 it means that all is working.

---

### First query

Since a connection is established with the database, it's time to execute some queries.
The first query will create a new table.

```ts
await client.execute(
  "CREATE TABLE IF NOT EXISTS test_table (column_1 VARCHAR(100))"
);

await client.execute(
  "INSERT INTO test_table (column_1) VALUES ('string 1'), ('string 2')"
);

const result = await client.query("SELECT * FROM test_table");

console.log(result);

await client.close();
```

```shell
deno run --allow-env --allow-net mysql.ts
```

An output similar to this should be produced.

```shell
INFO connecting 127.0.0.1:3306
INFO connected to 127.0.0.1:3306
[ { column_1: "string 1" }, { column_1: "string 2" } ]
INFO close connection
```

> The first two lines are logging information from the client. [^3]

The data is retrieved as an array of objects, in comparison to the Postgres client, there is not a lot of extra information available.

---

### Pool connection

To use a pool connection with MySQL, `poolSize` is added to the connection parameters.
The MySQL client creates a default pool of 1, and any other value will override this amount.

```ts
const clientPool = await new Client().connect({
  port: 3306,
  username: "root",
  db: "mysql",
  poolSize: 2,
});

const resultPool = await clientPool.query("SELECT * FROM test_table");

console.log(resultPool);

await clientPool.close();
```

Besides the additional option, there are no differences in the usage, and for each query, the client will grab ana available connection from te pool.

[^1]: [MySQL drivers](https://github.com/denodrivers/mysql)
[^2]: [mysql.ts](mysql.ts)
[^3]: [MySQL logging](https://github.com/denodrivers/mysql#logging)