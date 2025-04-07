import * as z from "zod";

export const userSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),

  phone: z.string().min(10),
});

export type UserFormData = z.infer<typeof userSchema>;