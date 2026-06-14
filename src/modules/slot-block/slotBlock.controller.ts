import {
  Request,
  Response
} from "express";

import { SlotBlockService }
from "./slotBlock.service";

export class SlotBlockController {
  static async blockSlots(
    req: Request,
    res: Response
  ) {
    try {
      const {
        date,
        slotIds,
        reason
      } = req.body;

      if (
        !date ||
        !Array.isArray(slotIds) ||
        slotIds.length === 0
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Date and slotIds are required"
        });
      }

      await SlotBlockService.blockSlots(
        date,
        slotIds,
        reason
      );

      return res.status(200).json({
        success: true,
        message:
          "Slots blocked successfully"
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message:
          error.message
      });
    }
  }
  
  static async unblockSlots(
    req: Request,
    res: Response
    ) {
    try {
        const {
        date,
        slotIds
        } = req.body;

        if (
        !date ||
        !Array.isArray(slotIds) ||
        slotIds.length === 0
        ) {
        return res.status(400).json({
            success: false,
            message:
            "Date and slotIds are required"
        });
        }

        await SlotBlockService.unblockSlots(
        date,
        slotIds
        );

        return res.status(200).json({
        success: true,
        message:
            "Slots unblocked successfully"
        });

    } catch (error: any) {
        return res.status(500).json({
        success: false,
        message:
            error.message
        });
    }
    }
}