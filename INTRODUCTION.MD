# Deno introduction

## Table of contents

1. [Some differences to Node](##some-differences-to-node)

### Some differences to node

Deno does not use a package.json, the only kind of config used for Deno is an optional one to customize the compiler, linter and formatter [^1]
There is also no `require` syntax to import files. Everything is imported via ES6 module imports with file endings.

```
// Node
var nodePackage = require("package")

// Deno
import denoModule from "https://example.com/package/mode.ts"
```

[^1]: [Config file](https://deno.land/manual@v1.19.2/getting_started/configuration_file)