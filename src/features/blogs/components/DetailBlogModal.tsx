import { X, Calendar, User, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { useBlogStore } from "../../../store/useBlogStore";

export default function DetailBlogModal() {
  const { isDetailOpen, closeDetail, selectedBlog } = useBlogStore();

  if (!isDetailOpen || !selectedBlog) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/90 backdrop-blur z-50 flex items-center justify-center p-4"
      onClick={closeDetail}
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="bg-white text-black rounded-3xl max-w-5xl w-full max-h-screen overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          {selectedBlog.image && (
            <img
              src={selectedBlog.image}
              alt={selectedBlog.title}
              className="w-full h-96 object-cover"
            />
          )}
          <button
            onClick={closeDetail}
            className="absolute top-4 right-4 p-3 bg-black/50 hover:bg-black/70 rounded-xl text-white"
          >
            {} <X className="w-7 h-7" />
          </button>
        </div>

        <div className="p-12">
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
            <span className="flex items-center gap-2">
              <User className="w-5 h-5" /> {selectedBlog.author}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-5 h-5" /> {selectedBlog.createdAt}
            </span>
            <span className="flex items-center gap-2">
              <Eye className="w-5 h-5" /> {selectedBlog.views} lượt xem
            </span>
          </div>

          <h1 className="text-5xl font-bold mb-8">{selectedBlog.title}</h1>
          <p className="text-xl text-gray-700 mb-12">{selectedBlog.excerpt}</p>

          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: selectedBlog.content }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
