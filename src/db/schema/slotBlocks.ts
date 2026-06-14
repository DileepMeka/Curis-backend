import {
  sqliteTable,
  integer,
  text,
  unique
} from "drizzle-orm/sqlite-core";
import { slots } from "./slots";

export const slotBlocks = sqliteTable(
  "slot_blocks",
  {
    id: integer("id")
      .primaryKey({ autoIncrement: true }),

    slotId: integer("slot_id")
      .notNull()
      .references(() => slots.id),

    blockedDate: text("blocked_date")
      .notNull(),

    reason: text("reason"),

    createdAt: text("created_at")
      .$defaultFn(() => new Date().toISOString())
  },

  (table) => ({
    uniqueBlockedSlot: unique().on(
      table.blockedDate,
      table.slotId
    )
  })
);