import { z } from "zod";

export const createServiceSchema = z.object({
  name: z.string().min(2, "Tên dịch vụ ít nhất 2 ký tự"),
  price: z.number().min(1000, "Giá phải lớn hơn 1.000đ"),
  duration: z.number().min(10, "Thời gian ít nhất 10 phút").max(300),
  description: z.string().optional(),
  image: z.string().optional(),
  isActive: z.boolean(),
});

export const updateServiceSchema = createServiceSchema.partial();
