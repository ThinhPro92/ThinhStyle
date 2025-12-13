import { useQuery } from "@tanstack/react-query";
import apiClient from "../../lib/apiClient";
import type { Barber } from "../../types/barber";

export default function TopBarbers() {
  const { data: barbers, isLoading } = useQuery<Barber[]>({
    queryKey: ["barbers"],
    queryFn: async () => {
      const res = await apiClient.get("/barbers");
      return res.data.data;
    },
  });

  if (isLoading) return <div>Đang tải...</div>;
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">Top Thợ Cắt Tóc</h2>
        <p className="text-center text-text-secondary mb-12">
          Đội ngũ thợ lành nghề nhất
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {barbers?.slice(0, 4).map((barber) => (
            <div key={barber.name} className="text-center group">
              <div className="w-48 h-48 mx-auto overflow-hidden rounded-full mb-4">
                <img
                  src={barber.avatar}
                  alt={barber.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition"
                />
              </div>
              <h3 className="font-semibold text-lg">{barber.name}</h3>
              <p className="text-accent">⭐ {barber.rating}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
