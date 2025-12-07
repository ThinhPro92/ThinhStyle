// src/features/admin/services/components/CreateServiceModal.tsx
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import { useServiceActions } from "../hooks/useServiceActions";
import { useState } from "react";
import { useServiceStore } from "../../../store/useServiceStore";

export default function CreateServiceModal() {
  const { isCreateOpen, closeCreate } = useServiceStore();
  const { create } = useServiceActions();
  const [image, setImage] = useState("");

  const [form, setForm] = useState({
    name: "",
    price: 0,
    duration: 30,
    description: "",
    isActive: true,
  });

  const uploadImage = async (file: File) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "thinhstyle");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dvzhf7x8t/image/upload",
      { method: "POST", body: data }
    );
    const json = await res.json();
    return json.secure_url;
  };

  const handleSubmit = async () => {
    if (!form.name || form.price <= 0)
      return toast.error("Nhập đầy đủ tên và giá!");
    create.mutate({ ...form, image });
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
        className="bg-gradient-to-br from-gray-900 to-black border border-orange-500/50 rounded-2xl p-8 max-w-2xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
          Thêm Dịch Vụ Mới
        </h2>

        <div className="space-y-6">
          <div className="flex justify-center">
            <label className="cursor-pointer">
              {image ? (
                <img
                  src={image}
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
                onChange={async (e) =>
                  e.target.files?.[0] &&
                  setImage(await uploadImage(e.target.files[0]))
                }
                className="hidden"
              />
            </label>
          </div>

          <input
            placeholder="Tên dịch vụ"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-orange-500 outline-none"
          />
          <input
            type="number"
            placeholder="Giá (VNĐ)"
            value={form.price || ""}
            onChange={(e) => setForm({ ...form, price: +e.target.value })}
            className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-orange-500 outline-none"
          />
          <input
            type="number"
            placeholder="Thời gian (phút)"
            value={form.duration}
            onChange={(e) => setForm({ ...form, duration: +e.target.value })}
            className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-orange-500 outline-none"
          />
          <textarea
            placeholder="Mô tả dịch vụ"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={3}
            className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-orange-500 outline-none"
          />

          <button
            onClick={handleSubmit}
            disabled={create.isPending}
            className="w-full bg-gradient-to-r from-orange-500 to-red-600 py-5 rounded-xl font-bold text-xl hover:scale-105 transition"
          >
            {create.isPending ? "Đang thêm..." : "Thêm Dịch Vụ"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
