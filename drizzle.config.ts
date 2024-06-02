import { defineConfig } from "drizzle-kit";

export default defineConfig({
    schema: "./server/database/schema/*",
    out: "./drizzle",
    dialect: "postgresql", // 'postgresql' | 'mysql' | 'sqlite'
    dbCredentials: {
        url: process.env.DATABASE_URL!
    },
});