import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

// Expense schema
export const expenseSchema = z.object({
    id: z.number().int().positive().min(1),
    title: z
        .string()
        .min(3, { message: 'Title must be at least 3 characters' })
        .max(50, { message: 'Title must not exceed 50 characters' }),
    amount: z
        .string()
        .regex(/^([0-9]\d*)(\.\d{1,2})?$/, { message: 'Amount must be a valid number' })
});

// Create expense schema
export const createExpenseSchema = expenseSchema.omit({ id: true });

// Create expense validator
export const createExpenseValidator = zValidator("json", createExpenseSchema);
