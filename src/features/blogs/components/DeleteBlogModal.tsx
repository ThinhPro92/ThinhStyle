import { motion } from "framer-motion";
import { useBlogActions } from "../hooks/useBlogActions";
import { useBlogStore } from "../../../store/useBlogStore";

export default function DeleteBlogModal() {
  const { isDeleteOpen, closeDelete, selectedBlog } = useBlogStore();
  const { remove } = useBlogActions();

  if (!isDeleteOpen || !selectedBlog) return null;

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
          Xác nhận xóa bài viết
        </h3>
        <p className="text-gray-300 mb-8">
          Bạn có chắc chắn muốn xóa bài viết{" "}
          <span className="font-bold text-orange-400">
            "{selectedBlog.title}"
          </span>
          ?
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => remove.mutate(selectedBlog._id)}
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
