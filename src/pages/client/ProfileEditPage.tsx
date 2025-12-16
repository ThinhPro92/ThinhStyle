import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../../components/ui/button";
import { useCustomerStore } from "../../store/useCustomerStore";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  name: z.string().min(2, "Tên phải ít nhất 2 ký tự").max(50, "Tên quá dài"),
});

type FormData = z.infer<typeof schema>;

export default function ProfileEditPage() {
  const { user, updateName } = useCustomerStore();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: user?.name || "" },
  });

  const onSubmit = (data: FormData) => {
    updateName(data.name);
    toast.success("Cập nhật tên thành công!");
    navigate("/");
  };

  if (!user) return <p className="text-center py-20">Bạn cần đăng nhập</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-md mx-auto bg-white rounded-3xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center mb-8">
          Đổi Tên Hiển Thị
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <input
            {...register("name")}
            placeholder="Nhập tên bạn muốn hiển thị"
            className="w-full px-6 py-4 bg-gray-100 rounded-xl focus:border-orange-500 outline-none transition"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
          <Button size="lg" className="w-full">
            Cập nhật tên
          </Button>
        </form>
      </div>
    </div>
  );
}
