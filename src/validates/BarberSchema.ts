import { z } from "zod";

const phoneRegex = /^0\d{9}$/;

export const createBarberSchema = z.object({
  name: z.string().min(2, "Tên bắt buộc"),
  phone: z
    .string()
    .min(1, "SĐT bắt buộc")
    .regex(phoneRegex, "SĐT phải gồm 10 số và bắt đầu bằng số 0"),
  email: z.string().email().optional(),
  description: z.string().optional(),
  status: z.enum(["active", "inactive"]),
});

export const updateBarberSchema = createBarberSchema.partial();
