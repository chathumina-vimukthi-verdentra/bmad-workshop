import { buildApp } from "./app.js";

const port = Number(process.env.PORT ?? 3001);
const host = process.env.HOST ?? "127.0.0.1";

const app = buildApp();

app.listen({ port, host }).then(() => {
  console.log(`Carbon Hub Lite API listening on http://${host}:${port}`);
}).catch((err) => {
  console.error(err);
  process.exit(1);
});
