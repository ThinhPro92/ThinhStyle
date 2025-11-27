import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useStaffLogin } from "../hooks/useStaffLogin";
import { Card } from "../../../../components/ui/card";
import { Label } from "../../../../components/ui/label";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";

const schema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu ít nhất 6 ký tự"),
});

type FormData = z.infer<typeof schema>;

export default function StaffLoginForm() {
  const { mutate: login, isPending } = useStaffLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    login(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-accent to-orange-500 bg-clip-text text-transparent">
            ThinhStyle Staff
          </h1>
          <p className="text-slate-600 mt-3 text-lg">
            Đăng nhập Admin & Barber
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@thinhstyle.com"
              {...register("email")}
              error={!!errors.email}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Mật khẩu</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register("password")}
              error={!!errors.password}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full h-14 text-xl font-bold mt-8"
            disabled={isPending}
          >
            {isPending ? "Đang đăng nhập..." : "Đăng nhập ngay"}
          </Button>
        </form>

        <div className="mt-10 text-center text-sm text-slate-500 space-y-1">
          <p>Admin: admin@thinhstyle.com / 123456</p>
          <p>Barber: barber@thinhstyle.com / 123456</p>
        </div>
      </Card>
    </div>
  );
}
