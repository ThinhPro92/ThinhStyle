import { X, Calendar, Clock, Phone, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useBarberStore } from "../../../../store/useBarberStore";
import apiClient from "../../../../lib/apiClient";
import type { Booking } from "../../../../types/barber";
import { QUERY_KEYS } from "../../../../constants/queryKeys";

const days = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

export default function DetailBarberModal() {
  const { isDetailOpen, closeDetail, selectedBarber } = useBarberStore();
  const { data: bookings = [] } = useQuery<Booking[]>({
    queryKey: QUERY_KEYS.BOOKINGS(selectedBarber?._id || ""),
    queryFn: async () => {
      const res = await apiClient.get(
        `/bookings/barber/${selectedBarber?._id}`
      );
      return res.data.data;
    },
    enabled: !!selectedBarber?._id,
  });
  if (!isDetailOpen || !selectedBarber) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/80 backdrop-blur flex items-center justify-center z-50 p-4"
      onClick={closeDetail}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="bg-gradient-to-br from-gray-900 to-black border border-orange-500/50 rounded-2xl p-8 max-w-6xl w-full max-h-screen overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-8">
          <div className="flex gap-8">
            <img
              src={selectedBarber.avatar}
              className="w-48 h-48 rounded-full object-cover border-8 border-orange-500/30"
              alt="hehe"
            />
            <div>
              <h2 className="text-5xl font-bold mb-2">{selectedBarber.name}</h2>
              <div className="flex items-center gap-4 text-xl">
                <div className="flex items-center gap-2">
                  <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                  <span>{selectedBarber.rating || 0}</span>
                </div>
                <span
                  className={`px-4 py-2 rounded-full ${
                    selectedBarber.status === "active"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {selectedBarber.status === "active"
                    ? "Đang làm việc"
                    : "Nghỉ việc"}
                </span>
              </div>
              <p className="text-gray-300 mt-4 text-lg">
                {selectedBarber.description}
              </p>
              <div className="flex gap-6 mt-6">
                <span className="flex items-center gap-2">
                  <Phone className="w-5 h-5" /> {selectedBarber.phone}
                </span>
                <span>Hoa hồng: {selectedBarber.commission}%</span>
              </div>
            </div>
          </div>
          <button
            onClick={closeDetail}
            className="p-4 hover:bg-white/10 rounded-xl"
          >
            {" "}
            {}
            <X className="w-8 h-8" />
          </button>
        </div>
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <Calendar className="w-7 h-7 text-orange-500" /> Giờ làm việc
            </h3>
            <div className="grid grid-cols-7 gap-3">
              {Object.keys(selectedBarber.workingHours).map((day) => (
                <div
                  key={day}
                  className={`p-4 rounded-xl text-center ${
                    selectedBarber.workingHours[day].isWorking
                      ? "bg-orange-500/20 border border-orange-500"
                      : "bg-gray-800"
                  }`}
                >
                  <div className="text-sm font-bold">{days[+day]}</div>
                  {selectedBarber.workingHours[day].isWorking ? (
                    <div className="text-xs mt-1">
                      {selectedBarber.workingHours[day].start} -{" "}
                      {selectedBarber.workingHours[day].end}
                    </div>
                  ) : (
                    <div className="text-xs text-gray-500">Nghỉ</div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <Clock className="w-7 h-7 text-orange-500" /> Lịch đặt hôm nay
            </h3>
            <div className="space-y-4">
              {bookings.length === 0 ? (
                <p className="text-center text-gray-400 py-10">
                  Chưa có lịch đặt nào
                </p>
              ) : (
                bookings.map((b: Booking) => (
                  <div
                    key={b._id}
                    className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-orange-500/50 transition"
                  >
                    <div className="flex justify-between">
                      <div>
                        <p className="text-xl font-bold">{b.customer.name}</p>
                        <p className="text-orange-400">{b.service.name}</p>
                      </div>
                      <span className="text-2xl font-bold text-orange-400">
                        {b.time}
                      </span>
                    </div>
                    {b.note && (
                      <p className="text-sm text-gray-400 mt-2">
                        Ghi chú: {b.note}
                      </p>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
