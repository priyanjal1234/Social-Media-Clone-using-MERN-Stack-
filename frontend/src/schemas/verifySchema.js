import { z } from "zod";

const verifyEmailSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  code: z
    .string()
    .min(1, { message: "Verification code is required" })
    .max(999999, { message: "Verification code cannot be more than 6 digits" })
});

export default verifyEmailSchema
