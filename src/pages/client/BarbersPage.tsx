import { Link } from "react-router-dom";
import { Scissors, Star, Calendar } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../../lib/apiClient";
import type { Barber } from "../../types/barber";

export default function BarbersPage() {
  const { data: barbers = [], isLoading } = useQuery<Barber[]>({
    queryKey: ["barbers"],
    queryFn: async () => {
      const res = await apiClient.get("/barber");
      return res.data.data;
    },
  });

  if (isLoading)
    return <div className="text-center py-20">Đang tải thợ cắt...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">
            Đội Ngũ Barber Chất Lượng Cao
          </h1>
          <p className="text-xl text-gray-600">Mỗi thợ cắt là một nghệ sĩ</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {barbers.map((barber) => (
            <Link
              key={barber._id}
              to={`/booking?barber=${barber._id}`}
              className="block group block"
            >
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-4">
                <div className="relative h-96 bg-gray-200">
                  <img
                    src={barber.avatar || "/placeholder.jpg"}
                    alt={barber.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-3xl font-bold">{barber.name}</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                      <span className="text-xl font-bold">
                        {barber.rating || 4.9}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <p className="text-gray-600 text-lg mb-6">
                    {barber.description ||
                      "Chuyên fade, undercut, skinfade đỉnh cao"}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2 text-orange-600 font-bold">
                      <Scissors className="w-6 h-6" />
                      Chuyên môn cao
                    </span>
                    <span className="bg-orange-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Đặt lịch ngay
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
