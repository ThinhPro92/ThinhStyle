import { Edit, Trash2, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useBarberStore } from "../../../../store/useBarberStore";

interface Props {
  barber: any;
}

export default function BarberCard({ barber }: Props) {
  const { openEdit, openDelete, openDetail } = useBarberStore();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6 hover:border-orange-500/50 transition group"
    >
      <div className="flex items-center gap-4 mb-4">
        {barber.avatar ? (
          <img
            src={barber.avatar}
            alt={barber.name}
            className="w-20 h-20 rounded-full object-cover border-4 border-orange-500/30"
          />
        ) : (
          <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center text-3xl font-bold">
            {barber.name[0]}
          </div>
        )}
        <div className="flex-1">
          <h3 className="text-xl font-bold">{barber.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="text-sm">{barber.rating || 0}</span>
            <span
              className={`ml-3 px-2 py-1 rounded-full text-xs ${
                barber.status === "active"
                  ? "bg-green-500/20 text-green-400"
                  : "bg-red-500/20 text-red-400"
              }`}
            >
              {barber.status === "active" ? "Đang làm" : "Nghỉ"}
            </span>
          </div>
        </div>
      </div>

      <p className="text-gray-400 text-sm line-clamp-2 mb-4">
        {barber.description || "Chưa có mô tả"}
      </p>

      <div className="flex justify-between items-end">
        <div>
          <p className="text-2xl font-bold text-orange-400">
            {(barber.totalRevenue || 0).toLocaleString()}đ
          </p>
          <p className="text-gray-400 text-sm">Doanh thu</p>
        </div>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
          <button
            onClick={() => openDetail(barber)}
            className="p-3 bg-blue-500/20 hover:bg-blue-500/40 rounded-xl"
          >
            {}
            <Eye className="w-5 h-5" />
          </button>
          <button
            onClick={() => openEdit(barber)}
            className="p-3 bg-yellow-500/20 hover:bg-yellow-500/40 rounded-xl"
          >
            {}
            <Edit className="w-5 h-5" />
          </button>
          <button
            onClick={() => openDelete(barber)}
            className="p-3 bg-red-500/20 hover:bg-red-500/40 rounded-xl"
          >
            {}
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
