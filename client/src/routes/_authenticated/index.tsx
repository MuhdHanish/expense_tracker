import { api } from "@/lib";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute('/_authenticated/')({
    component: Index,
});

async function getTotalSpent() {
    const response = await api.expenses["total-spent"].$get();
    if (!response.ok) throw new Error("The server may be experiencing issues, Please try again later.");
    const { data } = await response.json();
    return data;
};

function Index() {
    const { data, error, isPending } = useQuery({ queryKey: ["get-total-spent"], queryFn: getTotalSpent });
    if (error) return error.message;

    return (
        <Card className="w-[350px] m-auto">
            <CardHeader>
                <CardTitle>Total Spent</CardTitle>
                <CardDescription>The total amount you've spent</CardDescription>
            </CardHeader>
            <CardContent>{isPending ? "..." : data?.total}</CardContent>
        </Card>
    );
};
