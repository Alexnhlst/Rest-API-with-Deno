# Deno introduction

## Table of contents

1. [Some differences to Node](##some-differences-to-node)
2. [Deno REPL](##deno-repl)

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

[^1]: [Config file](https://deno.land/manual@v1.19.2/getting_started/configuration_file)

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