import { Hono } from "hono";
import { authMiddleware } from "../middlewares";
import { kindeClient, sessionManager } from "../kinde";

export const authRoute = new Hono()
    // Get profile, to check authentication status & pass the user
    .get("/profile", authMiddleware, async (c) => {
        try {
            const { isAuthenticated, user } = c.var;
            return c.json({ success: true, data: { isAuthenticated, user } }, 200);
        } catch (error) {
            return c.json({
                success: false,
                message: "Internal Server Error!",
                error: error instanceof Error ? error.message : "Unexpected Error."
            }, 500);
        }
    })
    // Get login
    .get("/login", async (c) => {
        try {
            const loginUrl = await kindeClient.login(sessionManager(c));
            return c.redirect(loginUrl.toString());
        } catch (error) {
            return c.json({
                success: false,
                message: "Internal Server Error!",
                error: error instanceof Error ? error.message : "Unexpected Error."
            }, 500);
        }
    })
    // Get register
    .get("/register", async (c) => {
        try {
            const registerUrl = await kindeClient.register(sessionManager(c));
            return c.redirect(registerUrl.toString());
        } catch (error) {
            return c.json({
                success: false,
                message: "Internal Server Error!",
                error: error instanceof Error ? error.message : "Unexpected Error."
            }, 500);
        }
    })
    // Get callback
    .get("/callback", async (c) => {
        // get called every time we login or register
        try {
            const url = new URL(c.req.url);
            await kindeClient.handleRedirectToApp(sessionManager(c), url);
            return c.redirect("/");
        } catch (error) {
            return c.json({
                success: false,
                message: "Internal Server Error!",
                error: error instanceof Error ? error.message : "Unexpected Error."
            }, 500);
        }
    })
    // Get logout
    .get("/logout", async (c) => {
        try {
            const logoutUrl = await kindeClient.logout(sessionManager(c));
            return c.redirect(logoutUrl.toString());
        } catch (error) {
            return c.json({
                success: false,
                message: "Internal Server Error!",
                error: error instanceof Error ? error.message : "Unexpected Error."
            }, 500);
        }
    });
