import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
// Expense schema
export const expenseSchema = z.object({
    id: z.number().int().positive().min(1),
    title: z.string(),
    amount: z.number().positive(),
});
// Create expense schema
const createExpenseSchema = expenseSchema.omit({ id: true });
// Create expense validator
export const createExpenseValidator = zValidator("json", createExpenseSchema);
