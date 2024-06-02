import { api } from "@/lib";
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
} from "@/components/ui/table"

export const Route = createFileRoute('/_authenticated/expenses')({
    component: Expenses,
});


async function getAllExpenses() {
    const response = await api.expenses.$get();
    if (!response.ok) throw new Error("The server may be experiencing issues, Please try again later.");
    const { data } = await response.json();
    return data;
};

function Expenses() {
    const { data, error, isPending } = useQuery({ queryKey: ["get-all-expenses"], queryFn: getAllExpenses });
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
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isPending ? Array(3)
                        .fill(0)
                        .map((_, index) => (
                            <TableRow key={index}>
                                <TableCell><Skeleton className="h-4"/></TableCell>
                                <TableCell><Skeleton className="h-4"/></TableCell>
                                <TableCell><Skeleton className="h-4"/></TableCell>
                                <TableCell><Skeleton className="h-4"/></TableCell>
                            </TableRow>
                        ))
                        : data?.expenses?.map((expense) => (
                        <TableRow key={expense?.id}>
                            <TableCell className="font-medium">{expense?.id}</TableCell>
                            <TableCell>{expense?.title}</TableCell>
                            <TableCell>{expense?.amount}</TableCell>
                            <TableCell>{expense?.date}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};