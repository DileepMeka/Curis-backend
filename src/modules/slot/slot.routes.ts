import { Router } from "express";

import { SlotController }
from "./slot.controller";

const router = Router();

router.get(
  "/",
  SlotController.getSlots
);

router.get(
  "/available",
  SlotController.getAvailableSlots
);


export default router;