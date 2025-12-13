import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBarberStore } from "../../../../store/useBarberStore";
import { useBarberActions } from "../../hooks/useBarberActions";
import { startTransition, useLayoutEffect, useState } from "react";
import { createBarberSchema } from "../../../../validates/BarberSchema";
import type { z } from "zod";
import type { CreateBarberData, WorkingHours } from "../../../../types/barber";

const defaultWorkingHours: WorkingHours = {
  "1": { isWorking: true, start: "09:00", end: "21:00" },
  "2": { isWorking: true, start: "09:00", end: "21:00" },
  "3": { isWorking: true, start: "09:00", end: "21:00" },
  "4": { isWorking: true, start: "09:00", end: "21:00" },
  "5": { isWorking: true, start: "09:00", end: "21:00" },
  "6": { isWorking: true, start: "09:00", end: "21:00" },
  "0": { isWorking: false },
};

type FormData = z.infer<typeof createBarberSchema>;

export default function CreateBarberModal() {
  const { isCreateOpen, closeCreate } = useBarberStore();
  const { create } = useBarberActions();
  const [avatar, setAvatar] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(createBarberSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      description: "",
      commission: 40,
      status: "active",
    },
  });

  useLayoutEffect(() => {
    if (isCreateOpen) {
      reset();
      startTransition(() => {
        setAvatar("");
      });
    }
  }, [isCreateOpen, reset]);

  const uploadImage = async (file: File): Promise<string> => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "thinhstyle");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dgap7lcbd/image/upload",
      { method: "POST", body: data }
    );
    const json = await res.json();
    return json.secure_url;
  };

  const onSubmit = async (data: FormData) => {
    const payload: CreateBarberData = {
      ...data,
      avatar,
      workingHours: defaultWorkingHours,
      rating: 0,
      totalRevenue: 0,
      role: "barber",
      password: "123456",
      email: data.email || "",
    };
    create.mutate(payload);
    toast.success("Tạo thợ thành công! Mật khẩu: 123456", { duration: 10000 });
  };

  if (!isCreateOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/80 backdrop-blur flex items-center justify-center z-50 p-4"
      onClick={closeCreate}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="bg-gradient-to-br from-gray-900 to-black border border-orange-500/50 rounded-2xl p-8 max-w-2xl w-full max-h-screen overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
          Thêm Thợ Mới
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex justify-center">
            <label className="cursor-pointer">
              {avatar ? (
                <img
                  src={avatar}
                  alt="Avatar"
                  className="w-32 h-32 rounded-full object-cover border-4 border-orange-500"
                />
              ) : (
                <div className="w-32 h-32 bg-gray-800 rounded-full border-4 border-dashed border-orange-500 flex items-center justify-center">
                  <Plus className="w-12 h-12 text-orange-500" />
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={async (e) => {
                  if (e.target.files?.[0]) {
                    const url = await uploadImage(e.target.files[0]);
                    setAvatar(url);
                  }
                }}
              />
            </label>
          </div>

          {/* Các input */}
          <input
            {...register("name")}
            placeholder="Họ tên *"
            className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-orange-500 outline-none"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}

          <input
            {...register("phone")}
            placeholder="Số điện thoại *"
            className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-orange-500 outline-none"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}

          <input
            {...register("email")}
            placeholder="Email (tùy chọn)"
            className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-orange-500 outline-none"
          />

          <textarea
            {...register("description")}
            placeholder="Mô tả (kinh nghiệm, chuyên môn...)"
            rows={3}
            className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-orange-500 outline-none resize-none"
          />

          <div className="flex items-center justify-between">
            <span>Hoa hồng (%)</span>
            <input
              type="number"
              {...register("commission", { valueAsNumber: true })}
              className="w-24 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-center"
            />
          </div>
          {errors.commission && (
            <p className="text-red-500 text-sm">{errors.commission.message}</p>
          )}

          <button
            type="submit"
            disabled={create.isPending}
            className="w-full bg-gradient-to-r from-orange-500 to-red-600 py-5 rounded-xl font-bold text-xl hover:scale-105 transition disabled:opacity-50"
          >
            {create.isPending ? "Đang tạo..." : "Tạo Ngay"}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}
