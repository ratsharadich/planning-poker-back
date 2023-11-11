import { z } from "zod";

export const createRoomSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name must be greater that one character!" }),
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
});
