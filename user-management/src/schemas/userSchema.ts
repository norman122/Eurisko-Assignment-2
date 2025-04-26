import { z } from 'zod';

export const userSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().optional(),
  email: z.string().email("Invalid email address"),
  status: z.enum(["active", "locked"]),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date"),
});

export type UserFormData = z.infer<typeof userSchema>;