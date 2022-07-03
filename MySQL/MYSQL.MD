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

- `--rm` will clean up the container after killing it. [^3]
- `-p` is short for `--port`. It links a port on the container with a port on the local system, allowing the connection.
- `-e` is short for `--env`. It is used to pass an env variable to container.

> If an error is raised, it probably means that the port is already used for something else. 

### Writing the connection

### First query

### Pool connection

[^1]: [MySQL drivers](https://github.com/denodrivers/mysql)