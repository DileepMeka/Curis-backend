import { eq, and } from "drizzle-orm";

import { db } from "../../config/db";

import { categories } from "../../db/schema/categories";
import { services } from "../../db/schema/services";
import { slots } from "../../db/schema/slots";
import { consultations } from "../../db/schema/consultations";
import { slotBlocks } from "../../db/schema/slotBlocks";
 
import { CreateConsultationInput } from "./consultation.validation";
import { UpdatePaymentInput } from "./consultation.payment.validation";

import { ConsultationMailService } from "./consultation.mail";
import { ConsultationWhatsappService } from "./consultation.whatsapp";

export class ConsultationService {
  static async create(
    payload: CreateConsultationInput
  ) {
    const {
      categoryId,
      serviceId,
      preferredDate,
      slotId,
      name,
      email,
      phone,
    } = payload;

    // Category check
    const category = await db
      .select()
      .from(categories)
      .where(eq(categories.id, categoryId))
      .limit(1);

    if (!category.length) {
      throw new Error("Category not found");
    }

    // Service check
    const service = await db
      .select()
      .from(services)
      .where(eq(services.id, serviceId))
      .limit(1);

    if (!service.length) {
      throw new Error("Service not found");
    }

    // Service belongs to category
    if (
      service[0].categoryId !== categoryId
    ) {
      throw new Error(
        "Selected service does not belong to selected category"
      );
    }

    // Slot exists
    const slot = await db
      .select()
      .from(slots)
      .where(eq(slots.id, slotId))
      .limit(1);

    if (!slot.length) {
      throw new Error("Slot not found");
    }

    // Slot blocked
    const blockedSlot = await db
      .select()
      .from(slotBlocks)
      .where(
        and(
          eq(
            slotBlocks.blockedDate,
            preferredDate
          ),
          eq(
            slotBlocks.slotId,
            slotId
          )
        )
      )
      .limit(1);

    if (blockedSlot.length) {
      throw new Error(
        "Selected slot is unavailable"
      );
    }

    // Already booked
    const existingBooking = await db
      .select()
      .from(consultations)
      .where(
        and(
          eq(
            consultations.preferredDate,
            preferredDate
          ),
          eq(
            consultations.slotId,
            slotId
          )
        )
      )
      .limit(1);

    if (existingBooking.length) {
      throw new Error(
        "Selected slot is already booked"
      );
    }

    // Insert booking
    const result = await db
      .insert(consultations)
      .values(payload)
      .returning();

    // Send mails in background
    Promise.allSettled([
      ConsultationMailService.sendPatientMail({
        name,
        email,
        phone,
        category: category[0].name,
        service: service[0].name,
        date: preferredDate,
        slot: `${slot[0].startTime} - ${slot[0].endTime}`,
      }),

      ConsultationMailService.sendClinicMail({
        name,
        email,
        phone,
        category: category[0].name,
        service: service[0].name,
        date: preferredDate,
        slot: `${slot[0].startTime} - ${slot[0].endTime}`,
      }),
    ]).catch(console.error);
    
  //   ConsultationWhatsappService.sendPatientWhatsapp({
  //   name,
  //   email,
  //   phone,
  //   category: category[0].name,
  //   service: service[0].name,
  //   date: preferredDate,
  //   slot: `${slot[0].startTime} - ${slot[0].endTime}`,
  // }).catch(console.error);

  // ConsultationWhatsappService.sendClinicWhatsapp({
  //   name,
  //   email,
  //   phone,
  //   category: category[0].name,
  //   service: service[0].name,
  //   date: preferredDate,
  //   slot: `${slot[0].startTime} - ${slot[0].endTime}`,
  // }).catch(console.error);
    
    return {
      booking: result[0],
      slot: slot[0],
      service: service[0],
      category: category[0],
    };
  }
  
  static async updatePayment(
      consultationId: number,
      payload: UpdatePaymentInput
    ) {
      const consultation =
        await db
          .select()
          .from(consultations)
          .where(
            eq(
              consultations.id,
              consultationId
            )
          )
          .limit(1);

      if (!consultation.length) {
        throw new Error(
          "Consultation not found"
        );
      }

      if (
        payload.paymentMode ===
          "online" &&
        payload.paymentStatus ===
          "paid" &&
        !payload.paymentReferenceId
      ) {
        throw new Error(
          "Payment reference ID is required for online payments"
        );
      }

      const paymentDate =
        payload.paymentStatus ===
          "paid"
          ? payload.paymentDate ??
            new Date()
              .toISOString()
              .split("T")[0]
          : null;

      const result =
        await db
          .update(
            consultations
          )
          .set({
            paymentMode:
              payload.paymentMode,

            paymentStatus:
              payload.paymentStatus,

            paymentAmount:
              payload.paymentAmount,

            paymentReferenceId:
              payload.paymentReferenceId ??
              null,

            paymentDate,
          })
          .where(
            eq(
              consultations.id,
              consultationId
            )
          )
          .returning();

      return result[0];
    }
}