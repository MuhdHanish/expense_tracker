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
        <div>
            <p>You have to login</p>
            <a href="/api/auth/login">Login!</a>
        </div>
    );
};