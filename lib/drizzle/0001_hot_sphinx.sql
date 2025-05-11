ALTER TABLE "links" ALTER COLUMN "created_at" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "links" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "links" ALTER COLUMN "updated_at" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "links" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "links" ALTER COLUMN "deleted_at" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "links" ADD COLUMN "email" text NOT NULL;