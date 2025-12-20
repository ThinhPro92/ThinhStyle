import { motion } from "framer-motion";
import { useBarberActions } from "../../hooks/useBarberActions";
import { useBarberStore } from "../../../../store/useBarberStore";

export default function DeleteConfirmModal() {
  const { isDeleteOpen, closeDelete, selectedBarber } = useBarberStore();
  const { update } = useBarberActions();

  if (!isDeleteOpen || !selectedBarber) return null;

  const handleDeactivate = () => {
    update.mutate({
      id: selectedBarber._id!,
      data: { status: "inactive" },
    });
  };

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
        className="bg-gradient-to-br from-gray-900 to-black border border-orange-500/50 rounded-2xl p-8 max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-2xl font-bold text-orange-400 mb-4">
          Ngừng hoạt động thợ
        </h3>

        <p className="text-gray-300 mb-8">
          Thợ{" "}
          <span className="font-bold text-orange-400">
            {selectedBarber.name}
          </span>{" "}
          đã có lịch đặt. Bạn chỉ có thể ngừng hoạt động, không thể xóa vĩnh
          viễn.
        </p>

        <div className="flex gap-4">
          <button
            onClick={handleDeactivate}
            className="flex-1 bg-orange-600 py-4 rounded-xl font-bold hover:bg-orange-700 transition"
          >
            Ngừng hoạt động
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
