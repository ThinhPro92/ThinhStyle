import { z } from "zod";

export const createServiceSchema = z.object({
  name: z.string().trim().min(2, "Tên dịch vụ ít nhất 2 ký tự"),
  price: z.number().min(10000, "Giá phải lớn hơn hoặc bằng 10.000đ"),
  duration: z
    .number()
    .min(10, "Thời gian ít nhất 10 phút")
    .max(300, "Thời gian tối đa 300 phút"),
  description: z.string().optional(),
  image: z.string().optional(),
  isActive: z.boolean(),
});

export const updateServiceSchema = createServiceSchema.partial();
