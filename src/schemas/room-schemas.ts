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
        .min(1, { message: "Name must be greater that one character!" }),
    })
    .partial(),
});
