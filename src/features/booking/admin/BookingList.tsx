import { useQuery } from "@tanstack/react-query";
import { Clock, User, Scissors } from "lucide-react";
import apiClient from "../../../lib/apiClient";

export default function BookingList() {
  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["bookings"],
    queryFn: () => apiClient.get("/bookings").then((r) => r.data.data),
  });

  // Nếu đang tải
  if (isLoading) {
    return (
      <div className="bg-gray-900/50 backdrop-blur border border-gray-800 rounded-2xl p-6">
        <h3 className="text-2xl font-bold mb-6">Lịch đặt gần nhất</h3>
        <div className="text-center py-10">
          <div className="animate-spin w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full mx-auto" />
          <p className="text-gray-400 mt-4">Đang tải lịch...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900/50 backdrop-blur border border-gray-800 rounded-2xl p-6">
      <h3 className="text-2xl font-bold mb-6">Lịch đặt gần nhất</h3>
      <div className="space-y-4">
        {bookings.length === 0 ? (
          <p className="text-center text-gray-400 py-10">
            Chưa có lịch đặt nào
          </p>
        ) : (
          bookings.slice(0, 8).map((b: any) => (
            <div
              key={b._id}
              className="bg-gray-800/50 p-6 rounded-xl hover:bg-gray-800 transition"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold text-xl flex items-center gap-2">
                    <User className="w-5 h-5 text-orange-400" />
                    {b.customerName || "Khách lẻ"}
                  </p>
                  <p className="text-orange-400 flex items-center gap-2 mt-1">
                    <Scissors className="w-5 h-5" />
                    {b.serviceName || "Dịch vụ chưa xác định"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold flex items-center gap-2 justify-end">
                    <Clock className="w-6 h-6" />
                    {b.time}
                  </p>
                  <p className="text-gray-400">{b.date}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
