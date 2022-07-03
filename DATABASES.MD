# Using databases with Deno

## Table of contents

1. [Introduction](#introduction)
2. [PostgreSQL](#postgresql)
    - [Installing PostgreSQL](#installing-postgresql)
3. [MySQL](#mysql)
4. [SQLite](#sqlite)

### PostgreSQL

PostgreSQL is also commonly referred to as Postgres or `pgsql/psql/pg`.
The driver for connecting to PostgreSQL are provided by Deno Drivers [^1][^2]

---

### Installing PostgreSQL

The installation is provided using Docker. If there are any permission errors, the command must be executed with `sudo`.

```shell
docker run --rm -p 5432:5432 -e POSTGRES_PASSWORD=password postgres
```

- `--rm` will clean up the container after killing it. [^3]
- `-p` is short for `--port`. It links a port on the container with a port on the local system, allowing the connection.
- `-e` is short for `--env`. It is used to pass an env variable to container.

> If an error is raised, it probably means that the port is already used for something else.

[^1]: [Deno drivers](https://github.com/denodrivers)
[^2]: [PostgreSQL drivers](https://github.com/denodrivers/postgres)
[^3]: [Docker documentation](https://docs.docker.com/engine/reference/run/#clean-up---rm)