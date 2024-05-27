import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

// create expense schema
const createExpenseSchema = z.object({
    title: z.string(),
    amount: z.number().positive(),
});

// create expense validator
export const createExpenseValidator = zValidator("json", createExpenseSchema);
