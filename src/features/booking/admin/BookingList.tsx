import { useQuery } from "@tanstack/react-query";
import { Clock, User, Scissors, Edit, Trash2 } from "lucide-react";
import { format } from "date-fns";
import apiClient from "../../../lib/apiClient";
import { QUERY_KEYS } from "../../../constants/queryKeys";
import type { Booking } from "../../../types/booking";
import { useBookingAdminStore } from "../../../store/useBookingAdminStore";

export default function BookingList() {
  const { openEdit, openDelete } = useBookingAdminStore();

  const { data: bookings = [], isLoading } = useQuery<Booking[]>({
    queryKey: QUERY_KEYS.BOOKINGS(),
    queryFn: async () => (await apiClient.get("/bookings")).data.data,
  });

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
          bookings.slice(0, 8).map((booking) => (
            <div
              key={booking._id}
              className="bg-gray-800/50 p-6 rounded-xl hover:bg-gray-800 transition group shadow-md"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <p className="font-bold text-xl flex items-center gap-2">
                    <User className="w-5 h-5 text-orange-400" />
                    {booking.customerName || "Khách lẻ"}
                  </p>
                  <p className="text-orange-400 flex items-center gap-2 mt-1">
                    <Scissors className="w-5 h-5" />
                    {booking.service?.name || "Dịch vụ không xác định"}
                  </p>

                  <p className="text-gray-400 text-sm mt-2">
                    Thợ:{" "}
                    <strong>
                      {booking.barber?.name || "Thợ không xác định"}
                    </strong>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold flex items-center gap-2 justify-end">
                    <Clock className="w-6 h-6" />
                    {booking.time || "--:--"}
                  </p>

                  <p className="text-gray-400">
                    {booking.date
                      ? format(new Date(booking.date), "dd/MM/yyyy")
                      : "--/--/----"}
                  </p>

                  <p className="text-sm text-gray-500">
                    Mã: {booking.bookingCode || "Không có mã"}
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-4 opacity-0 group-hover:opacity-100 transition">
                <button
                  onClick={() => openEdit(booking)}
                  className="p-2 bg-blue-500/20 hover:bg-blue-500/40 rounded-lg transition"
                >
                  {} <Edit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => openDelete(booking)}
                  className="p-2 bg-red-500/20 hover:bg-red-500/40 rounded-lg transition"
                >
                  {} <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
