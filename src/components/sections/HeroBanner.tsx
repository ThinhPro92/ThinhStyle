import { useState, useEffect } from "react";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";

const banners = [
  {
    title: "Cắt Tóc Nam Cao Cấp",
    subtitle: "Phong cách hiện đại – Đội ngũ thợ tay nghề cao",
    highlight: "Giảm 20% cho khách mới",
    bg: "bg-[url('/banner1.jpg')]", // bạn thay ảnh thật sau
  },
  {
    title: "Thay Đổi Phong Cách",
    subtitle: "Từ cổ điển đến hiện đại – Chúng tôi làm được tất cả",
    highlight: "Combo Cắt + Gội + Massage chỉ 250k",
    bg: "bg-[url('/banner2.jpg')]",
  },
  {
    title: "Nơi Tóc Đẹp Bắt Đầu",
    subtitle: "Hơn 5000+ khách hàng hài lòng mỗi tháng",
    highlight: "Đặt lịch ngay – Cắt là sướng!",
    bg: "bg-[url('/banner3.jpg')]",
  },
];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);

  // Auto slide mỗi 5s
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % banners.length);
  const prev = () =>
    setCurrent((prev) => (prev - 1 + banners.length) % banners.length);

  return (
    <div className="relative h-screen min-h-[600px] overflow-hidden">
      {banners.map((banner, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: i === current ? 1 : 0 }}
          transition={{ duration: 0.8 }}
          className={`absolute inset-0 ${banner.bg} bg-cover bg-center`}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </motion.div>
      ))}

      <div className="relative h-full flex items-center justify-center text-center text-white px-4">
        <motion.div
          key={current}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="max-w-4xl"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            {banners[current].title}
          </h1>
          <p className="text-xl md:text-3xl mb-6 text-text-secondary">
            {banners[current].subtitle}
          </p>
          <p className="text-2xl md:text-4xl font-bold text-accent mb-8">
            {banners[current].highlight}
          </p>
          <Button size="lg" className="text-lg px-12 py-7">
            Đặt lịch ngay hôm nay
          </Button>
        </motion.div>
      </div>

      {/* Nút lướt thủ công */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 p-3 rounded-full hover:bg-opacity-70 transition"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 p-3 rounded-full hover:bg-opacity-70 transition"
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition ${
              i === current ? "bg-accent w-10" : "bg-white bg-opacity-50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
