import { NavBar } from "@/components/navbar";
import { TRouterContext } from "../../types/index";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";

export const Route = createRootRouteWithContext<TRouterContext>()({
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