import { X, Phone, Star, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { useBarberStore } from "../../../../store/useBarberStore";
import type { BarberWithBookingCount } from "../../../../types/barber";

const days = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

export default function DetailBarberModal() {
  const { isDetailOpen, closeDetail, selectedBarber } = useBarberStore();

  if (!isDetailOpen || !selectedBarber) return null;

  // ✅ ÉP KIỂU 1 LẦN – ĐÚNG NGỮ NGHĨA
  const barber = selectedBarber as BarberWithBookingCount;

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
        className="bg-gradient-to-br from-gray-900 to-black border border-orange-500/50 rounded-2xl p-8 max-w-5xl w-full max-h-screen overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="flex justify-between items-start mb-8">
          <div className="flex gap-8">
            {barber.avatar ? (
              <img
                src={barber.avatar}
                className="w-44 h-44 rounded-full object-cover border-8 border-orange-500/30"
                alt={barber.name}
              />
            ) : (
              <div className="w-44 h-44 rounded-full bg-gray-800 flex items-center justify-center text-6xl">
                {barber.name.charAt(0)}
              </div>
            )}

            <div>
              <h2 className="text-4xl font-bold mb-2">{barber.name}</h2>

              <div className="flex items-center gap-4 text-lg">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <span>{barber.rating ?? 0}</span>
                </div>

                <span
                  className={`px-4 py-1 rounded-full text-sm ${
                    barber.status === "active"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {barber.status === "active" ? "Đang làm việc" : "Nghỉ việc"}
                </span>
              </div>

              <div className="flex items-center gap-4 mt-4 text-gray-300">
                <Phone className="w-5 h-5" />
                <span>{barber.phone}</span>
              </div>
            </div>
          </div>

          <button
            onClick={closeDetail}
            aria-label="X"
            className="p-3 hover:bg-white/10 rounded-xl"
          >
            <X className="w-7 h-7" />
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <Calendar className="w-6 h-6 text-orange-500" />
              Giờ làm việc
            </h3>

            <div className="grid grid-cols-7 gap-3">
              {Object.keys(barber.workingHours).map((day) => {
                const workDay = barber.workingHours[day];

                return (
                  <div
                    key={day}
                    className={`p-3 rounded-xl text-center ${
                      workDay.isWorking
                        ? "bg-orange-500/20 border border-orange-500"
                        : "bg-gray-800"
                    }`}
                  >
                    <div className="text-sm font-bold">{days[+day]}</div>
                    {workDay.isWorking ? (
                      <div className="text-xs mt-1">
                        {workDay.start} - {workDay.end}
                      </div>
                    ) : (
                      <div className="text-xs text-gray-500">Nghỉ</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4">Thông tin lịch đặt</h3>

            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
              {typeof barber.bookingCount === "number" ? (
                <p className="text-lg">
                  Tổng số lịch đã đặt:{" "}
                  <span className="font-bold text-orange-400">
                    {barber.bookingCount}
                  </span>
                </p>
              ) : (
                <p className="text-gray-400 text-center">
                  API hiện tại chưa hỗ trợ dữ liệu lịch theo thợ
                </p>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
