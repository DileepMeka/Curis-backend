import { z } from "zod";

export const createConsultationSchema = z.object({
  name: z
    .string()
    .min(2)
    .max(100),

  email: z
    .email(),

  phone: z
    .string()
    .min(10)
    .max(15),

  categoryId: z.number(),

  serviceId: z.number(),

  preferredDate: z.string(),

  slotId: z.number(),
});

export type CreateConsultationInput =
  z.infer<typeof createConsultationSchema>;