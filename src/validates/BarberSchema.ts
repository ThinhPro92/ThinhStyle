import { z } from "zod";

export const createBarberSchema = z.object({
  name: z.string().min(1, "Tên bắt buộc"),
  phone: z.string().min(1, "SĐT bắt buộc"),
  email: z.string().email().optional(),
  description: z.string().optional(),
  commission: z.number().min(0).max(100),
  status: z.enum(["active", "inactive"]),
});

export const updateBarberSchema = createBarberSchema.partial();
