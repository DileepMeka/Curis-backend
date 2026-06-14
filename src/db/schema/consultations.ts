import {
  sqliteTable,
  integer,
  text,
  unique
} from "drizzle-orm/sqlite-core";

import { categories } from "./categories";
import { services } from "./services";
import { slots } from "./slots";

export const consultations = sqliteTable(
  "consultations",
  {
    id: integer("id")
      .primaryKey({ autoIncrement: true }),

    name: text("name").notNull(),

    email: text("email").notNull(),

    phone: text("phone").notNull(),

    categoryId: integer("category_id")
      .notNull()
      .references(() => categories.id),

    serviceId: integer("service_id")
      .notNull()
      .references(() => services.id),

    preferredDate: text("preferred_date")
      .notNull(),

    slotId: integer("slot_id")
      .notNull()
      .references(() => slots.id),

    status: text("status")
      .default("pending"),
      
    paymentMode: text("payment_mode")
      .default("offline"),

    paymentStatus: text("payment_status")
      .default("pending"),

    paymentReferenceId:
      text("payment_reference_id"),
      
    paymentAmount:
      integer("payment_amount"),

    paymentDate:
      text("payment_date"),

    createdAt: text("created_at")
      .$defaultFn(() => new Date().toISOString())
  },

  (table) => ({
    uniqueSlotBooking: unique().on(
      table.preferredDate,
      table.slotId
    )
  })
);