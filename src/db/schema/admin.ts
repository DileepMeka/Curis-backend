import {
  sqliteTable,
  integer,
  text
} from "drizzle-orm/sqlite-core";

export const admins = sqliteTable(
  "admins",
  {
    id: integer("id")
      .primaryKey({ autoIncrement: true }),

    username: text("username")
      .notNull()
      .unique(),

    passwordHash: text("password_hash")
      .notNull(),

    createdAt: text("created_at")
      .$defaultFn(() =>
        new Date().toISOString()
      )
  }
);