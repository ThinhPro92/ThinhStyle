import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Calendar, Clock, User, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const blogs = [
  {
    id: 1,
    title: "Top 7 Kiểu Tóc Nam Đẹp Nhất 2025 – Đừng Để Lỗi Mốt!",
    excerpt:
      "Từ fade cổ điển đến skinfade hiện đại, đây là những kiểu tóc đang làm mưa làm gió tại ThinhStyle...",
    author: "Thịnh Barber",
    date: "15/03/2025",
    readTime: "5 phút đọc",
    image:
      "https://images.unsplash.com/photo-1620332372374-f108c53c2e4c?w=1200&q=80",
    category: "Xu hướng",
    featured: true,
  },
  {
    id: 2,
    title: "Cách Chăm Sóc Tóc Sau Khi Cắt – Bí Quyết Giữ Lâu Đẹp",
    excerpt:
      "Cắt đẹp rồi mà không biết chăm sóc thì phí cả công sức! Đây là những mẹo nhỏ nhưng cực kỳ hiệu quả...",
    author: "Nam Master",
    date: "10/03/2025",
    readTime: "7 phút đọc",
    image:
      "https://images.unsplash.com/photo-1599351431202-968d8785285e?w=1200&q=80",
    category: "Mẹo vặt",
  },
  {
    id: 3,
    title: "Tại Sao Nên Cắt Tóc Tại ThinhStyle? 5 Lý Do Không Thể Bỏ Qua",
    excerpt:
      "Không chỉ là cắt tóc – mà là trải nghiệm đẳng cấp với đội ngũ barber chuyên nghiệp và không gian sang trọng...",
    author: "ThinhStyle Team",
    date: "05/03/2025",
    readTime: "6 phút đọc",
    image:
      "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=1200&q=80",
    category: "Giới thiệu",
  },
  {
    id: 4,
    title: "Hướng Dẫn Chọn Kiểu Tóc Theo Khuôn Mặt – Chuẩn Không Cần Chỉnh!",
    excerpt:
      "Mặt vuông, mặt dài, mặt tròn – kiểu nào hợp với bạn? Đọc ngay để không chọn sai kiểu tóc nữa...",
    author: "Quốc Style",
    date: "01/03/2025",
    readTime: "8 phút đọc",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80",
    category: "Tư vấn",
  },
  {
    id: 5,
    title: "Skin Fade Là Gì? Vì Sao Ai Cũng Mê Kiểu Này?",
    excerpt:
      "Skin fade – kiểu tóc đang thống trị giới trẻ Việt Nam. Cùng tìm hiểu kỹ hơn về kiểu tóc này...",
    author: "Thịnh Barber",
    date: "28/02/2025",
    readTime: "6 phút đọc",
    image:
      "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=1200&q=80",
    category: "Xu hướng",
  },
  {
    id: 6,
    title: "Top 5 Sản Phẩm Wax Tóc Nam Tốt Nhất 2025",
    excerpt:
      "Bạn đang tìm wax tạo kiểu tốt, giữ nếp lâu? Đây là 5 sản phẩm được barber ThinhStyle tin dùng...",
    author: "Nam Master",
    date: "25/02/2025",
    readTime: "9 phút đọc",
    image:
      "https://images.unsplash.com/photo-1608248597784-8242b5b1f64e?w=1200&q=80",
    category: "Sản phẩm",
  },
];

const categories = [
  "Tất cả",
  "Xu hướng",
  "Mẹo vặt",
  "Tư vấn",
  "Sản phẩm",
  "Giới thiệu",
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [searchQuery, setSearchQuery] = useState("");

  const featuredBlog = blogs.find((b) => b.featured);
  const filteredBlogs = blogs.filter((blog) => {
    const matchesCategory =
      selectedCategory === "Tất cả" || blog.category === selectedCategory;
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch && !blog.featured;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-gray-950 dark:to-black py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
            Blog Tóc Nam ThinhStyle
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Cập nhật xu hướng, mẹo hay, kiến thức tóc nam từ đội ngũ barber
            chuyên nghiệp
          </p>
        </motion.div>

        {featuredBlog && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-20"
          >
            <Link to={`/blog/${featuredBlog.id}`}>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl group cursor-pointer">
                <img
                  src={featuredBlog.image}
                  alt={featuredBlog.title}
                  className="w-full h-96 md:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
                  <span className="bg-orange-500 px-4 py-2 rounded-full text-sm font-bold mb-4 inline-block">
                    {featuredBlog.category} • NỔI BẬT
                  </span>
                  <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                    {featuredBlog.title}
                  </h2>
                  <p className="text-xl text-gray-200 mb-6 line-clamp-2">
                    {featuredBlog.excerpt}
                  </p>
                  <div className="flex items-center gap-6 text-sm">
                    <span className="flex items-center gap-2">
                      <User className="w-5 h-5" /> {featuredBlog.author}
                    </span>
                    <span className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" /> {featuredBlog.date}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock className="w-5 h-5" /> {featuredBlog.readTime}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="flex gap-3 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-3 rounded-full font-medium transition ${
                    selectedCategory === cat
                      ? "bg-orange-500 text-white shadow-lg"
                      : "bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm bài viết..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-6 py-4 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-full focus:border-orange-500 outline-none w-full md:w-96 transition"
              />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((blog, index) => (
            <motion.article
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white dark:bg-gray-900 rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 hover:-translate-y-2"
            >
              <Link to={`/blog/${blog.id}`}>
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <span className="absolute bottom-4 left-4 bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                    {blog.category}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-orange-500 transition">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4">
                    {blog.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {blog.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {blog.date}
                      </span>
                    </div>
                    <span className="flex items-center gap-1 text-orange-500 font-medium">
                      Đọc thêm
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <div className="text-center mt-16">
          <button className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-12 py-5 rounded-full text-xl font-bold hover:scale-105 transition shadow-2xl">
            Xem thêm bài viết
          </button>
        </div>
      </div>
    </div>
  );
}
