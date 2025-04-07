import { z } from "zod";

export const incomeSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 5 characters" }),
  amount: z.coerce.number().positive({ message: "Amount must be a positive number" }),
  source: z.string().min(1, { message: "Source is required" }),
  date: z.date(),
  description: z.string().optional(),
});