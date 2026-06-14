import { Request, Response } from "express";

import { createConsultationSchema } from "./consultation.validation";

import { ConsultationService } from "./consultation.service";


import { updatePaymentSchema } from "./consultation.payment.validation";

export class ConsultationController {
  static async create(
    req: Request,
    res: Response
  ) {
    try {
      const payload =
        createConsultationSchema.parse(
          req.body
        );

      const result =
        await ConsultationService.create(
          payload
        );

      return res.status(201).json({
        success: true,
        message:
          "Consultation booked successfully",
        data: {
          bookingId:
            result.booking.id,

          date:
            result.booking.preferredDate,

          slot: `${result.slot.startTime} - ${result.slot.endTime}`,
        },
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message:
          error.message ||
          "Something went wrong",
      });
    }
  }
  
  static async updatePayment(
    req: Request,
    res: Response
  ) {
    try {
      const consultationId =
        Number(
          req.params.id
        );

      const payload =
        updatePaymentSchema.parse(
          req.body
        );

      const result =
        await ConsultationService.updatePayment(
          consultationId,
          payload
        );

      return res.json({
        success: true,
        message:
          "Payment updated successfully",
        data: result,
      });
    } catch (error: any) {
      return res
        .status(400)
        .json({
          success: false,
          message:
            error.message,
        });
    }
  }
}