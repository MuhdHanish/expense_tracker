import { z } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { index, numeric, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const expenses = pgTable("expenses", {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    title: text("title").notNull(),
    amount: numeric("amount", { precision: 12, scale: 2 }),
    createdAt: timestamp("created_at").defaultNow()
}, (expenses) => {
    return {
        userIdIndex: index("user_id_index").on(expenses.userId),
    }
});


// Schema for inserting a expenses - can be used to validate API requests
export const insertExpensesSchema = createInsertSchema(expenses, {
    title: z
        .string()
        .min(3, { message: 'Title must be at least 3 characters' }),
    amount: z
        .string()
        .regex(/^([0-9]\d*)(\.\d{1,2})?$/, { message: 'Amount must be a valid monetary value' })
});
// Schema for selecting a expenses - can be used to validate API responses
export const selectExpensesSchema = createSelectSchema(expenses);
