import { getProfileQueryOptions } from "@/lib";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute('/_authenticated/profile')({
    component: Profile
});

function Profile() {
    const { data, error, isPending } = useQuery(getProfileQueryOptions);
    if (isPending) return "Loading";
    if (error) return error.message;

    const { user } = data;
    const { given_name, family_name } = user;

    return (
        <div className="p-2">
            <p>Hello {given_name} {family_name} !</p>
            <a href="/api/auth/logout">Logout!</a>
        </div>
    );
};
