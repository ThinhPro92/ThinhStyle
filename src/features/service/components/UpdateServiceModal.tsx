// src/features/admin/services/components/UpdateServiceModal.tsx
import { Plus, X } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useServiceActions } from "../hooks/useServiceActions";
import { useServiceStore } from "../../../store/useServiceStore";

export default function UpdateServiceModal() {
  const { isEditOpen, closeEdit, selectedService, form, setForm } =
    useServiceStore();
  const { update } = useServiceActions();

  const uploadImage = async (file: File) => {
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

  const handleSubmit = () => {
    if (!form.name || form.price <= 0) return toast.error("Thiếu thông tin!");
    update.mutate({
      id: selectedService!._id,
      data: form,
    });
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
        className="bg-gradient-to-br from-gray-900 to-black border border-orange-500/50 rounded-2xl p-8 max-w-2xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
            Sửa Dịch Vụ
          </h2>
          <button
            onClick={closeEdit}
            className="p-3 hover:bg-white/10 rounded-xl"
          >
            <X className="w-7 h-7" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="flex justify-center">
            <label className="cursor-pointer">
              {form.image ? (
                <img
                  src={form.image}
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
                onChange={async (e) => {
                  if (e.target.files?.[0]) {
                    const url = await uploadImage(e.target.files[0]);
                    setForm({ image: url });
                    toast.success("Upload ảnh thành công!");
                  }
                }}
                className="hidden"
              />
            </label>
          </div>

          <input
            value={form.name}
            onChange={(e) => setForm({ name: e.target.value })}
            placeholder="Tên dịch vụ"
            className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-orange-500 outline-none"
          />
          <input
            type="number"
            value={form.price}
            onChange={(e) => setForm({ price: +e.target.value })}
            placeholder="Giá (VNĐ)"
            className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-orange-500 outline-none"
          />
          <input
            type="number"
            value={form.duration}
            onChange={(e) => setForm({ duration: +e.target.value })}
            placeholder="Thời gian (phút)"
            className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-orange-500 outline-none"
          />
          <textarea
            value={form.description}
            onChange={(e) => setForm({ description: e.target.value })}
            placeholder="Mô tả"
            rows={3}
            className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-orange-500 outline-none"
          />

          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(e) => setForm({ isActive: e.target.checked })}
              className="w-6 h-6"
            />
            <label>Hiển thị trên trang khách</label>
          </div>

          <button
            onClick={handleSubmit}
            disabled={update.isPending}
            className="w-full bg-gradient-to-r from-orange-500 to-red-600 py-5 rounded-xl font-bold text-xl hover:scale-105 transition disabled:opacity-50"
          >
            {update.isPending ? "Đang cập nhật..." : "Cập Nhật Dịch Vụ"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
