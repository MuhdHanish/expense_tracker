import app from "./app";

const port = process.env.PORT || 3000;
const hostname = process.env.HOST || "localhost";
Bun.serve({
    port,
    hostname,
    fetch: app.fetch,
});
console.log(`server running on http://${hostname}:${port}`);
