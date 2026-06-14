import { db } from "../../config/db";

import { slots } from "../../db/schema/slots";
import { consultations } from "../../db/schema/consultations";
import { slotBlocks } from "../../db/schema/slotBlocks";
import { categories } from "../../db/schema/categories";
import { services } from "../../db/schema/services";

import { eq } from "drizzle-orm";

export class SlotService {
  static async getSlotsByDate(
    date: string
  ) {
    const [
      allSlots,
      bookings,
      blocks,
      allCategories,
      allServices
    ] = await Promise.all([
      db.select().from(slots),

      db
        .select()
        .from(consultations)
        .where(
          eq(
            consultations.preferredDate,
            date
          )
        ),

      db
        .select()
        .from(slotBlocks)
        .where(
          eq(
            slotBlocks.blockedDate,
            date
          )
        ),

      db.select().from(categories),

      db.select().from(services)
    ]);

    return allSlots.map((slot) => {
      const booking =
        bookings.find(
          (b) =>
            b.slotId === slot.id
        );

      if (booking) {
        const category =
          allCategories.find(
            (c) =>
              c.id ===
              booking.categoryId
          );

        const service =
          allServices.find(
            (s) =>
              s.id ===
              booking.serviceId
          );

        return {
          slotId: slot.id,

          startTime:
            slot.startTime,

          endTime:
            slot.endTime,

          status: "booked",

          consultation: {
            id: booking.id,

            name:
              booking.name,

            email:
              booking.email,

            phone:
              booking.phone,

            categoryId:
              booking.categoryId,

            categoryName:
              category?.name ??
              null,

            serviceId:
              booking.serviceId,

            serviceName:
              service?.name ??
              null,

            paymentMode:
              booking.paymentMode,

            paymentStatus:
              booking.paymentStatus,

            paymentAmount:
              booking.paymentAmount,

            paymentReferenceId:
              booking.paymentReferenceId,

            paymentDate:
              booking.paymentDate,

            createdAt:
              booking.createdAt
          }
        };
      }

      const block =
        blocks.find(
          (b) =>
            b.slotId === slot.id
        );

      if (block) {
        return {
          slotId: slot.id,

          startTime:
            slot.startTime,

          endTime:
            slot.endTime,

          status: "blocked",

          reason:
            block.reason
        };
      }

      return {
        slotId: slot.id,

        startTime:
          slot.startTime,

        endTime:
          slot.endTime,

        status: "available"
      };
    });
  }
  
  static async getAvailableSlots(
    date: string
  ) {
    const [
      allSlots,
      bookings,
      blocks,
    ] = await Promise.all([
      db.select().from(slots),

      db
        .select()
        .from(consultations)
        .where(
          eq(
            consultations.preferredDate,
            date
          )
        ),

      db
        .select()
        .from(slotBlocks)
        .where(
          eq(
            slotBlocks.blockedDate,
            date
          )
        ),
    ]);

    return allSlots.filter((slot) => {
      const isBooked =
        bookings.some(
          (booking) =>
            booking.slotId === slot.id
        );

      const isBlocked =
        blocks.some(
          (block) =>
            block.slotId === slot.id
        );

      return !isBooked && !isBlocked;
    });
  }
}