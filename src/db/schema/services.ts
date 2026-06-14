import {
  sqliteTable,
  integer,
  text
} from "drizzle-orm/sqlite-core";

import { categories } from "./categories";

export const services = sqliteTable("services", {
  id: integer("id").primaryKey({ autoIncrement: true }),

  categoryId: integer("category_id")
    .notNull()
    .references(() => categories.id),

  name: text("name").notNull(),

  createdAt: text("created_at")
    .$defaultFn(() => new Date().toISOString())
});