import { api } from "./api";
import { queryOptions } from "@tanstack/react-query";

async function getProfile() {
    const response = await api.auth["profile"].$get();
    if (!response.ok) {
        if (response.status >= 500) throw new Error("The server may be experiencing issues, Please try again later.");
        else throw new Error("Not logged in.");
    }
    const { data } = await response.json();
    return data;
};

export const getProfileQueryOptions = queryOptions({ queryKey: ["get-profile"], queryFn: getProfile, staleTime: Infinity });