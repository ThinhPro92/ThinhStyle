import { useQuery } from "@tanstack/react-query";

import { motion } from "framer-motion";
import { Calendar, Clock, Scissors, User } from "lucide-react";
import type { BarberAdmin, Booking } from "../../../types/barber";
import { QUERY_KEYS } from "../../../constants/queryKeys";
import apiClient from "../../../lib/apiClient";

interface Props {
  staffUser: BarberAdmin;
}

export default function HistoryList({ staffUser }: Props) {
  const { data: history = [], isLoading } = useQuery<Booking[]>({
    queryKey: QUERY_KEYS.HISTORY(staffUser._id),
    queryFn: async () => {
      const res = await apiClient.get(
        `/bookings/barber/${staffUser._id}?status=completed`
      );
      return res.data.data || [];
    },
  });

  if (isLoading) {
    return (
      <div className="text-center py-20 text-2xl">Đang tải lịch sử...</div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="text-center py-20 bg-gray-900/50 rounded-3xl">
        <p className="text-3xl text-gray-400">Chưa có lịch nào hoàn thành</p>
        <p className="text-xl text-gray-500 mt-4">Cố lên anh ơi!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-4xl font-bold mb-8">Lịch sử cắt tóc của bạn</h2>
      <div className="grid gap-6">
        {history.map((b, i) => (
          <motion.div
            key={b._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-gray-900/70 border border-gray-800 rounded-3xl p-8 hover:border-green-500/50 transition"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <h3 className="text-2xl font-bold text-green-400 flex items-center gap-3">
                  <User className="w-7 h-7" /> {b.customer.name}
                </h3>
                <p className="text-lg mt-2 flex items-center gap-2">
                  <Scissors className="w-5 h-5" /> {b.service.name}
                </p>
                <p className="text-gray-400 mt-2 flex items-center gap-2">
                  <Calendar className="w-5 h-5" />{" "}
                  {new Date(b.date).toLocaleDateString("vi-VN")}
                  <Clock className="w-5 h-5 ml-4" /> {b.time}
                </p>
                {b.note && (
                  <p className="mt-3 text-sm text-gray-500 italic">
                    Ghi chú: {b.note}
                  </p>
                )}
              </div>
              <div className="bg-green-600/20 text-green-400 px-8 py-4 rounded-xl font-bold text-xl">
                Đã hoàn thành
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
