import { api } from "@/lib";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute('/profile')({
    component: Profile
});

async function getProfile() {
    const response = await api.auth["profile"].$get();
    if (!response.ok) {
        if (response.status >= 500) throw new Error("The server may be experiencing issues, Please try again later.");
        else throw new Error("Not logged in.");
    } 
    const { data } = await response.json();
    return data;
};

function Profile() {
    const { data, error, isPending } = useQuery({ queryKey: ["get-profile"], queryFn: getProfile });
    if (isPending) return "Loading";
    if (error) return error.message;

    const { user } = data;
    const { given_name, family_name } = user;

    return <div className="p-2">Hello {given_name} {family_name} !</div>
};
