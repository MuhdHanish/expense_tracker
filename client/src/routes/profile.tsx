import { api } from "@/lib";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute('/profile')({
    component: Profile
});

async function getProfile() {
    const response = await api.auth["me"].$get();
    if (!response.ok) throw new Error("The server may be experiencing issues, Please try again later.");
    const { data } = await response.json();
    return data;
};

function Profile() {
    const { data, error, isPending } = useQuery({ queryKey: ["get-total-spent"], queryFn: getProfile });
    if (error) return "An error has occured: " + error.message;

    return <div className="p-2">Hello /profile!</div>
};
