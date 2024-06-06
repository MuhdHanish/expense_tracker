import type { z } from "zod";
import type { createExpenseSchema } from "../validation";

// Zod validation expense schema used to create type of expense
export type TExpense = z.infer<typeof createExpenseSchema>;

export type TPagination = {
    prev: number | null;
    next: number | null;
    currentPage: number;
    totalPages: number
}