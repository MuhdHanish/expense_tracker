import type { z } from "zod";
import type { expenseSchema } from "../validation";

// zod validation expense schema used to create type of expense
export type TExpense = z.infer<typeof expenseSchema>;