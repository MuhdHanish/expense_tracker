// Hono client
import { hc } from 'hono/client';
import { queryOptions } from "@tanstack/react-query";

// Type of Base API Route
import { type ApiRoutes } from "@server/app";

// Client object
const client = hc<ApiRoutes>("/");

// Export the api client as api
export const api = client.api;

// Getting the current user profile
async function getProfile() {
    const response = await api.auth["profile"].$get();
    if (!response.ok) {
        if (response.status >= 500) throw new Error("The server may be experiencing issues, Please try again later.");
        else throw new Error("Not logged in.");
    }
    const { data } = await response.json();
    return data;
};

// Export the get profile query options to use globally
export const getProfileQueryOptions = queryOptions({ queryKey: ["get-profile"], queryFn: getProfile, staleTime: Infinity });