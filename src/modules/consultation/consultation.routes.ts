import { Router } from "express";

import { ConsultationController } from "./consultation.controller";

import { verifyToken } from "../../middlewares/verifyToken";

const router = Router();

router.post(
  "/",
  ConsultationController.create
);

router.patch(
  "/:id/payment",
  verifyToken,
  ConsultationController.updatePayment
);

export default router;