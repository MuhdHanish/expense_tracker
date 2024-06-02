import { Hono } from "hono";
import type { TExpense } from "../types";

// Middlewares
import { authMiddleware } from "../middlewares";

// Zod validators
import { createExpenseValidator } from "../validation";

// Database & Drizzle ORM functions  
import { database } from "../database";
import { and, desc, eq, sum } from "drizzle-orm";

// Importing schemas from the specified path with Table suffix
import { expenses as expensesTable } from "../database/schema/expenses";

export const expensesRoute = new Hono()
    // Get expenses
    .get("/", authMiddleware, async (c) => {
        try {
            const { user } = c.var;
            const { id } = user;
            const expenses = await database
                .select()
                .from(expensesTable)
                .where(eq(expensesTable.userId, id))
                .orderBy(desc(expensesTable.createdAt))
                .limit(10);
            return c.json({ success: true, data: { expenses } });
        } catch (error) {
            console.error('Error fetching expenses:', error);
            return c.json({
                success: false,
                message: "Internal Server Error",
                error: error instanceof Error ? error.message : "Unexpected Error"
            }, 500);
        }
    })
    // Post expense
    .post("/", authMiddleware, createExpenseValidator, async (c) => {
        try {
            const { user } = c.var;
            const { id: userId } = user;
            const expenseDTO = c.req.valid("json");
            const expense = await database
                .insert(expensesTable)
                .values({
                    userId,
                    ...expenseDTO,
                })
                .returning()
                .then(result => result[0]);
            return c.json({ success: true, data: { expense } }, 201);
        } catch (error) {
            console.error('Error inserting expense:', error);
            return c.json({
                success: false,
                message: "Internal Server Error",
                error: error instanceof Error ? error.message : "Unexpected Error"
            }, 500);
        }
    })
    // Get expense by id
    .get("/:id{[0-9]+}", authMiddleware, async (c) => {
        try {
            const { user } = c.var;
            const { id: userId } = user;
            const id = Number.parseInt(c.req.param("id"));
            const expense = await database
                .delete(expensesTable)
                .where(and(eq(expensesTable.id, id), eq(expensesTable.userId, userId)))
                .returning()
                .then(result => result[0]);
            if (!expense) return c.json({ success: false, message: `Expense with id ${id} not found for the current user` }, 404);
            return c.json({ success: true, data: { expense } });
        } catch (error) {
            console.error('Error fetching expense by id:', error);
            return c.json({
                success: false,
                message: "Internal Server Error",
                error: error instanceof Error ? error.message : "Unexpected Error"
            }, 500);
        }
    })
    // Delete expense by id
    .delete("/:id{[0-9]+}", authMiddleware, async (c) => {
        try {
            const { user } = c.var;
            const { id: userId } = user;
            const id = Number.parseInt(c.req.param("id"));
            const expense = await database
                .select()
                .from(expensesTable)
                .where(and(eq(expensesTable.id, id), eq(expensesTable.userId, userId)))
                .then(result => result[0]);
            if (!expense) return c.json({ success: false, message: `Expense with id ${id} not found for the current user` }, 404);
            return c.json({ success: true, data: { expense } });
        } catch (error) {
            console.error('Error deleting expense by id:', error);
            return c.json({
                success: false,
                message: "Internal Server Error",
                error: error instanceof Error ? error.message : "Unexpected Error"
            }, 500);
        }
    })
    // Get total spent
    .get("/total-spent", authMiddleware, async (c) => {
        try {
            const { user } = c.var;
            const { id } = user;
            const { total } = await database
                .select({ total: sum(expensesTable.amount) })
                .from(expensesTable)
                .where(eq(expensesTable.userId, id))
                .limit(1)
                .then(result => result[0]);
            return c.json({ success: true, data: { total } });
        } catch (error) {
            console.error('Error fetching total spent:', error);
            return c.json({
                success: false,
                message: "Internal Server Error",
                error: error instanceof Error ? error.message : "Unexpected Error"
            }, 500);
        }
    });