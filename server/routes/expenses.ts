import { Hono } from "hono";
import { getUserId } from "../utils";

// Middlewares
import { authMiddleware } from "../middlewares";

// Zod validators
import { createExpenseValidator } from "../validation";

// Database & Drizzle ORM functions  
import { database } from "../database";
import { and, count, desc, eq, sum } from "drizzle-orm";

// Importing schemas from the specified path with Table suffix  & Drizzle-Zod schema
import { expenses as expensesTable, insertExpensesSchema } from "../database/schema/expenses";

export const expensesRoute = new Hono()
    // Get expenses
    .get("/", authMiddleware, async (c) => {
        try {
            const userId = getUserId(c);
            const { page } = c.req.query();
            const resPerPage = 10;
            const currentPage = Number(page) || 1;
            const skip = resPerPage * (currentPage - 1);
            const [totalExpensesCount, expenses] = await Promise.all([
                database
                    .select({ count: count() })
                    .from(expensesTable)
                    .where(eq(expensesTable.userId, userId))
                    .then(result => result[0]),
                database
                    .select()
                    .from(expensesTable)
                    .where(eq(expensesTable.userId, userId))
                    .orderBy(desc(expensesTable.createdAt))
                    .limit(resPerPage)
                    .offset(skip)
            ]);
            const total = totalExpensesCount ? totalExpensesCount.count : 0;
            const prev = currentPage > 1 ? currentPage - 1 : null;
            const next = currentPage * resPerPage < total ? currentPage + 1 : null;
            const pagination = {
                prev,
                next,
                currentPage,
                totalPages: Math.ceil(total / resPerPage)
            };
            return c.json({ success: true, data: { expenses, pagination } });
        } catch (error) {
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
            const userId = getUserId(c);
            const expenseDTO = c.req.valid("json");
            // Validate the data before inserting to database
            const validatedExpenseDTO = insertExpensesSchema.parse({ ...expenseDTO, userId });
            const expense = await database
                .insert(expensesTable)
                .values(validatedExpenseDTO)
                .returning()
                .then(result => result[0]);
            return c.json({ success: true, data: { expense } }, 201);
        } catch (error) {
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
            const userId = getUserId(c);
            const id = Number.parseInt(c.req.param("id"));
            const expense = await database
                .select()
                .from(expensesTable)
                .where(and(eq(expensesTable.id, id), eq(expensesTable.userId, userId)))
                .then(result => result[0]);
            if (!expense) {
                return c.json({ success: false, message: `Expense with id ${id} not found for the current user` }, 404);
            }
            return c.json({ success: true, data: { expense } });
        } catch (error) {
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
            const userId = getUserId(c);
            const id = Number.parseInt(c.req.param("id"));
            const expense = await database
                .delete(expensesTable)
                .where(and(eq(expensesTable.id, id), eq(expensesTable.userId, userId)))
                .returning()
                .then(result => result[0]);
            if (!expense) {
                return c.json({ success: false, message: `Expense with id ${id} not found for the current user` }, 404);
            }
            return c.json({ success: true, data: { expense } });
        } catch (error) {
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
            const userId = getUserId(c);
            const { total } = await database
                .select({ total: sum(expensesTable.amount) })
                .from(expensesTable)
                .where(eq(expensesTable.userId, userId))
                .limit(1)
                .then(result => result[0]);
            return c.json({ success: true, data: { total } });
        } catch (error) {
            return c.json({
                success: false,
                message: "Internal Server Error",
                error: error instanceof Error ? error.message : "Unexpected Error"
            }, 500);
        }
    });