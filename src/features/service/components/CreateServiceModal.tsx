// src/features/service/components/CreateServiceModal.tsx
import { Plus, X } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useServiceActions } from "../hooks/useServiceActions";
import { useState } from "react";
import { createServiceSchema } from "../../../validates/ServiceSchema";
import type { z } from "zod";
import { useServiceStore } from "../../../store/useServiceStore";
import type { CreateServiceData } from "../../../types/service";

type FormData = z.infer<typeof createServiceSchema>;

type AvatarState = {
  file: File | null;
  preview: string;
};

export default function CreateServiceModal() {
  const { isCreateOpen, closeCreate } = useServiceStore();
  const { create } = useServiceActions();
  const [avatar, setAvatar] = useState<AvatarState>({
    file: null,
    preview: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(createServiceSchema),
  });

  const uploadImage = async (file: File): Promise<string> => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "thinhstyle");
    data.append("folder", "service");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dgap7lcbd/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const json = await res.json();
    if (!res.ok) throw new Error(json.error?.message || "Upload failed");
    return json.secure_url;
  };

  const onSubmit = async (data: FormData) => {
    let imageUrl = "";
    if (avatar.file) {
      imageUrl = await uploadImage(avatar.file);
    }

    const payload: CreateServiceData = {
      ...data,
      image: imageUrl,
    };

    create.mutate(payload, {
      onSuccess: () => {
        reset();
        setAvatar({ file: null, preview: "" });
        closeCreate();
      },
      onError: () => toast.error("Lỗi khi thêm dịch vụ"),
    });
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
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
            Thêm Dịch Vụ Mới
          </h2>
          <button
            onClick={closeCreate}
            aria-label="x"
            className="p-3 hover:bg-white/10 rounded-xl transition"
          >
            <X className="w-8 h-8" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex justify-center">
            <label className="cursor-pointer">
              {avatar.preview ? (
                <img
                  src={avatar.preview}
                  alt="Preview"
                  className="w-48 h-48 rounded-xl object-cover border-4 border-orange-500"
                />
              ) : (
                <div className="w-48 h-48 bg-gray-800 rounded-xl border-4 border-dashed border-orange-500 flex items-center justify-center">
                  <Plus className="w-16 h-16 text-orange-500" />
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setAvatar({
                      file,
                      preview: URL.createObjectURL(file),
                    });
                  }
                }}
              />
            </label>
          </div>

          <input
            {...register("name")}
            placeholder="Tên dịch vụ *"
            className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-orange-500 outline-none"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}

          <input
            {...register("price", { valueAsNumber: true })}
            type="number"
            placeholder="Giá (VNĐ) *"
            className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-orange-500 outline-none"
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price.message}</p>
          )}

          <input
            {...register("duration", { valueAsNumber: true })}
            type="number"
            placeholder="Thời gian (phút) *"
            className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-orange-500 outline-none"
          />
          {errors.duration && (
            <p className="text-red-500 text-sm">{errors.duration.message}</p>
          )}

          <textarea
            {...register("description")}
            placeholder="Mô tả dịch vụ"
            rows={3}
            className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-orange-500 outline-none resize-none"
          />

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              {...register("isActive")}
              className="w-5 h-5"
            />
            <span>Hiển thị trên trang khách</span>
          </label>

          <button
            type="submit"
            disabled={create.isPending}
            className="w-full bg-gradient-to-r from-orange-500 to-red-600 py-5 rounded-xl font-bold text-xl hover:scale-105 transition disabled:opacity-50"
          >
            {create.isPending ? "Đang thêm..." : "Thêm Dịch Vụ"}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}
