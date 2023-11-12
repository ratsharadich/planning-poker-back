import { z } from "zod";

export const createCardSchema = z.object({
  value: z
    .string()
    .min(1, { message: "Value must be greater than one character!" }),
  userId: z
    .string()
    .refine((value) => /^[a-f\d]{8}(-[a-f\d]{4}){4}[a-f\d]{8}$/i.test(value), {
      message: "Invalid UUID format for userId!",
    }),
  roomId: z
    .string()
    .refine((value) => /^[a-f\d]{8}(-[a-f\d]{4}){4}[a-f\d]{8}$/i.test(value), {
      message: "Invalid UUID format for roomId!",
    }),
});

export const updatedCardSchema = z.object({
  params: z.object({
    id: z
      .string()
      .min(1, { message: "ID must be greater than one character!" })
      .refine(
        (value) => /^[a-f\d]{8}(-[a-f\d]{4}){4}[a-f\d]{8}$/i.test(value),
        {
          message: "Invalid UUID format for id!",
        }
      ),
  }),
  body: z
    .object({
      value: z
        .string()
        .min(1, { message: "Value must be greater than one character!" })
        .optional(),
      userId: z
        .string()
        .refine(
          (value) => /^[a-f\d]{8}(-[a-f\d]{4}){4}[a-f\d]{8}$/i.test(value),
          {
            message: "Invalid UUID format for userId!",
          }
        )
        .optional(),
      roomId: z
        .string()
        .refine(
          (value) => /^[a-f\d]{8}(-[a-f\d]{4}){4}[a-f\d]{8}$/i.test(value),
          {
            message: "Invalid UUID format for roomId!",
          }
        )
        .optional(),
    })
    .partial(),
});
