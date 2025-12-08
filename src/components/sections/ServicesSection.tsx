import { useQuery } from "@tanstack/react-query";
import { Clock } from "lucide-react";
import { Link } from "react-router-dom";
import apiClient from "../../lib/apiClient";

export default function ServicesSection() {
  const { data: services = [] } = useQuery({
    queryKey: ["services-home"],
    queryFn: async () => {
      const res = await apiClient.get("/services");
      return res.data.data.filter((s: any) => s.isActive).slice(0, 6);
    },
  });

  return (
    <section className="py-20 bg-gradient-to-b from-white to-slate-50 dark:from-gray-950 dark:to-black">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
            Dịch Vụ Nổi Bật
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Chọn kiểu cắt phù hợp với bạn
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service: any) => (
            <Link to="/services" key={service._id} className="group block">
              <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-2">
                <div className="h-48 bg-gradient-to-br from-orange-400 to-red-500 relative overflow-hidden">
                  {service.image ? (
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white text-6xl opacity-30">
                      Scissors
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{service.name}</h3>
                  <div className="flex items-center gap-2 text-orange-500 mb-3">
                    <Clock className="w-5 h-5" />
                    <span>{service.duration} phút</span>
                  </div>
                  <p className="text-3xl font-bold text-orange-600">
                    {service.price.toLocaleString()}đ
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/services"
            className="inline-block bg-gradient-to-r from-orange-500 to-red-600 text-white px-10 py-4 rounded-full text-xl font-bold hover:scale-105 transition shadow-lg"
          >
            Xem tất cả dịch vụ →
          </Link>
        </div>
      </div>
    </section>
  );
}
