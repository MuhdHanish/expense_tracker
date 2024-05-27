import { Hono } from "hono";
import type { TExpense } from "../types";

const fakeExpense: TExpense[] = [
    { id: 1, title: "Groceries", amount: 150.75 },
    { id: 2, title: "Rent", amount: 1200.00 },
    { id: 3, title: "Utilities", amount: 200.50 },
];

export const expensesRoute = new Hono()
    .get("/", (c) => {
        return c.json({ expenses: fakeExpense });
    })
    .post("/", (c) => {
        return c.json({});
    });