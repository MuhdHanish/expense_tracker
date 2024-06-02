import type { z } from "zod";
import type { createExpenseSchema } from "../validation";

// Zod validation expense schema used to create type of expense
export type TExpense = z.infer<typeof createExpenseSchema>;