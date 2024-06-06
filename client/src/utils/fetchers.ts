import { api } from "@/lib";
import { TExpense } from "@server/types";
import { queryOptions } from "@tanstack/react-query";

// Getting the current user profile
async function getProfile() {
    const response = await api.auth.profile.$get();
    if (!response.ok) {
        if (response.status >= 500)
            throw new Error(
                "The server may be experiencing issues, Please try again later."
            );
        else throw new Error("Not logged in.");
    }
    const { data } = await response.json();
    return data;
}

// Export the get profile query options to use globally
export const getProfileQueryOptions = queryOptions({
    queryKey: ["get-profile"],
    queryFn: getProfile,
    staleTime: Infinity,
});

// Getting all expenses
async function getAllExpenses() {
    const response = await api.expenses.$get();
    if (!response.ok)
        throw new Error(
            "The server may be experiencing issues, Please try again later."
        );
    const { data } = await response.json();
    return data;
}

// Export the get all expenses query options to use globally
export const getAllExpensesQueryOptions = queryOptions({
    queryKey: ["get-all-expenses"],
    queryFn: getAllExpenses,
    staleTime: 1000 * 60 * 5,
});

// Export create expense function
export async function createExpense({ value }: { value: TExpense }) {
    const response = await api.expenses.$post({ json: value });
    if (!response.ok) {
        throw new Error(
            "The server may be experiencing issues, Please try again later."
        );
    }
    const { data } = await response.json();
    return data;
};

// Export the loading create expenses (get the value from the query) query options to use globally
export const loadingCreateExpenseQueryOptions = queryOptions<{ expense?: TExpense }>({
    queryKey: ["loading-create-expense"],
    queryFn: async () => {
        return {};
    },
    staleTime: Infinity
});

// Export delete expense function
export async function deleteExpense({ id }: { id: number }) {
    const response = await api.expenses[":id{[0-9]+}"].$delete({ param: { id: id.toString() } });
    if (!response.ok) {
        throw new Error(
            "The server may be experiencing issues, Please try again later."
        );
    }
    const { data } = await response.json();
    return data;
};