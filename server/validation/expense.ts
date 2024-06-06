import { zValidator } from "@hono/zod-validator";
import { insertExpensesSchema } from "../database/schema/expenses";

// Create Expense schema
export const createExpenseSchema = insertExpensesSchema.omit({
    id: true,
    userId: true,
    createdAt: true
});

// Create expense validator
export const createExpenseValidator = zValidator("json", createExpenseSchema);
