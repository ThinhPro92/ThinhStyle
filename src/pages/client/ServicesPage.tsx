import { useQuery } from "@tanstack/react-query";
import { Clock, Star, Scissors } from "lucide-react";
import { motion } from "framer-motion";
import apiClient from "../../lib/apiClient";
import { Link } from "react-router-dom";

interface Service {
  _id: string;
  name: string;
  price: number;
  duration: number;
  description?: string;
  image?: string;
  isActive: boolean;
}

export default function ServicesPage() {
  const { data: services = [], isLoading } = useQuery<Service[]>({
    queryKey: ["services"],
    queryFn: async () => {
      const res = await apiClient.get("/services");
      return res.data.data.filter((s: Service) => s.isActive);
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-gray-950 dark:to-black py-20">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
            Dịch Vụ Cắt Tóc Chuyên Nghiệp
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Đa dạng kiểu cắt – Giá hợp lý – Thợ tay nghề cao – Cắt là sướng!
          </p>
        </motion.div>

        {isLoading ? (
          <div className="text-center py-20">
            <div className="animate-spin w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full mx-auto" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-white dark:bg-gray-900 rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 hover:-translate-y-3"
              >
                {service.image ? (
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-64 object-cover"
                  />
                ) : (
                  <div className="w-full h-64 bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                    <Scissors className="w-24 h-24 text-white/20" />
                  </div>
                )}

                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-3">{service.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3">
                    {service.description ||
                      "Dịch vụ chất lượng cao với thợ tay nghề giỏi"}
                  </p>

                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2 text-orange-500">
                      <Clock className="w-5 h-5" />
                      <span className="font-bold">{service.duration} phút</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                      <span className="font-bold">4.9</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-3xl font-bold text-orange-600">
                      {service.price.toLocaleString()}đ
                    </p>
                    <button className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-4 rounded-3 rounded-xl font-bold hover:scale-110 transition shadow-lg">
                      <Link to="/booking">Đặt ngay</Link>
                    </button>
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition pointer-events-none" />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
