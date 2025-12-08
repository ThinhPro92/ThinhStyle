import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, Edit, Trash2, Eye } from "lucide-react";

const blogs = [
  {
    id: 1,
    title: "Top 7 Kiểu Tóc Nam Đẹp Nhất 2025",
    excerpt: "Từ fade cổ điển đến skinfade hiện đại...",
    author: "Thịnh Barber",
    date: "15/03/2025",
    readTime: "5 phút",
    category: "Xu hướng",
    featured: true,
    status: "published",
    views: 2847,
  },
  {
    id: 2,
    title: "Cách Chăm Sóc Tóc Sau Khi Cắt",
    excerpt: "Cắt đẹp rồi mà không biết chăm sóc thì phí...",
    author: "Nam Master",
    date: "10/03/2025",
    readTime: "7 phút",
    category: "Mẹo vặt",
    featured: false,
    status: "published",
    views: 1923,
  },
  {
    id: 3,
    title: "Tại Sao Nên Cắt Tóc Tại ThinhStyle?",
    excerpt: "Không chỉ là cắt tóc – mà là trải nghiệm...",
    author: "ThinhStyle Team",
    date: "05/03/2025",
    readTime: "6 phút",
    category: "Giới thiệu",
    featured: false,
    status: "draft",
    views: 0,
  },
];

export default function BlogsAdmin() {
  const [search, setSearch] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const filtered = blogs.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
            Quản Lý Blog
          </h1>
          <button
            onClick={() => setIsCreateOpen(true)}
            className="bg-gradient-to-r from-orange-500 to-red-600 px-6 py-3 rounded-xl font-bold flex items-center gap-3 hover:scale-105 transition"
          >
            <Plus className="w-6 h-6" />
            Viết Bài Mới
          </button>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm bài viết..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-6 py-4 bg-gray-900/50 border border-gray-700 rounded-xl focus:border-orange-500 outline-none transition"
          />
        </div>

        {/* Blog Table */}
        <div className="bg-gray-900/50 backdrop-blur border border-gray-800 rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-800/50 border-b border-gray-700">
              <tr>
                <th className="text-left p-6">Tiêu đề</th>
                <th className="text-left p-6">Danh mục</th>
                <th className="text-left p-6">Tác giả</th>
                <th className="text-left p-6">Trạng thái</th>
                <th className="text-left p-6">Lượt xem</th>
                <th className="text-right p-6">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((blog) => (
                <motion.tr
                  key={blog.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-b border-gray-800 hover:bg-white/5 transition"
                >
                  <td className="p-6">
                    <div>
                      <p className="font-bold">{blog.title}</p>
                      <p className="text-sm text-gray-400 line-clamp-1">
                        {blog.excerpt}
                      </p>
                    </div>
                  </td>
                  <td className="p-6">
                    <span className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-sm">
                      {blog.category}
                    </span>
                  </td>
                  <td className="p-6">{blog.author}</td>
                  <td className="p-6">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        blog.status === "published"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {blog.status === "published" ? "Đã đăng" : "Bản nháp"}
                    </span>
                  </td>
                  <td className="p-6">{blog.views.toLocaleString()}</td>
                  <td className="p-6 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-3 bg-blue-500/20 hover:bg-blue-500/40 rounded-xl">
                        <Eye className="w-5 h-5" />
                      </button>
                      <button className="p-3 bg-yellow-500/20 hover:bg-yellow-500/40 rounded-xl">
                        <Edit className="w-5 h-5" />
                      </button>
                      <button className="p-3 bg-red-500/20 hover:bg-red-500/40 rounded-xl">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Viết Bài */}
      <AnimatePresence>
        {isCreateOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur flex items-center justify-center z-50 p-4"
            onClick={() => setIsCreateOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-gradient-to-br from-gray-900 to-black border border-orange-500/50 rounded-2xl p-8 max-w-4xl w-full max-h-screen overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                Viết Bài Mới
              </h2>
              <div className="space-y-6">
                <input
                  placeholder="Tiêu đề bài viết"
                  className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-orange-500 outline-none"
                />
                <input
                  placeholder="Danh mục"
                  className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-orange-500 outline-none"
                />
                <textarea
                  placeholder="Nội dung bài viết..."
                  rows={15}
                  className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-orange-500 outline-none"
                />
                <div className="flex gap-4">
                  <button className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 py-5 rounded-xl font-bold text-xl hover:scale-105 transition">
                    Đăng Bài
                  </button>
                  <button
                    onClick={() => setIsCreateOpen(false)}
                    className="px-8 py-5 border border-gray-600 rounded-xl hover:bg-white/10 transition"
                  >
                    Hủy
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
