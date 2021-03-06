# Rest API with Deno [^1]

<div align="center">
    <img src="./DenoLogo.svg" alt="Deno lodo">
</div>

## Table of contents

1. [Setting up the environment](#setting-up-the-environment)
2. [Deno introduction](/../../tree/deno-introduction/INTRODUCTION.MD)
3. [Using databases with deno](/../../tree/deno-databases/DATABASES.MD)
4. [Database migrations](/../../tree/database-migrations/MIGRATIONS.MD)

## Setting up the environment

The first step is to install Deno
There are two possible options:

- Install locally

```shell
# Using shell 
curl -fsSL https://deno.land/x/install/install.sh | sh

# using homebrew (MacOS)
brew install deno

# using PowerShell (Windows)
iwr https://deno.land/x/install/install.ps1 -useb | iex
```

- Using Docker

```shell
docker run -it -p 1993:1993 -v $PWD:/app denoland/deno:1.19.2 run --allow-net /app/main.ts
```

- Installing the VSCode extension

[Link to the repository](https://github.com/denoland/vscode_deno)

> After the installation, to enable it open the command palette and type deno init

[Hello world](./main.ts)

> To execute it, after the Deno installation and initialization, type deno run main.ts

[^1]: [Following this course on Newline](https://www.newline.co/courses/build-and-deploy-a-rest-api-with-deno/welcome)