CREATE TABLE IF NOT EXISTS "expenses" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"title" text NOT NULL,
	"amount" numeric(12, 2)
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_id_index" ON "expenses" USING btree (user_id);