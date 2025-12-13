import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useServiceActions } from "../hooks/useServiceActions";
import { useLayoutEffect, startTransition } from "react";
import type { z } from "zod";
import { createServiceSchema } from "../../../validates/ServiceSchema";
import { useServiceStore } from "../../../store/useServiceStore";
import type { CreateServiceData } from "../../../types/service";

type FormData = z.infer<typeof createServiceSchema>;

export default function CreateServiceModal() {
  const { isCreateOpen, closeCreate, form, setForm } = useServiceStore();
  const { create } = useServiceActions();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(createServiceSchema),
  });

  useLayoutEffect(() => {
    if (isCreateOpen) {
      reset();
      startTransition(() => {
        setForm({
          name: "",
          price: 0,
          duration: 30,
          description: "",
          image: "",
          isActive: true,
        });
      });
    }
  }, [isCreateOpen, reset, setForm]);

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
    const payload: CreateServiceData = {
      ...data,
      image: form.image,
    };
    create.mutate(payload);
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
          Thêm Dịch Vụ Mới
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex justify-center">
            <label className="cursor-pointer">
              {form.image ? (
                <img
                  src={form.image}
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

          <input
            {...register("name")}
            placeholder="Tên dịch vụ *"
            className="input-field"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}

          <input
            {...register("price", { valueAsNumber: true })}
            type="number"
            placeholder="Giá (VNĐ) *"
            className="input-field"
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price.message}</p>
          )}

          <input
            {...register("duration", { valueAsNumber: true })}
            type="number"
            placeholder="Thời gian (phút) *"
            className="input-field"
          />
          {errors.duration && (
            <p className="text-red-500 text-sm">{errors.duration.message}</p>
          )}

          <textarea
            {...register("description")}
            placeholder="Mô tả dịch vụ"
            rows={3}
            className="input-field resize-none"
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
