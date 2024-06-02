import { Button } from '@/components/ui/button';
import { getProfileQueryOptions } from '@/lib';
import { Outlet, createFileRoute } from '@tanstack/react-router'

// src/routes/_authenticated.tsx
export const Route = createFileRoute('/_authenticated')({
    beforeLoad: async ({ context }) => {
        const { queryClient } = context;
        try {
            const data = await queryClient.fetchQuery(getProfileQueryOptions);
            return data;
        } catch (error) {
            return { isAuthenticated: false };
        }
    },
    component: Component,
})

function Component() {
    const { isAuthenticated } = Route.useRouteContext();
    if (!isAuthenticated) {
        return <Login />
    }
    return <Outlet />
};

function Login() {
    return (
        <div className='flex flex-col gap-y-5'>
            <p>You have to login or register !</p>
            <div className="flex gap-x-3 items-center">
                <Button asChild>
                    <a href="/api/auth/login">Login</a>
                </Button>
                <Button asChild>
                    <a href="/api/auth/register">Register</a>
                </Button>
            </div>
        </div>
    );
};