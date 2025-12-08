// src/components/sections/BlogsSection.tsx
import { motion } from "framer-motion";
import { Calendar, Clock, User } from "lucide-react";
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
      "https://images.unsplash.com/photo-1620332372374-f108c53c2e4c?w=800&q=80",
    category: "Xu hướng",
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
      "https://images.unsplash.com/photo-1599351431202-968d8785285e?w=800&q=80",
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
      "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=800&q=80",
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
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    category: "Tư vấn",
  },
];

export default function BlogsSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-slate-50 dark:from-gray-950 dark:to-black">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
            Blog Tóc Nam – Cập Nhật Xu Hướng Mới Nhất
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Chia sẻ kinh nghiệm, mẹo hay, xu hướng tóc nam từ đội ngũ barber
            chuyên nghiệp
          </p>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {blogs.map((blog, index) => (
            <motion.article
              key={blog.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-white dark:bg-gray-900 rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 hover:-translate-y-4"
            >
              <Link to={`/blog/${blog.id}`} className="block">
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                  {/* Category Badge */}
                  <span className="absolute top-4 left-4 bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                    {blog.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-orange-500 transition">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-6">
                    {blog.excerpt}
                  </p>

                  {/* Meta */}
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
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {blog.readTime}
                    </span>
                  </div>
                </div>

                {/* Hover Arrow */}
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link
            to="/blog"
            className="inline-block bg-gradient-to-r from-orange-500 to-red-600 text-white px-12 py-5 rounded-full text-xl font-bold hover:scale-105 transition shadow-2xl"
          >
            Xem tất cả bài viết →
          </Link>
        </div>
      </div>
    </section>
  );
}
