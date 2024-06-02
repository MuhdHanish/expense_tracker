import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";

// for migrations
const migrationClient = postgres(process.env.DATABASE_URL!, { max: 1 });

// This will run migrations on the database, skipping the ones already applied
await migrate(drizzle(migrationClient), { migrationsFolder: "./drizzle" });
console.log(`Migration completed 🚀`);


// Don't forget to close the connection, otherwise the script will hang
await migrationClient.end();