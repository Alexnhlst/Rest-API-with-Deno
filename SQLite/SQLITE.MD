## Table of contents

1. [Installing SQLite](#installing-sqlite)
2. [Writing the connection](#writing-the-connection)
3. [First query](#first-query)


### SQLite

A SQLite database is simply stored on a binary file and is directly accessed by the code.
This enables SQLite to be used for easy prototyping and is ideal for when database read/write is not heavily needed. An SQLite library for Deno contains SQLite3 compiled to WebAssembly (WASM) [^1]

---

### Installing SQLite

A SQLite library does not require to install anything, we can simply import the module and start using it.

---

### Writing the connection

```shell
import { DB } from "https://deno.land/x/sqlite@v3.2.1/mod.ts";

const db = new DB("test.db");
```

The script must be run with `--allow-read` and `--allow-write` due to permissions in Deno to access the file.

```shell
deno run --allow-read --allow-write sqlite.ts
```

> If an error is raised, check if the database have the correct name and that there isn't another database filw with the same name in that folder.

---

### First query

---

[^1]: [SQLite drivers](https://github.com/dyedgreen/deno-sqlite)
[^2]: [sqlite.ts](sqlite.ts)