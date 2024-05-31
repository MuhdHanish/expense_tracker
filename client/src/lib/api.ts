// Hono client
import { hc } from 'hono/client';

// Type of Base API Route
import { type ApiRoutes } from "@server/app";

// Client object
const client = hc<ApiRoutes>("/");

// Export the api client as api
export const api = client.api;