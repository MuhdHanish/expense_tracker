import { createMiddleware } from "hono/factory";
import { kindeClient, sessionManager } from "../kinde";
import { type UserType } from "@kinde-oss/kinde-typescript-sdk";

type Env = {
    Variables: {
        isAuthenticated: boolean,
        user: UserType,
    }
};

export const authMiddleware = createMiddleware<Env>(async (c, next) => {
    try {
        const isAuthenticated = await kindeClient.isAuthenticated(sessionManager(c));
        if (!isAuthenticated) return c.json({ success: false, message: "Unauthorized: You need to log in to access this resource", data: { isAuthenticated } }, 401);
        else {
            const user = await kindeClient.getUserProfile(sessionManager(c));
            c.set("isAuthenticated", true);
            c.set("user", user);
            await next();
        }
    } catch (error) {
        return c.json({
            success: false,
            message: "Internal Server Error!",
            error: error instanceof Error ? error.message : "Unexpected Error."
        }, 500);
    }
})