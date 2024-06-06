import { toast } from "sonner";
import { Button } from "./ui/button";
import { Loader2, Trash } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteExpense, formattedDateDescription, getAllExpensesQueryOptions } from "@/utils";

type TDeleteButtonProps = {
    id: number;
};

export function DeleteButton({ id }: TDeleteButtonProps) {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: deleteExpense,
        onError: (error) => {
            toast.error(
                `Failed to delete expense: ${id}`,
                { description: error instanceof Error ? error.message : 'An error occurred' }
            );
        },
        onSuccess: () => {
            const description = formattedDateDescription();
            toast.message(`Expense has been delete successfully: ${id}`, { description });
            queryClient.setQueryData(getAllExpensesQueryOptions().queryKey, (existingExpenses) => ({
                ...existingExpenses,
                expenses: existingExpenses!.expenses.filter((expense) => expense?.id !== id),
                pagination: existingExpenses!.pagination
            }));
        },
    })

    return (
        <Button
            disabled={mutation.isPending}
            onClick={() => mutation.mutate({ id })}
            variant="outline" size="icon">
            {mutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash className="h-4 w-4" />}
        </Button>
    );
}
