import { ArrowLeft, Edit, Eye, Plus, Search, Trash2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useBlogStore } from "../../store/useBlogStore";
import apiClient from "../../lib/apiClient";
import { QUERY_KEYS } from "../../constants/queryKeys";
import type { Blog } from "../../types/blog";
import CreateBlogModal from "../../features/blogs/components/CreateBlogModal";
import UpdateBlogModal from "../../features/blogs/components/UpdateBlogModal";
import DeleteBlogModal from "../../features/blogs/components/DeleteBlogModal";
import DetailBlogModal from "../../features/blogs/components/DetailBlogModal";
import { Link } from "react-router-dom";

export default function BlogsAdmin() {
  const { openCreate, search, setSearch, openEdit, openDelete, openDetail } =
    useBlogStore();

  const { data: blogs = [], isLoading } = useQuery<Blog[]>({
    queryKey: QUERY_KEYS.BLOGS,
    queryFn: async () => (await apiClient.get("/blogs")).data.data,
  });

  const filtered = blogs.filter((b) => {
    const title = b.title || "";
    const category = b.category || "";
    return (
      title.toLowerCase().includes(search.toLowerCase()) ||
      category.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <Link
          to="/admin/dashboard"
          className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 transition mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          Quay lại Dashboard
        </Link>
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
            Quản Lý Blog
          </h1>
          <button
            onClick={openCreate}
            className="bg-gradient-to-r from-orange-500 to-red-600 px-6 py-3 rounded-xl font-bold flex items-center gap-3 hover:scale-105 transition"
          >
            <Plus className="w-6 h-6" />
            Viết Bài Mới
          </button>
        </div>

        <div className="relative max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-6 py-4 bg-gray-900/50 border border-gray-700 rounded-xl focus:border-orange-500 outline-none transition"
          />
        </div>

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
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-gray-400">
                    Đang tải...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-gray-400">
                    Không tìm thấy bài viết
                  </td>
                </tr>
              ) : (
                filtered.map((blog) => (
                  <tr
                    key={blog._id}
                    className="border-b border-gray-800 hover:bg-white/5 transition"
                  >
                    <td className="p-6">
                      <p className="font-bold">{blog.title}</p>
                      <p className="text-sm text-gray-400 line-clamp-1">
                        {blog.excerpt}
                      </p>
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

                    <td className="p-6">
                      {(blog.views ?? 0).toLocaleString()}
                    </td>

                    <td className="p-6 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => openDetail(blog)}
                          aria-label="Xem"
                          className="p-3 bg-blue-500/20 hover:bg-blue-500/40 rounded-xl transition"
                        >
                          <Eye className="w-5 h-5" />
                        </button>

                        <button
                          onClick={() => openEdit(blog)}
                          aria-label="Sua"
                          className="p-3 bg-yellow-500/20 hover:bg-yellow-500/40 rounded-xl transition"
                        >
                          <Edit className="w-5 h-5" />
                        </button>

                        <button
                          onClick={() => openDelete(blog)}
                          aria-label="Xoa"
                          className="p-3 bg-red-500/20 hover:bg-red-500/40 rounded-xl transition"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <CreateBlogModal />
        <UpdateBlogModal />
        <DeleteBlogModal />
        <DetailBlogModal />
      </div>
    </div>
  );
}
