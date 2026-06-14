import { z } from "zod";

export const updatePaymentSchema =
  z.object({
    paymentMode: z.enum([
      "online",
      "offline",
    ]),

    paymentStatus: z.enum([
      "pending",
      "paid",
    ]),

    paymentAmount: z
      .number()
      .nonnegative(),

    paymentReferenceId:
      z.string().optional(),

    paymentDate:
      z.string().optional(),
  });

export type UpdatePaymentInput =
  z.infer<
    typeof updatePaymentSchema
  >;