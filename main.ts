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
