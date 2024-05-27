import { Hono } from "hono";
import type { TExpense } from "../types";
import { createExpenseValidator } from "../validation";

// fake data
const fakeExpense: TExpense[] = [
    { id: 1, title: "Groceries", amount: 150.75 },
    { id: 2, title: "Rent", amount: 1200.00 },
    { id: 3, title: "Utilities", amount: 200.50 },
];

export const expensesRoute = new Hono()
    .get("/", (c) => {
        return c.json({ success: true, data: fakeExpense });
    })
    .post("/", createExpenseValidator, async (c) => {
        try {
            const data = c.req.valid("json");
            fakeExpense.push({ id: fakeExpense.length + 1, ...data });
            return c.json({ success: true, data }, 201);
        } catch (error) {
            return c.json({
                success: false,
                message: "Internal Server Error!",
                error: error instanceof Error ? error.message : "Unexpected Error."
            }, 500);
        }
    });