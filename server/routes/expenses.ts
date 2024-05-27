import { Hono } from "hono";
import type { TExpense } from "../types";

// fake data
const fakeExpense: TExpense[] = [
    { id: 1, title: "Groceries", amount: 150.75 },
    { id: 2, title: "Rent", amount: 1200.00 },
    { id: 3, title: "Utilities", amount: 200.50 },
];

export const expensesRoute = new Hono()
    .get("/", (c) => {
        return c.json({ expenses: fakeExpense });
    })
    .post("/", async (c) => {
        try {
            const body = await c.req.json();
            if (!body || Object.keys(body).length === 0) {
                return c.json({ message: "Invalid Data!" }, 400);
            }
            return c.json(body);
        } catch (error) {
            if (error instanceof SyntaxError) return c.json({ message: "Invalid JSON input!" }, 400);
            else return c.json({
                message: "Internal Server Error!",
                error: error instanceof Error ? error.message : "Unexpected Error."
            }, 500);
        }
    });