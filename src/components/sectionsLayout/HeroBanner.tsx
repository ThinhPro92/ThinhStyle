import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

type BannerVariant = "left" | "center" | "box";

const banners: {
  variant: BannerVariant;
  title: string;
  subtitle: string;
  highlight: string;
  image: string;
}[] = [
  {
    variant: "left",
    title: "Cắt Tóc Nam Cao Cấp",
    subtitle: "Phong cách hiện đại – Đội ngũ thợ tay nghề cao",
    highlight: "Giảm 20% cho khách mới",
    image: "/1.png",
  },
  {
    variant: "center",
    title: "Thay Đổi Phong Cách",
    subtitle: "Từ cổ điển đến hiện đại – Chúng tôi làm được tất cả",
    highlight: "Combo Cắt + Gội + Massage chỉ 250k",
    image: "/2.png",
  },
  {
    variant: "box",
    title: "Nơi Tóc Đẹp Bắt Đầu",
    subtitle: "Hơn 5000+ khách hàng hài lòng mỗi tháng",
    highlight: "Đặt lịch ngay – Cắt là sướng!",
    image: "/3.png",
  },
];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const banner = banners[current];

  useEffect(() => {
    const timer = setInterval(
      () => setCurrent((p) => (p + 1) % banners.length),
      6000
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[85vh] min-h-[620px] overflow-hidden bg-black">
      <AnimatePresence>
        <motion.img
          key={current}
          src={banner.image}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 w-full h-full object-cover object-center"
          alt=""
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20" />

      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-6 max-w-7xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className={`
                text-white
                ${
                  banner.variant === "center"
                    ? "mx-auto text-center max-w-3xl"
                    : banner.variant === "box"
                    ? "ml-auto max-w-xl"
                    : "max-w-2xl"
                }
              `}
            >
              {banner.variant === "box" ? (
                <div className="backdrop-blur-xl bg-black/40 p-10 rounded-2xl shadow-2xl">
                  <HeroContent banner={banner} />
                </div>
              ) : (
                <HeroContent banner={banner} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <button
        onClick={() =>
          setCurrent((p) => (p - 1 + banners.length) % banners.length)
        }
        aria-label="ChevronLeft"
        className="absolute left-6 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full hover:bg-black/70 z-20"
      >
        <ChevronLeft className="w-7 h-7 text-white" />
      </button>

      <button
        onClick={() => setCurrent((p) => (p + 1) % banners.length)}
        aria-label="ChevronRight"
        className="absolute right-6 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full hover:bg-black/70 z-20"
      >
        <ChevronRight className="w-7 h-7 text-white" />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label="Mid"
            className={`h-2 rounded-full transition-all ${
              i === current ? "w-10 bg-amber-400" : "w-3 bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

/* ===== SUB COMPONENT ===== */
function HeroContent({ banner }: { banner: (typeof banners)[0] }) {
  return (
    <>
      <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
        {banner.title}
      </h1>
      <p className="text-xl text-white/80 mb-4">{banner.subtitle}</p>
      <p className="text-2xl font-semibold text-amber-400 mb-8">
        {banner.highlight}
      </p>
      <Button
        size="lg"
        className="px-10 py-6 text-lg rounded-full bg-amber-500 hover:bg-amber-600 shadow-xl"
      >
        <Link to="/booking"> Đặt lịch ngay</Link>
      </Button>
    </>
  );
}
