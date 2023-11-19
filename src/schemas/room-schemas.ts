import { z } from "zod";

export const createRoomSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, { message: "Name must be greater than one character!" }),
    userId: z
      .string()
      .refine(
        (value) => /^[a-f\d]{8}(-[a-f\d]{4}){4}[a-f\d]{8}$/i.test(value),
        {
          message: "Invalid UUID format for roomIds!",
        }
      ),
  }),
});

export const updatedRoomSchema = z.object({
  params: z
    .object({
      id: z
        .string()
        .min(1, { message: "Name must be greater that one character!" })
        .refine(
          (value) => /^[a-f\d]{8}(-[a-f\d]{4}){4}[a-f\d]{8}$/i.test(value),
          {
            message: "Invalid UUID format for id!",
          }
        ),
    })
    .partial(),
  body: z.object({
    name: z
      .string()
      .min(1, { message: "Name must be greater than one character!" })
      .optional(),
  }),
  userId: z
    .string()
    .min(1, { message: "Name must be greater that one character!" })
    .refine((value) => /^[a-f\d]{8}(-[a-f\d]{4}){4}[a-f\d]{8}$/i.test(value), {
      message: "Invalid UUID format for id!",
    })
    .optional(),
});
