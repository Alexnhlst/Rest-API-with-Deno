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