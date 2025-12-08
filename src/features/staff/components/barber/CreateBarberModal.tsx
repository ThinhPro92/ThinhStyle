import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import { startTransition, useEffect, useState } from "react";
import { useBarberStore } from "../../../../store/useBarberStore";
import { useBarberActions } from "../../hooks/useBarberActions";
import apiClient from "../../../../lib/apiClient";

const defaultWorkingHours = {
  "1": { isWorking: true, start: "09:00", end: "21:00" },
  "2": { isWorking: true, start: "09:00", end: "21:00" },
  "3": { isWorking: true, start: "09:00", end: "21:00" },
  "4": { isWorking: true, start: "09:00", end: "21:00" },
  "5": { isWorking: true, start: "09:00", end: "21:00" },
  "6": { isWorking: true, start: "09:00", end: "21:00" },
  "0": { isWorking: false },
};

export default function CreateBarberModal() {
  const { isCreateOpen, closeCreate } = useBarberStore();
  const { create } = useBarberActions();
  const [avatar, setAvatar] = useState("");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    description: "",
    commission: 40,
    status: "active" as const,
  });

  useEffect(() => {
    if (isCreateOpen) {
      startTransition(() => {
        setForm({
          name: "",
          phone: "",
          email: "",
          description: "",
          commission: 40,
          status: "active",
        });
        setAvatar("");
      });
    }
  }, [isCreateOpen]);

  const uploadImage = async (file: File) => {
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

  const handleSubmit = async () => {
    if (!form.name || !form.phone)
      return toast.error("Nhập tên và số điện thoại!");

    create.mutate({
      ...form,
      avatar,
      workingHours: defaultWorkingHours,
      rating: 0,
      totalRevenue: 0,
      role: "barber",
      password: "123456", // MẬT KHẨU MẶC ĐỊNH
    });

    toast.success("Tạo thợ thành công! Mật khẩu: 123456", {
      duration: 10000,
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
        <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
          Thêm Thợ Mới
        </h2>

        <div className="space-y-6">
          <div className="flex justify-center">
            <label className="cursor-pointer">
              {avatar ? (
                <img
                  src={avatar}
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
                onChange={async (e) =>
                  e.target.files?.[0] &&
                  setAvatar(await uploadImage(e.target.files[0]))
                }
                className="hidden"
              />
            </label>
          </div>

          <input
            placeholder="Họ tên *"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-orange-500 outline-none"
          />
          <input
            placeholder="Số điện thoại *"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-orange-500 outline-none"
          />
          <input
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-orange-500 outline-none"
          />
          <textarea
            placeholder="Mô tả (kinh nghiệm, chuyên môn...)"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={3}
            className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-orange-500 outline-none"
          />
          <div className="flex items-center justify-between">
            <span>Hoa hồng (%)</span>
            <input
              type="number"
              value={form.commission}
              onChange={(e) =>
                setForm({ ...form, commission: +e.target.value })
              }
              className="w-24 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-center"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={create.isPending}
            className="w-full bg-gradient-to-r from-orange-500 to-red-600 py-5 rounded-xl font-bold text-xl hover:scale-105 transition disabled:opacity-50"
          >
            {create.isPending ? "Đang tạo..." : "Tạo Ngay"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
