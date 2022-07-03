# Deno introduction

## Table of contents

1. [Some differences to Node](#some-differences-to-node)
2. [Deno REPL](#deno-repl)
3. [Deno run](#deno-run)
4. [Deno standard library](#deno-standard-library)

### Some differences to node

Deno does not use a package.json, the only kind of config used for Deno is an optional one to customize the compiler, linter and formatter [^1]
There is also no `require` syntax to import files. Everything is imported via ES6 module imports with file endings. No package download or processing needed as long as it is a JS or TS file.
Deno comes with a native bundler, compiler, formatter, linter, test runner, doc generator, and type generator.

```
// Node
var nodePackage = require("package")

// Deno
import denoModule from "https://example.com/package/mode.ts"
```

---

### Deno REPL

To open the REPL in the terminal

```
deno repl

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
Common names for entry files

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

```javascript
import { green, red } from  "https://deno.land/std@0.128.0/fmt/colors.ts";
```

Executing the file, Deno will download and cache the imports in its cache folder for future use.
To only cache the dependencies without executin any code, the `deno cache` commang is used

```console
deno cache main.ts
```

Running the code with the colors imported will output them in the console.

```javascript
console.log(`This text is ${green("green")} and ${red("red")} `);
```

[^1]: [Config file](https://deno.land/manual@v1.19.2/getting_started/configuration_file)
[^2]: [TypeScript in Deno](https://deno.land/manual/typescript/overview)
[^3]: [main.ts](./main.ts)
[^4]: [Deno std](https://deno.land/std@0.146.0)
