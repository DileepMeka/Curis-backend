import {
  Request,
  Response
} from "express";

import { SlotService }
from "./slot.service";

export class SlotController {
  static async getSlots(
    req: Request,
    res: Response
  ) {
    try {
      const date =
        req.query.date as string;

      if (!date) {
        return res
          .status(400)
          .json({
            success: false,
            message:
              "Date is required"
          });
      }

      const data =
        await SlotService.getSlotsByDate(
          date
        );

      return res
        .status(200)
        .json({
          success: true,
          data
        });
    } catch (error: any) {
      return res
        .status(500)
        .json({
          success: false,
          message:
            error.message
        });
    }
  }
  
  static async getAvailableSlots(
    req: Request,
    res: Response
  ) {
    try {
      const { date } = req.query;

      if (!date) {
        return res.status(400).json({
          success: false,
          message:
            "Date is required",
        });
      }

      const slots =
        await SlotService.getAvailableSlots(
          String(date)
        );

      return res.json({
        success: true,
        data: slots,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message:
          error.message ||
          "Failed to fetch slots",
      });
    }
  }
}