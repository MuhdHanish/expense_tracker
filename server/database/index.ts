import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

// for query purposes
const queryClient = postgres(process.env.DATABASE_URL!);
export const database = drizzle(queryClient);