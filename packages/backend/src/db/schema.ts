import { PgTableWithColumns } from "drizzle-orm/pg-core";
import { pgTable, text, timestamp, boolean, uuid } from "drizzle-orm/pg-core";

export const apiKeys:PgTableWithColumns<any> = pgTable("api_keys", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull(),
  keyHash: text("key_hash").notNull().unique(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  expiresAt: timestamp("expires_at"),
  revoked: boolean("revoked").default(false).notNull(),
});
