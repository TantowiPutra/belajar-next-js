import { timestamp } from "drizzle-orm/pg-core";
import { integer, pgTable, varchar, text } from "drizzle-orm/pg-core";

export const linksTable = pgTable("links", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  url: text().notNull(),
  created_at: timestamp().defaultNow(),
  updated_at: timestamp().defaultNow(),
  deleted_at: timestamp(),
});