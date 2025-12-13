import { z } from "zod";

export const staffLoginSchema = z.object({
  email: z.string().trim().toLowerCase().email("Email không đúng định dạng"),
  password: z.string().min(6, "Mật khẩu ít nhất 6 ký tự"),
});

export type StaffLoginForm = z.infer<typeof staffLoginSchema>;
