import { Hono } from "hono";
import { logger } from "hono/logger";

// routes
import { expensesRoute } from "./routes";

const app = new Hono();

app.use(logger());

app.get("/", (c) => c.json({ success: true, message: "Hello from Server!" }));

app.route("/api/expenses", expensesRoute);

export default app;