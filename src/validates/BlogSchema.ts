import { z } from "zod";

export const createBlogSchema = z.object({
  title: z.string().min(10, "Tiêu đề ít nhất 10 ký tự"),
  excerpt: z.string().min(50, "Mô tả ít nhất 50 ký tự"),
  content: z.string().min(200, "Nội dung ít nhất 200 ký tự"),

  author: z.string(),
  category: z.enum(["Xu hướng", "Mẹo vặt", "Tư vấn", "Sản phẩm"]),

  image: z.string().optional(),

  featured: z.boolean(),
  status: z.enum(["draft", "published"]),
});

export type CreateBlogForm = z.infer<typeof createBlogSchema>;

export const updateBlogSchema = createBlogSchema.partial();

export type UpdateBlogForm = z.infer<typeof updateBlogSchema>;
