import { z } from "zod";

export const userSchema = z.object({
  name: z
    .string({ required_error: "name is required" })
    .min(3, "name muse be at least 3 character")
    .max(20, "name maximin 20 character"),
  email: z
    .string({ required_error: "email is required" })
    .min(5, "email muse be at least 5 character")
    .max(50, "email maximin 20 character")
    .email("email is invalid"),
});
