import {
  sqliteTable,
  integer,
  text
} from "drizzle-orm/sqlite-core";

export const slots = sqliteTable("slots", {
  id: integer("id").primaryKey({ autoIncrement: true }),

  startTime: text("start_time").notNull(),

  endTime: text("end_time").notNull(),

  isActive: integer("is_active", {
    mode: "boolean"
  }).default(true),

  createdAt: text("created_at")
    .$defaultFn(() => new Date().toISOString())
});