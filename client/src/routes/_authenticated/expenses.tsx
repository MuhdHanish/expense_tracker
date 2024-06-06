import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { createFileRoute } from "@tanstack/react-router";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { getAllExpensesQueryOptions, loadingCreateExpenseQueryOptions } from "@/utils";
import { DeleteButton } from "@/components/delete-button";

export const Route = createFileRoute('/_authenticated/expenses')({
    component: Expenses,
});

function Expenses() {
    const { data, error, isPending } = useQuery(getAllExpensesQueryOptions);
    const { data: loadingCreateExpense } = useQuery(loadingCreateExpenseQueryOptions);

    if (error) return error.message;

    return (
        <div className="p-2 max-w-3xl m-auto">
            <Table>
                <TableCaption>A list of all your expenses.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Delete</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {loadingCreateExpense?.expense &&
                        <TableRow>
                            <TableCell className="w-[100px]"><Skeleton className="h-4" /></TableCell>
                            <TableCell>{loadingCreateExpense?.expense?.title}</TableCell>
                            <TableCell>{loadingCreateExpense?.expense?.amount}</TableCell>
                            <TableCell>{loadingCreateExpense?.expense?.date?.split("T")[0]}</TableCell>
                            <TableCell><Skeleton className="h-4" /></TableCell>
                        </TableRow>
                    }
                    {isPending ? Array(3)
                        .fill(0)
                        .map((_, index) => (
                            <TableRow key={index}>
                                <TableCell><Skeleton className="h-4" /></TableCell>
                                <TableCell><Skeleton className="h-4" /></TableCell>
                                <TableCell><Skeleton className="h-4" /></TableCell>
                                <TableCell><Skeleton className="h-4" /></TableCell>
                                <TableCell><Skeleton className="h-4" /></TableCell>
                            </TableRow>
                        ))
                        : data?.expenses?.map((expense) => (
                            <TableRow key={expense?.id}>
                                <TableCell className="font-medium">{expense?.id}</TableCell>
                                <TableCell>{expense?.title}</TableCell>
                                <TableCell>{expense?.amount}</TableCell>
                                <TableCell>{expense?.date?.split("T")[0]}</TableCell>
                                <TableCell><DeleteButton id={expense?.id}/></TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </div>
    );
};