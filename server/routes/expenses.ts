import { Hono } from "hono";
import { fakeExpense } from "../data";

export const expensesRoute = new Hono()
    .get("/", (c) => {
        return c.json({ expenses: fakeExpense });
    })
    .post("/", (c) => {
        return c.json({});
    });