# Database migrations

## Table of contents

1. [Database migrations](#database-migrations)
2. [Seed files](#seed-files)
3. [Nessie migrations](#nessie-migrations)

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