import { X } from "lucide-react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBarberStore } from "../../../../store/useBarberStore";
import { useBarberActions } from "../../hooks/useBarberActions";
import { useEffect, useState } from "react";
import { updateBarberSchema } from "../../../../validates/BarberSchema";
import type { z } from "zod";
import type { UpdateBarberData } from "../../../../types/barber";

type FormData = z.infer<typeof updateBarberSchema>;

type AvatarState = {
  file: File | null;
  preview: string;
};

export default function UpdateBarberModal() {
  const { isEditOpen, closeEdit, selectedBarber } = useBarberStore();
  const { update } = useBarberActions();
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
    resolver: zodResolver(updateBarberSchema),
  });

  useEffect(() => {
    if (selectedBarber && isEditOpen) {
      reset({
        name: selectedBarber.name,
        phone: selectedBarber.phone,
        email: selectedBarber.email || "",
        description: selectedBarber.description || "",
        status: selectedBarber.status,
      });
    }
  }, [selectedBarber, isEditOpen, reset]);

  const uploadImage = async (file: File): Promise<string> => {
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
    const json = await res.json();
    if (!res.ok) throw new Error(json.error?.message || "Upload failed");
    return json.secure_url;
  };

  const onSubmit = async (data: FormData) => {
    let newAvatar = avatar.preview;

    if (avatar.file) {
      newAvatar = await uploadImage(avatar.file);
    }

    const payload: UpdateBarberData = {
      ...data,
      avatar: newAvatar,
    };

    update.mutate({ id: selectedBarber!._id, data: payload });
  };

  const isObjectUrl = avatar.preview.startsWith("blob:");

  if (!isEditOpen || !selectedBarber) return null;

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
        className="bg-gradient-to-br from-gray-900 to-black border border-orange-500/50 rounded-2xl p-8 max-w-4xl w-full max-h-screen overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
            Sửa Thông Tin Thợ
          </h2>
          <button
            onClick={closeEdit}
            aria-label="X"
            className="p-3 hover:bg-white/10 rounded-xl"
          >
            <X className="w-7 h-7" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid lg:grid-cols-2 gap-8"
        >
          <div className="space-y-6">
            <div className="flex justify-center">
              <label className="cursor-pointer">
                {avatar.preview ? (
                  isObjectUrl ? (
                    <img
                      src={avatar.preview}
                      alt="Avatar preview"
                      className="w-40 h-40 rounded-full object-cover border-4 border-orange-500"
                    />
                  ) : (
                    <img
                      src={avatar.preview}
                      alt="Avatar"
                      className="w-40 h-40 rounded-full object-cover border-4 border-orange-500"
                    />
                  )
                ) : (
                  <div className="w-40 h-40 bg-gray-800 rounded-full border-4 border-dashed border-orange-500 flex items-center justify-center text-6xl">
                    +
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
              placeholder="Họ tên"
              className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-orange-500 outline-none"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}

            <input
              {...register("phone")}
              placeholder="Số điện thoại"
              className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-orange-500 outline-none"
            />
            {errors.phone && (
              <p className="text-red-500">{errors.phone.message}</p>
            )}

            <input
              {...register("email")}
              placeholder="Email"
              className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-orange-500 outline-none"
            />

            <textarea
              {...register("description")}
              placeholder="Mô tả"
              rows={4}
              className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-orange-500 outline-none"
            />

            <div className="flex items-center justify-between">
              <span>Trạng thái</span>
              <select
                {...register("status")}
                className="px-6 py-3 bg-gray-800 border border-gray-700 rounded-xl"
              >
                <option value="active">Đang làm việc</option>
                <option value="inactive">Nghỉ việc</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={update.isPending}
            className="col-span-full bg-gradient-to-r from-orange-500 to-red-600 py-4 rounded-xl font-bold text-lg hover:scale-105 transition disabled:opacity-50"
          >
            {update.isPending ? "Đang cập nhật..." : "Cập Nhật Ngay"}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}
