import { getProfileQueryOptions } from "@/lib";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Route = createFileRoute('/_authenticated/profile')({
    component: Profile
});

function Profile() {
    const { data, error, isPending } = useQuery(getProfileQueryOptions);
    if (isPending) return "Loading";
    if (error) return error.message;

    const { user } = data;
    const { given_name, family_name, picture } = user;

    return (
        <div className="p-2">
            <div className="flex gap-x-2 items-center">
                <Avatar>
                    {picture && <AvatarImage src={picture} alt={given_name} />}
                    <AvatarFallback>
                        <div className="font-bold">
                            <span>{given_name[0]}</span>
                            <span>{family_name[0]}</span>
                        </div>
                    </AvatarFallback>
                </Avatar>
                <p>{given_name} {family_name}</p>
            </div>
            <Button className="mt-5" variant="destructive">
                <a href="/api/auth/logout">Logout</a>
            </Button>
        </div>
    );
};
