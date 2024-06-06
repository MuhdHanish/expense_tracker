import { useQueryClient } from "@tanstack/react-query";
import { createExpense, formattedDateDescription, getAllExpensesQueryOptions, loadingCreateExpenseQueryOptions } from "@/utils";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

// Loader icon
import { Loader2 } from "lucide-react";

// UI components
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

// Zod create expense validation schema imported from the server
import { createExpenseSchema } from "@server/validation";

// Zod validator from tanstack-form
import { zodValidator } from "@tanstack/zod-form-adapter";

export const Route = createFileRoute("/_authenticated/create-expense")({
    component: CreateExpense,
});

function CreateExpense() {
    const queryClient = useQueryClient();
    const naviagte = useNavigate();
    const form = useForm({
        validatorAdapter: zodValidator,
        defaultValues: {
            title: "",
            amount: "0",
            date: new Date().toISOString(),
        },
        onSubmit: async ({ value }) => {
            const { expenses: existingExpenses } = await queryClient.ensureQueryData(
                getAllExpensesQueryOptions
            );
            naviagte({ to: "/expenses" });
            queryClient.setQueryData(loadingCreateExpenseQueryOptions.queryKey, { expense: value });
            try {
                const { expense } = await createExpense({ value });
                queryClient.setQueryData(getAllExpensesQueryOptions.queryKey, {
                    ...existingExpenses,
                    expenses: [expense, ...existingExpenses],
                });
                const description = formattedDateDescription();
                toast.message(`Expense has been created successfully: ${expense?.id}`, { description });
            } catch (error) {
                toast.error(
                    `Failed to create a new expense`,
                    { description: error instanceof Error ? error.message : 'An error occurred' }
                );
            } finally {
                queryClient.setQueryData(loadingCreateExpenseQueryOptions.queryKey, {});
            }
        },
    });

    return (
        <div className="p-2 max-w-xl m-auto flex flex-col gap-y-4">
            <h2 className="font-bold">Create Expense</h2>
            <form
                className="flex flex-col gap-y-3.5"
                onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    form.handleSubmit();
                }}
            >
                <form.Field
                    name="title"
                    validatorAdapter={zodValidator}
                    validators={{
                        onChange: createExpenseSchema.shape.title,
                    }}
                    children={(field) => {
                        return (
                            <div className="flex flex-col gap-y-2">
                                <Label htmlFor={field.name}>Title</Label>
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                />
                                {field.state.meta.touchedErrors ? (
                                    <em className="text-xs text-destructive">
                                        {field.state.meta.touchedErrors}
                                    </em>
                                ) : null}
                            </div>
                        );
                    }}
                />
                <form.Field
                    name="amount"
                    validatorAdapter={zodValidator}
                    validators={{
                        onChange: createExpenseSchema.shape.amount,
                    }}
                    children={(field) => {
                        return (
                            <div className="flex flex-col gap-y-2">
                                <Label htmlFor={field.name}>Amount</Label>
                                <Input
                                    id={field.name}
                                    type="number"
                                    min={0}
                                    name={field.name}
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                />
                                {field.state.meta.touchedErrors ? (
                                    <em className="text-xs text-destructive">
                                        {field.state.meta.touchedErrors}
                                    </em>
                                ) : null}
                            </div>
                        );
                    }}
                />
                <form.Field
                    name="date"
                    validatorAdapter={zodValidator}
                    validators={{
                        onChange: createExpenseSchema.shape.date,
                    }}
                    children={(field) => {
                        return (
                            <div className="self-center">
                                <Calendar
                                    mode="single"
                                    selected={new Date(field.state.value)}
                                    onSelect={(date) =>
                                        field.handleChange((date ?? new Date()).toISOString())
                                    }
                                    className="rounded-md border"
                                />
                                {field.state.meta.touchedErrors ? (
                                    <em>{field.state.meta.touchedErrors}</em>
                                ) : null}
                            </div>
                        );
                    }}
                />
                <form.Subscribe
                    selector={(state) => [state.canSubmit, state.isSubmitting]}
                    children={([canSubmit, isSubmitting]) => (
                        <Button className="mt-4" type="submit" disabled={!canSubmit}>
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait
                                </>
                            ) : (
                                "Submit"
                            )}
                        </Button>
                    )}
                />
            </form>
        </div>
    );
}
