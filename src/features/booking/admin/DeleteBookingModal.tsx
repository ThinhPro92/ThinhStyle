import { motion } from "framer-motion";
import { useBookingActions } from "../hooks/useBookingActions";
import { useBookingAdminStore } from "../../../store/useBookingAdminStore";
import { format } from "date-fns";

export default function DeleteBookingModal() {
  const { isDeleteOpen, closeDelete, selectedBooking } = useBookingAdminStore();
  const { remove } = useBookingActions();

  if (!isDeleteOpen || !selectedBooking) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/80 backdrop-blur flex items-center justify-center z-50 p-4"
      onClick={closeDelete}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="bg-gradient-to-br from-gray-900 to-black border border-red-500/50 rounded-2xl p-8 max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-2xl font-bold text-red-400 mb-4">
          Xác nhận xóa lịch
        </h3>
        <p className="text-gray-300 mb-8">
          Xóa lịch của{" "}
          <span className="font-bold text-orange-400">
            {selectedBooking.customerName}
          </span>{" "}
          lúc {selectedBooking.time} ngày{" "}
          {format(new Date(selectedBooking.date), "dd/MM/yyyy")}?
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => remove.mutate(selectedBooking._id)}
            className="flex-1 bg-red-600 py-4 rounded-xl font-bold hover:bg-red-700 transition"
          >
            Xóa ngay
          </button>
          <button
            onClick={closeDelete}
            className="flex-1 border border-gray-600 py-4 rounded-xl font-bold hover:bg-white/10 transition"
          >
            Hủy
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
