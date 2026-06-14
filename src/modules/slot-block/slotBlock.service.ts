import { db } from "../../config/db";

import { consultations } from "../../db/schema/consultations";
import { slotBlocks } from "../../db/schema/slotBlocks";

import { and, eq, inArray } from "drizzle-orm";

export class SlotBlockService {
  static async blockSlots(
    date: string,
    slotIds: number[],
    reason?: string
  ) {
    for (const slotId of slotIds) {
      const booking = await db
        .select()
        .from(consultations)
        .where(
          and(
            eq(
              consultations.preferredDate,
              date
            ),
            eq(
              consultations.slotId,
              slotId
            )
          )
        )
        .limit(1);

      if (booking.length) {
        throw new Error(
          `Slot ${slotId} is already booked`
        );
      }

      const block = await db
        .select()
        .from(slotBlocks)
        .where(
          and(
            eq(
              slotBlocks.blockedDate,
              date
            ),
            eq(
              slotBlocks.slotId,
              slotId
            )
          )
        )
        .limit(1);

      if (block.length) {
        throw new Error(
          `Slot ${slotId} is already blocked`
        );
      }
    }

    await db.insert(slotBlocks).values(
      slotIds.map((slotId) => ({
        slotId,
        blockedDate: date,
        reason,
      }))
    );

    return true;
  }
  
  static async unblockSlots(
    date: string,
    slotIds: number[]
    ) {
    await db
        .delete(slotBlocks)
        .where(
        and(
            eq(
            slotBlocks.blockedDate,
            date
            ),
            inArray(
            slotBlocks.slotId,
            slotIds
            )
        )
        );

    return true;
    }
}