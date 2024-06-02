ALTER TABLE "expenses" ALTER COLUMN "amount" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "expenses" ADD COLUMN "date" date NOT NULL;