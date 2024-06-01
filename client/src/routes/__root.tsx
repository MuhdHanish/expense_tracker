import { NavBar } from "@/components/navbar";
import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
    component: Root,
});

function Root() {
    return (
        <>
            <NavBar />
            <hr />
            <Outlet />
        </>
    );
};