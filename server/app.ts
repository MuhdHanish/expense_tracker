import { Hono } from "hono";
import { logger } from "hono/logger";
import { serveStatic } from "hono/bun";

// Routes
import { expensesRoute } from "./routes";

const app = new Hono();

app.use("*", logger());

app.route("/api/expenses", expensesRoute);

// Serve static files (frontend) for unmatched routes
app.get("*", serveStatic({ root: './client/dist' }));
app.get("*", serveStatic({ path: './client/dist/index.html' }));

export default app;