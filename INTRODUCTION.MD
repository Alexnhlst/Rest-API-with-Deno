# Deno introduction

## Table of contents

1. [Some differences to Node](#some-differences-to-node)
2. [Deno REPL](#deno-repl)
3. [Deno run](#deno-run)
4. [Deno standard library](#deno-standard-library)
5. [Deno server](#deno-server)
6. [Deno server token](#deno-server-token)

### Some differences to node

Deno does not use a package.json, the only kind of config used for Deno is an optional one to customize the compiler, linter and formatter [^1]
There is also no `require` syntax to import files. Everything is imported via ES6 module imports with file endings. No package download or processing needed as long as it is a JS or TS file.
Deno comes with a native bundler, compiler, formatter, linter, test runner, doc generator, and type generator.

```ts
// Node
var nodePackage = require("package")

// Deno
import denoModule from "https://example.com/package/mode.ts"
```

---

### Deno REPL

To open the REPL in the terminal

```shell
> deno repl
Deno 1.23.2
exit using ctrl+d or close()
> console.log("Hello world!");
Hello world!
undefined
```

The REPL will output the return value of whatever is written. `console.log()` doesn't have any return value, so it has returned `undefined`

---

### Deno run

Deno is built in Rust and can handle `js`, `ts`, `jsx`, and `tsx` files.
Deno convers TypeScript into JavaScript via a combination of the TypeScript compiler and a Rust library called `swc`. [^2]
Common names for entry files:

| Filename | Description                                                                                               |
| -------- | --------------------------------------------------------------------------------------------------------- |
| main.ts  | Used by applications to signify the main entry point and where to load the application from               |
| mod.ts   | Used by modules as an entry point to signify where to load components                                     |
| cli.ts   | Used by modules where a command-line interface is available and serves as an entry point to the CLI       |
| lib.ts   | Not as widely used as the prior three, but commonly used as an entry point for internally used components |

```
// main.ts
console.log("Hello world!");
```

To run the file `deno run main.ts` [^3]

---

### Deno standard library

Deno has a standard library (std) available for use. [^4]
It is structurally based on Golang's standard library. Deno does not use a centralized package repository like npm; instead the modules are imported using a URL, and cached locally

<p class="codeblock-label" style="font-size: 12px">main.ts</p>

```ts
import { green, red } from  "https://deno.land/std@0.128.0/fmt/colors.ts";
```

Executing the file, Deno will download and cache the imports in its cache folder for future use.
To only cache the dependencies without executin any code, the `deno cache` commang is used

```shell
> deno cache main.ts
```

Running the code with the colors imported will output them in the console.

```ts
console.log(`This text is ${green("green")} and ${red("red")} `);
```

---

### Deno server

One of the consideration for any module written in Deno is whether it is best to have one central dependency file, or if each fie should only import the respectively needed modules.
One approach is to have a `deps.ts` to keep versioning simple across the codebase.
The import are added to this file [^5]

```ts
export { green, red } from "https://deno.land/std@0.128.0/fmt/colors.ts";
export { v4 } from "https://deno.land/std@0.128.0/uuid/mod.ts";
export { serve } from "https://deno.land/std@0.128.0/http/server.ts";
```

To create a server, the dependencies are imported from `deps.ts`. 

```ts
import { green, serve } from "./deps.ts"
```

`serve` takes a callback which should return a response, and an options object.
To include a port, the following is added to `main.ts`

```ts
const port = 2345;
serve(() => new Response(), {port});

console.log(green(`Server is accessible @ http://localhost:${port}/`));
```

At the current state the app will generate this error

```shell
⚠️  ️Deno requests net access to "0.0.0.0:2345". Run again with --allow-net to bypass this prompt.
   Allow? [y/n (y = yes allow, n = no deny)]  
```

Deno is secure by default. Therefore, unless is specifically enable it, a deno module has no file, network, or environment access. Access to security-sensitive areas or function requires the use of permissions to be granted to a deno process on the command line. To fix the error, the comman is executed with `--allow-net` [^6]:

```shell
> deno run --allow-net main.ts
Server is accessible @ http://localhost:2345/
```

---

### Deno server token

A const hash set is created to keep track of the tokens. [^7]

```ts
import { green, red, serve, v4 } from "./deps.ts";

const port = 2345;
const server = serve({ port });
const hashes = new Set();
```

The intention is to be able to send a token in the url like so:

```shell
http://localhost:2345/some-token
```

Before doing this, a token must be received, stored in the hash set, and returned it from the server.
A response is sent back in the body of the request.

```ts
serve((req) => {
    const newHash = v4.generate();
    hashes.add(newHash);
    req.respond({body: `Hello World!\nYour hash is: ${newHash}`})
}, { port });
```

The next step is to add some logic for when a token is provided

```ts
 if (hash.length > 0) {
      if (hashes.has(hash)) {
        console.log(green("Successfull connection"));
        return new Response(`Welcome back!`);
      } else {
        console.log(red("Hash not recognized"));
        return new Response(`Hash was not recognized, please try again`);
      }
    } else {
      const newHash = v4.generate();
      hashes.add(newHash);
      return new Response(`Hello World!\nYour hash is: ${newHash}`);
    }
```

`main.ts` should look like this:

```ts
import { green, red, serve, v4 } from "./deps.ts";

const port = 2345;
const hashes = new Set();

serve(
  (req) => {
    const url = new URL(req.url);
    const hash = url.pathname.slice(1);

    if (hash.length > 0) {
      if (hashes.has(hash)) {
        console.log(green("Successfull connection"));
        return new Response(`Welcome back!`);
      } else {
        console.log(red("Hash not recognized"));
        return new Response(`Hash was not recognized, please try again`);
      }
    } else {
      const newHash = v4.generate();
      hashes.add(newHash);
      return new Response(`Hello World!\nYour hash is: ${newHash}`);
    }
  },
  { port }
);

console.log(green(`Server is accessible @ http://localhost:${port}/`));
```

Executing
```shell
> deno run --allow-net main.ts
Server is accessible @ http://localhost:2345/
```

will start the server, accessible via `http://localhost:2345` and it will provide an hash;
If the hash is recognized, visiting `http://localhost:2345/{token}` will show the response.

> `export` is used insted of `import` to export these files to `main.ts`

[^1]: [Config file](https://deno.land/manual@v1.19.2/getting_started/configuration_file)
[^2]: [TypeScript in Deno](https://deno.land/manual/typescript/overview)
[^3]: [main.ts](./main.ts)
[^4]: [Deno std](https://deno.land/std@0.146.0)
[^5]: [deps.ts](deps.ts)
[^6]: [Permissions](https://deno.land/manual@main/getting_started/permissions)
[^7]: [JS Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)