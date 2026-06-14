import {
  sqliteTable,
  integer,
  text
} from "drizzle-orm/sqlite-core";

export const clinicSettings =
  sqliteTable("clinic_settings", {
    id: integer("id")
      .primaryKey({ autoIncrement: true }),

    clinicName: text("clinic_name")
      .notNull(),

    clinicEmail: text("clinic_email")
      .notNull(),

    bookingStartTime: text(
      "booking_start_time"
    ).notNull(),

    bookingEndTime: text(
      "booking_end_time"
    ).notNull(),

    slotDurationMinutes: integer(
      "slot_duration_minutes"
    ).default(15),

    updatedAt: text("updated_at")
      .$defaultFn(() => new Date().toISOString())
  });