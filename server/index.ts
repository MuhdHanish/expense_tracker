import app from "./app";

const port = process.env.PORT || 8000;
const hostname = process.env.HOST || '127.0.0.1';
Bun.serve({
    port,
    hostname,
    fetch: app.fetch
});
console.log(`server running on http://${hostname}:${port}`);