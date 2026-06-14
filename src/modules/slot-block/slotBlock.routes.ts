import { Router } from "express";

import { SlotBlockController }
from "./slotBlock.controller";

import { verifyToken }
from "../../middlewares/verifyToken";

const router = Router();

router.post(
  "/bulk",
  verifyToken,
  SlotBlockController.blockSlots
);

router.post(
  "/bulk-unblock",
  verifyToken,
  SlotBlockController.unblockSlots
);

export default router;