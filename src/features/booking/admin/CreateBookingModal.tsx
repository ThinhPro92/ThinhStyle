import { X } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

import { useBookingActions } from "../hooks/useBookingActions";
import { useBookingStore } from "../../../store/useBookingStore";
import apiClient from "../../../lib/apiClient";

// ĐÃ KHAI BÁO PROPS ĐÚNG
interface CreateBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateBookingModal({
  isOpen,
  onClose,
}: CreateBookingModalProps) {
  const { form, setForm, closeCreate } = useBookingStore();
  const { create } = useBookingActions();

  const { data: barbers = [] } = useQuery({
    queryKey: ["barbers"],
    queryFn: () => apiClient.get("/barber").then((r) => r.data.data),
  });

  const { data: services = [] } = useQuery({
    queryKey: ["services"],
    queryFn: () =>
      apiClient
        .get("/services")
        .then((r) => r.data.data.filter((s: any) => s.isActive)),
  });

  const handleSubmit = () => {
    if (
      !form.customerName ||
      !form.customerPhone ||
      !form.barberId ||
      !form.serviceId ||
      !form.date ||
      !form.time
    ) {
      return toast.error("Vui lòng điền đầy đủ thông tin!");
    }

    create.mutate({
      customerName: form.customerName,
      customerPhone: form.customerPhone,
      barberId: form.barberId,
      serviceId: form.serviceId,
      date: form.date,
      time: form.time,
      note: form.note || "",
      status: "pending",
    });
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="bg-gradient-to-br from-gray-900 to-black border border-orange-500/50 rounded-3xl p-10 max-w-2xl w-full max-h-screen overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
            Đặt Lịch Cho Thợ
          </h2>
          <button
            onClick={onClose}
            className="p-3 hover:bg-white/10 rounded-xl transition"
          >
            <X className="w-8 h-8" />
          </button>
        </div>

        {/* Form */}
        <div className="grid md:grid-cols-2 gap-6">
          <input
            placeholder="Tên khách hàng *"
            value={form.customerName}
            onChange={(e) => setForm({ customerName: e.target.value })}
            className="px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-orange-500 outline-none transition"
          />
          <input
            placeholder="Số điện thoại *"
            value={form.customerPhone}
            onChange={(e) => setForm({ customerPhone: e.target.value })}
            className="px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-orange-500 outline-none transition"
          />

          <select
            value={form.serviceId}
            onChange={(e) => setForm({ serviceId: e.target.value })}
            className="px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-orange-500 outline-none transition"
          >
            <option value="">Chọn dịch vụ</option>
            {services.map((s: any) => (
              <option key={s._id} value={s._id}>
                {s.name} - {s.price.toLocaleString()}đ
              </option>
            ))}
          </select>

          <select
            value={form.barberId}
            onChange={(e) => setForm({ barberId: e.target.value })}
            className="px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-orange-500 outline-none transition"
          >
            <option value="">Chọn thợ</option>
            {barbers.map((b: any) => (
              <option key={b._id} value={b._id}>
                {b.name} ({b.status === "active" ? "Online" : "Offline"})
              </option>
            ))}
          </select>

          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ date: e.target.value })}
            className="px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-orange-500 outline-none transition"
          />
          <input
            type="time"
            value={form.time}
            onChange={(e) => setForm({ time: e.target.value })}
            className="px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-orange-500 outline-none transition"
          />
        </div>

        <textarea
          placeholder="Ghi chú (tùy chọn)"
          value={form.note}
          onChange={(e) => setForm({ note: e.target.value })}
          rows={3}
          className="w-full mt-6 px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-orange-500 outline-none transition"
        />

        <div className="flex gap-4 mt-8">
          <button
            onClick={handleSubmit}
            disabled={create.isPending}
            className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 py-6 rounded-2xl font-bold text-2xl hover:scale-105 transition shadow-2xl disabled:opacity-70"
          >
            {create.isPending ? "Đang đặt lịch..." : "Xác Nhận Đặt Lịch"}
          </button>
          <button
            onClick={onClose}
            className="px-8 py-6 border border-gray-600 rounded-2xl font-bold text-xl hover:bg-white/10 transition"
          >
            Hủy
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
