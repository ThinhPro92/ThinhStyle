import { z } from "zod";

export const createBookingSchema = z.object({
  barberId: z.string().min(1, "Chọn thợ"),
  serviceIds: z.array(z.string()).min(1, "Chọn ít nhất 1 dịch vụ"),
  date: z.string().min(1, "Chọn ngày"),
  startTime: z.string().min(1, "Chọn giờ"),
  note: z.string().optional(),

  customerName: z
    .string()
    .min(1, "Nhập tên khách")
    .max(100, "Tên không được vượt quá 100 ký tự"),

  customerPhone: z
    .string()
    .min(1, "Nhập SĐT khách")
    .regex(/^\d{10}$/, "Số điện thoại phải đúng 10 số"),
});

export const updateBookingSchema = createBookingSchema.partial();
