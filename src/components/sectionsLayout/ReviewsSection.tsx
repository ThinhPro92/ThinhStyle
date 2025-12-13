import { Star } from "lucide-react";
import { motion } from "framer-motion";

const reviews = [
  {
    name: "Nguyễn Văn A",
    rating: 5,
    comment: "Cắt đẹp, thợ nhiệt tình, giá hợp lý. Sẽ quay lại!",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    name: "Trần Thị B",
    rating: 5,
    comment: "Thợ rất chuyên nghiệp, không gian sạch sẽ, cực kỳ hài lòng!",
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    name: "Lê Văn C",
    rating: 5,
    comment: "Fade cắt đỉnh cao, anh em barber thân thiện, 10 điểm!",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
  {
    name: "Phạm Minh D",
    rating: 5,
    comment: "Đặt lịch online tiện lợi, không phải chờ. Rất recommend!",
    avatar: "https://i.pravatar.cc/150?img=4",
  },
];

export default function ReviewsSection() {
  return (
    <section className="py-20 bg-gradient-to-r from-orange-500 to-red-600 text-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Khách Hàng Nói Gì Về Chúng Tôi
          </h2>
          <div className="flex justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-8 h-8 fill-yellow-400 text-yellow-400"
              />
            ))}
            <span className="text-2xl font-bold ml-3">4.9/5</span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/10 backdrop-blur rounded-3xl p-8 hover:bg-white/20 transition"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-16 h-16 rounded-full border-4 border-white/30"
                />
                <div>
                  <h4 className="font-bold text-lg">{review.name}</h4>
                  <div className="flex gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-lg italic">"{review.comment}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
