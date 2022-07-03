# Using databases with Deno

## Table of contents

1. [PostgreSQL](#postgresql)
    - [Installing PostgreSQL](#installing-postgresql)
    - [Writing the connection](#writing-the-connection)
2. [MySQL](#mysql)
3. [SQLite](#sqlite)

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

{lang=typescript,line-numbers=on,crop-start-line=3,crop-end-line=10}
<<[postgres.ts](./postgres.ts)


###

[^1]: [Deno drivers](https://github.com/denodrivers)
[^2]: [PostgreSQL drivers](https://github.com/denodrivers/postgres)
[^3]: [Docker documentation](https://docs.docker.com/engine/reference/run/#clean-up---rm)