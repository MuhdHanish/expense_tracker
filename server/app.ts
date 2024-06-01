import { Hono } from "hono";
import { logger } from "hono/logger";
import { serveStatic } from "hono/bun";

// Routes
import { authRoute, expensesRoute } from "./routes";

const app = new Hono();

app.use("*", logger());

// Base api route
const apiRoute = app.basePath('/api')
    // Sub routes
    // Auth
    .route("/auth", authRoute)
    // Expenses
    .route("/expenses", expensesRoute);

// Serve static files (frontend) for unmatched routes
app.get("*", serveStatic({ root: './client/dist' }));
app.get("*", serveStatic({ path: './client/dist/index.html' }));

export default app;

// Export the type of Base API Route 
export type ApiRoutes = typeof apiRoute;