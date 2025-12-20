import { Edit, Trash2, Clock } from "lucide-react";
import { motion } from "framer-motion";
import type { Service } from "../../../types/service";
import { useServiceStore } from "../../../store/useServiceStore";

interface Props {
  service: Service;
}

export default function ServiceCard({ service }: Props) {
  const { openEdit, openDelete } = useServiceStore();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl overflow-hidden hover:border-orange-500/50 transition group"
    >
      {service.image ? (
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
          <span className="text-6xl text-white/30">✂️</span>
        </div>
      )}
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2">{service.name}</h3>
        <p className="text-orange-400 text-3xl font-bold mb-2">
          {service.price.toLocaleString("vi-VN")}đ
        </p>
        <div className="flex items-center gap-2 text-gray-400 mb-4">
          <Clock className="w-5 h-5" />
          <span>{service.duration} phút</span>
        </div>
        <p className="text-gray-400 text-sm line-clamp-2">
          {service.description || "Chưa có mô tả"}
        </p>
        <div className="flex justify-between items-center mt-6">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              service.isActive
                ? "bg-green-500/20 text-green-400"
                : "bg-red-500/20 text-red-400"
            }`}
          >
            {service.isActive ? "Đang bán" : "Tạm ẩn"}
          </span>
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
            <button
              onClick={() => openEdit(service)}
              aria-label="Edit"
              className="p-3 bg-blue-500/20 hover:bg-blue-500/40 rounded-xl transition"
            >
              <Edit className="w-5 h-5" />
            </button>
            <button
              onClick={() => openDelete(service)}
              aria-label="Trash2"
              className="p-3 bg-red-500/20 hover:bg-red-500/40 rounded-xl transition"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
