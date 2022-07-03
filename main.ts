import { green, red, serve, v4 } from "./deps.ts";

const port = 2345;
const server = serve({ port });
const hashes = new Set();
