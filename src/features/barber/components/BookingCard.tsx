import { motion } from "framer-motion";
import { Clock, Scissors, CheckCircle, XCircle } from "lucide-react";

interface Props {
  booking: any;
  onUpdateStatus: (id: string, status: string) => void;
}

export default function BookingCard({ booking, onUpdateStatus }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-gray-900/80 border border-gray-800 rounded-3xl p-8 hover:border-orange-500/60 transition"
    >
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="flex-1">
          <h3 className="text-4xl font-bold text-orange-400 mb-3">
            {booking.customer.name}
          </h3>
          <div className="flex flex-wrap gap-6 text-lg">
            <span className="flex items-center gap-2">
              <Clock className="w-6 h-6 text-orange-500" />
              <strong>{booking.time}</strong>
            </span>
            <span className="flex items-center gap-2">
              <Scissors className="w-6 h-6 text-gray-400" />
              {booking.service.name}
            </span>
          </div>
          {booking.note && (
            <p className="mt-4 text-gray-300 bg-gray-800/50 px-6 py-3 rounded-xl inline-block">
              Ghi chú: {booking.note}
            </p>
          )}
        </div>

        <div className="flex gap-4">
          {booking.status === "pending" && (
            <>
              <button
                onClick={() => onUpdateStatus(booking._id, "accepted")}
                className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl font-bold flex items-center gap-2"
              >
                <CheckCircle className="w-5 h-5" /> Nhận
              </button>
              <button
                onClick={() => onUpdateStatus(booking._id, "rejected")}
                className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl font-bold flex items-center gap-2"
              >
                <XCircle className="w-5 h-5" /> Từ chối
              </button>
            </>
          )}
          {booking.status === "accepted" && (
            <button
              onClick={() => onUpdateStatus(booking._id, "completed")}
              className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl font-bold text-xl"
            >
              Hoàn thành
            </button>
          )}
          {booking.status === "completed" && (
            <span className="bg-green-600/20 text-green-400 px-8 py-4 rounded-xl font-bold">
              Đã hoàn thành
            </span>
          )}
          {booking.status === "rejected" && (
            <span className="bg-red-600/20 text-red-400 px-8 py-4 rounded-xl font-bold">
              Đã từ chối
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
