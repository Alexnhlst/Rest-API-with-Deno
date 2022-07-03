# Database migrations

## Table of contents

1. [Database migrations](#database-migrations)
2. [Seed files](#seed-files)
3. [Nessie migrations](#nessie-migrations)
4. [Getting started with Nessie](#getting-started-with-nessie)

### Database migrations

Database migrations are one of the best ways of altering a database in a reproducible way. 
When running a migration, you can deploy a multitude of operation, including inserting data,
changing tables and schemas, and making sure that the same data schema is available for the whole team
across all the environments.
Imagine you are working in a team of two and you are creating an application with a database
As you are adding new data model, you are also adding new tables to the database. Now your teammate
wants to continue developing the application with some other models, but they also need to use the
models and tables you create. Now imagine that having created the tables manually in the database, you now have to explain to your teammate exactly how the tables need to be set up, so that you can both work to the exact
same schema. Then imagine that you want to continue with theapplication, but you need the tables that your teammate developed!

> ⚠️ The migration code should never reference any of the code or interfaces used in the rest of the application. This is to ensure that it will run the same migration at any time, no matter the state of the rest of the code at that time.

---

### Seed files

We also need an easy way of getting some generic data into the database during development, to test the flow.
A seed is useful in those cases, allowing us to easily load test data into our databases.
When using seed files there are multiple ways of organizing them. You can have
one seed file for each table, or one seed file to rule them all (although this
is not really scalable). Seed should be only used in the development environment, and it should never be used in production to populate the database.

> A seed file is only ever used with the latest state of your application and database, so you can use your entire codebase in your seed files if you need to. This also means that you will have to manually update the seed files if you alter the database.

---

### Nessie migrations

Nessie is a library that runs database migrations and seed files for a Deno codebase.
It has similarities to Laravel and Phinx. [^1]

---

### Getting started with Nessie

For creating and running migrations we need Nessie and a database.
A script helps to initialize Nessie. It will create a Nessie config file `nessie.config.ts`, as well as an initial folder structure for migration and seed files.

```shell
deno run -A --unstable https://deno.land/x/nessie/cli.ts init
```

The folder should have this structure:

```shell
.
├── db
│   ├── migrations
│   └── seeds
└── nessie.config.ts
```

Inside `nessie.config.ts` there should be multiple client configurations. Choosen one, in this case PostgreSQL, the other import statements can be removed.

```ts
import {
    ClientPostgreSQL,
    NessieConfig,
} from "https://deno.land/x/nessie@2.0.5/mod.ts";

const client = new ClientPostgreSQL({
    database: "nessie",
    hostname: "localhost",
    port: 5432,
    user: "root",
    password: "pwd",
});
/** This is the final config object */
const config: NessieConfig = {
    client,
    migrationFolders: ["./db/migrations"],
    seedFolders: ["./db/seeds"],
};

export default config;
```

There is a config object which takes a `client`, and also the folders in which we are storing our `migrations` and `seed` files. There are also other options available.

- The `additionalMigrationFiles` and `additionalSeedFiles` allows to add files outside of the folder, and even more remote files stored on a webserver.
- The `migrationTemplate` and `seedTemplate` allows to set a custom migration and seed template from which to create new migrations and seeds from.
- The `debug` option allows for more verbose output to help with debugging.

---

[^1]: [Nessie](https://github.com/halvardssm/deno-nessie)