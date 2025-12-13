import { X } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useServiceActions } from "../hooks/useServiceActions";
import { useLayoutEffect, startTransition } from "react";
import type { z } from "zod";
import { updateServiceSchema } from "../../../validates/ServiceSchema";
import { useServiceStore } from "../../../store/useServiceStore";
import type { UpdateServiceData } from "../../../types/service";

type FormData = z.infer<typeof updateServiceSchema>;

export default function UpdateServiceModal() {
  const { isEditOpen, closeEdit, selectedService, form, setForm } =
    useServiceStore();
  const { update } = useServiceActions();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(updateServiceSchema),
  });

  useLayoutEffect(() => {
    if (selectedService && isEditOpen) {
      reset({
        name: selectedService.name,
        price: selectedService.price,
        duration: selectedService.duration,
        description: selectedService.description ?? "",
        isActive: selectedService.isActive,
      });

      startTransition(() => {
        setForm({
          name: selectedService.name,
          price: selectedService.price,
          duration: selectedService.duration,
          description: selectedService.description ?? "",
          image: selectedService.image ?? "",
          isActive: selectedService.isActive,
        });
      });
    }
  }, [selectedService, isEditOpen, reset, setForm]);

  const uploadImage = async (file: File): Promise<string> => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "thinhstyle");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dvzhf7x8t/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const json = await res.json();
    return json.secure_url;
  };

  const onSubmit = (data: FormData) => {
    const payload: UpdateServiceData = {
      ...data,
      image: form.image || undefined,
    };

    update.mutate({ id: selectedService!._id, data: payload });
  };

  if (!isEditOpen || !selectedService) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/80 backdrop-blur flex items-center justify-center z-50 p-4"
      onClick={closeEdit}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="bg-gradient-to-br from-gray-900 to-black border border-orange-500/50 rounded-2xl p-8 max-w-2xl w-full max-h-screen overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
            Sửa Dịch Vụ
          </h2>
          <button
            onClick={closeEdit}
            className="p-3 hover:bg-white/10 rounded-xl transition"
          >
            {} <X className="w-7 h-7" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex justify-center">
            <label className="cursor-pointer group">
              {form.image ? (
                <img
                  src={form.image}
                  alt="Preview"
                  className="w-48 h-48 rounded-xl object-cover border-4 border-orange-500 group-hover:opacity-90 transition"
                />
              ) : (
                <div className="w-48 h-48 bg-gray-800 rounded-xl border-4 border-dashed border-orange-500 flex items-center justify-center group-hover:bg-gray-700 transition">
                  <span className="text-6xl text-orange-500">+</span>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={async (e) => {
                  if (e.target.files?.[0]) {
                    const url = await uploadImage(e.target.files[0]);
                    setForm({ image: url });
                    toast.success("Upload ảnh thành công!");
                  }
                }}
              />
            </label>
          </div>

          <div>
            <input
              {...register("name")}
              placeholder="Tên dịch vụ *"
              className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-orange-500 outline-none transition"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <input
              {...register("price", { valueAsNumber: true })}
              type="number"
              placeholder="Giá (VNĐ) *"
              className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-orange-500 outline-none transition"
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">
                {errors.price.message}
              </p>
            )}
          </div>

          <div>
            <input
              {...register("duration", { valueAsNumber: true })}
              type="number"
              placeholder="Thời gian (phút) *"
              className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-orange-500 outline-none transition"
            />
            {errors.duration && (
              <p className="text-red-500 text-sm mt-1">
                {errors.duration.message}
              </p>
            )}
          </div>

          <textarea
            {...register("description")}
            placeholder="Mô tả dịch vụ"
            rows={3}
            className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-orange-500 outline-none resize-none transition"
          />

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              {...register("isActive")}
              className="w-6 h-6 rounded accent-orange-500"
            />
            <span className="text-lg">Hiển thị trên trang khách</span>
          </label>

          <button
            type="submit"
            disabled={update.isPending}
            className="w-full bg-gradient-to-r from-orange-500 to-red-600 py-5 rounded-xl font-bold text-xl hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {update.isPending ? "Đang cập nhật..." : "Cập Nhật Dịch Vụ"}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}
