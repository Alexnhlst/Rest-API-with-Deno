import { green, serve } from "./dept.ts";

const port = 2345;
serve(() => new Response(), { port });

console.log(green(`Server is accessible @ http://localhost:${port}/`));
