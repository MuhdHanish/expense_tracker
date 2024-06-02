import { Hono } from "hono";
import type { TExpense } from "../types";

// Middlewares
import { authMiddleware } from "../middlewares";

// Zod validators
import { createExpenseValidator } from "../validation";

// Drizzle ORM functions & Database 
import { eq } from "drizzle-orm";
import { database } from "../database";

// Importing schemas from the specified path with Table suffix
import { expenses as expensesTable } from "../database/schema/expenses";

// Fake data
const fakeExpense: TExpense[] = [
    { id: 1, title: "Groceries", amount: "150" },
    { id: 2, title: "Rent", amount: "1200" },
    { id: 3, title: "Utilities", amount: "200" },
];

export const expensesRoute = new Hono()
    // Get expenses
    .get("/", authMiddleware, async (c) => {
        try {
            const { user } = c.var;
            const { id } = user;
            const expenses = await database
                .select()
                .from(expensesTable)
                .where(eq(expensesTable.userId, id));
            return c.json({ success: true, data: { expenses } });
        } catch (error) {
            return c.json({
                success: false,
                message: "Internal Server Error!",
                error: error instanceof Error ? error.message : "Unexpected Error."
            }, 500);
        }
    })
    // Get total spent
    .get("/total-spent", authMiddleware, (c) => {
        try {
            const total = fakeExpense.reduce((acc, expense) => acc + +expense.amount, 0);
            return c.json({ success: true, data: { total } });
        } catch (error) {
            return c.json({
                success: false,
                message: "Internal Server Error!",
                error: error instanceof Error ? error.message : "Unexpected Error."
            }, 500);
        }
    })
    // Post expense
    .post("/", authMiddleware, createExpenseValidator, async (c) => {
        try {
            const { user } = c.var;
            const { id: userId } = user;
            const expense = c.req.valid("json");
            const storedExpense = await database
                .insert(expensesTable)
                .values({
                    userId,
                    ...expense,
                })
                .returning();
            return c.json({ success: true, data: { expense: storedExpense } }, 201);
        } catch (error) {
            return c.json({
                success: false,
                message: "Internal Server Error!",
                error: error instanceof Error ? error.message : "Unexpected Error."
            }, 500);
        }
    })
    // Get expense by id
    .get("/:id{[0-9]+}", authMiddleware, (c) => {
        try {
            const id = Number.parseInt(c.req.param("id"));
            const expense = fakeExpense.find(expense => expense.id === id);
            if (!expense) return c.json({ success: false, message: `Resource not found with id ${id}` }, 404);
            return c.json({ success: true, data: { expense } });
        } catch (error) {
            return c.json({
                success: false,
                message: "Internal Server Error!",
                error: error instanceof Error ? error.message : "Unexpected Error."
            }, 500);
        }
    })
    // Delete expense by id
    .delete("/:id{[0-9]+}", authMiddleware, (c) => {
        try {
            const id = Number.parseInt(c.req.param("id"));
            const index = fakeExpense.findIndex(expense => expense.id === id);
            if (index === -1) return c.json({ success: false, message: `Resource not found with id ${id}` }, 404);
            const expense = fakeExpense.splice(index, 1)[0];
            return c.json({ success: true, data: { expense } });
        } catch (error) {
            return c.json({
                success: false,
                message: "Internal Server Error!",
                error: error instanceof Error ? error.message : "Unexpected Error."
            }, 500);
        }
    });