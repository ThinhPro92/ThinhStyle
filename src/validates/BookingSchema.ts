import { z } from "zod";
const phoneRegex = /^0\d{9}$/;
export const createBookingSchema = z.object({
  barberId: z.string().min(1, "Chọn thợ"),
  serviceIds: z.array(z.string()).min(1, "Chọn ít nhất 1 dịch vụ"),
  date: z.string().min(1, "Chọn ngày"),
  startTime: z.string().min(1, "Chọn giờ"),
  note: z.string().optional(),

  customerName: z
    .string()
    .min(2, "Nhập tên khách")
    .max(100, "Tên không được vượt quá 100 ký tự"),

  customerPhone: z
    .string()
    .min(1, "Nhập SĐT khách")
    .regex(phoneRegex, "SĐT phải gồm 10 số và bắt đầu bằng số 0"),
});

export const updateBookingSchema = createBookingSchema.partial().extend({
  status: z
    .enum(["pending", "confirmed", "cancelled", "completed", "rejected"])
    .optional(), // ← Add status
});
