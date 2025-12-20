import { Plus, X } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBarberStore } from "../../../../store/useBarberStore";
import { useBarberActions } from "../../hooks/useBarberActions";
import { useState, useCallback } from "react";
import { createBarberSchema } from "../../../../validates/BarberSchema";
import type { z } from "zod";
import type { CreateBarberData, WorkingHours } from "../../../../types/barber";

const defaultWorkingHours: WorkingHours = {
  "0": { isWorking: false },
  "1": { isWorking: true, start: "09:00", end: "21:00" },
  "2": { isWorking: true, start: "09:00", end: "21:00" },
  "3": { isWorking: true, start: "09:00", end: "21:00" },
  "4": { isWorking: true, start: "09:00", end: "21:00" },
  "5": { isWorking: true, start: "09:00", end: "21:00" },
  "6": { isWorking: true, start: "09:00", end: "21:00" },
};

type FormData = z.infer<typeof createBarberSchema>;

type AvatarState = {
  file: File | null;
  preview: string;
};

type CloudinaryUploadResult = {
  secure_url: string;
  public_id: string;
};

type CreateBarberPayload = CreateBarberData & {
  avatarPublicId?: string;
};

export default function CreateBarberModal() {
  const { isCreateOpen, closeCreate } = useBarberStore();
  const { create } = useBarberActions();

  const [avatar, setAvatar] = useState<AvatarState>({
    file: null,
    preview: "",
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(createBarberSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      description: "",
      status: "active",
    },
  });

  const uploadImage = useCallback(async (file: File) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "thinhstyle");
    data.append("folder", "barber");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dgap7lcbd/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const json: CloudinaryUploadResult & {
      error?: { message: string };
    } = await res.json();

    if (!res.ok) {
      throw new Error(json.error?.message || "Upload failed");
    }

    return {
      url: json.secure_url,
      publicId: json.public_id,
    };
  }, []);

  const onSubmit = async (data: FormData) => {
    try {
      let avatarUrl = "";
      let avatarPublicId: string | undefined;

      if (avatar.file) {
        const uploaded = await uploadImage(avatar.file);
        avatarUrl = uploaded.url;
        avatarPublicId = uploaded.publicId;
      }

      const payload: CreateBarberPayload = {
        ...data,
        password: "123456",
        avatar: avatarUrl,
        avatarPublicId,
        workingHours: defaultWorkingHours,
        rating: 0,
        totalRevenue: 0,
        role: "barber",
        email: data.email || "",
      };

      create.mutate(payload, {
        onSuccess: () => {
          reset();
          setAvatar({ file: null, preview: "" });
          closeCreate();
        },
      });
    } catch (err) {
      console.log(err);
      toast.error("Có lỗi khi tạo thợ");
    }
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
            Thêm Thợ Mới
          </h2>
          <button
            onClick={closeCreate}
            aria-label="Đóng"
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
                  alt="Avatar preview"
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
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;

                  setAvatar({
                    file,
                    preview: URL.createObjectURL(file),
                  });
                }}
              />
            </label>
          </div>

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

          <button
            type="submit"
            disabled={create.isPending}
            className="w-full bg-gradient-to-r from-orange-500 to-red-600 py-5 rounded-xl font-bold text-xl transition
             disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {create.isPending ? "Đang tạo..." : "Tạo Ngay"}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}
