import type { Context } from "hono";

export class CustomError extends Error {
    code: number;

    constructor(message: string, code: number) {
        super(message);
        this.code = code;
    }
}

export const catchHandler = (c: Context, error: unknown) => {
    console.log(`Error on URL: ${c.req.url}, METHOD: ${c.req.method} : ${error}`);
    if (error instanceof CustomError) {
        const { code: status, message } = error;
        return c.json({
            success: false,
            message
        }, { status });
    } else {
        return c.json({
            success: false,
            message: "Internal Server Error",
            error: error instanceof Error ? error.message : "Unexpected Error"
        }, 500);
    }
}