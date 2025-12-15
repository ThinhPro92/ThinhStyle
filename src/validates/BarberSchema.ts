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
  commission: z
    .number("Hoa hồng phải là số")
    .min(0, "Hoa hồng tối thiểu 0%")
    .max(100, "Hoa hồng tối đa 100%"),

  status: z.enum(["active", "inactive"]),
});

export const updateBarberSchema = createBarberSchema.partial();
