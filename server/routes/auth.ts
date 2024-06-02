import { Hono } from "hono";
import { authMiddleware } from "../middlewares";
import { kindeClient, sessionManager } from "../kinde";
import { catchHandler } from "../utils";

export const authRoute = new Hono()
    // Get profile, to check authentication status & pass the user
    .get("/profile", authMiddleware, async (c) => {
        try {
            const { isAuthenticated, user } = c.var;
            return c.json({ success: true, data: { isAuthenticated, user } }, 200);
        } catch (error) {
            catchHandler(c, error);
        }
    })
    // Get login
    .get("/login", async (c) => {
        try {
            const loginUrl = await kindeClient.login(sessionManager(c));
            return c.redirect(loginUrl.toString());
        } catch (error) {
            catchHandler(c, error);
        }
    })
    // Get register
    .get("/register", async (c) => {
        try {
            const registerUrl = await kindeClient.register(sessionManager(c));
            return c.redirect(registerUrl.toString());
        } catch (error) {
            catchHandler(c, error);
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
            catchHandler(c, error);
        }
    })
    // Get logout
    .get("/logout", async (c) => {
        try {
            const logoutUrl = await kindeClient.logout(sessionManager(c));
            return c.redirect(logoutUrl.toString());
        } catch (error) {
            catchHandler(c, error);
        }
    });
