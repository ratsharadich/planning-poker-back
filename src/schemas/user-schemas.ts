import { z } from "zod";

export const createUserSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, { message: "Name must be greater than one character!" }),
  }),
});

export const updatedUserSchema = z.object({
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
      name: z
        .string()
        .min(1, { message: "Name must be greater than one character!" })
        .optional(),
    })
    .partial(),
});
