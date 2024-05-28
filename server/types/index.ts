import type { z } from "zod";
import type { expenseSchema } from "../validation";

// Zod validation expense schema used to create type of expense
export type TExpense = z.infer<typeof expenseSchema>;