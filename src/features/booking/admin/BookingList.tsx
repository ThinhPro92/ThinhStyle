import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Clock, User, Scissors, Edit, Trash2, Search } from "lucide-react";
import { format } from "date-fns";
import apiClient from "../../../lib/apiClient";
import { QUERY_KEYS } from "../../../constants/queryKeys";
import type { Booking } from "../../../types/booking";
import type { Barber } from "../../../types/barber";
import type { Service } from "../../../types/service";
import { useBookingAdminStore } from "../../../store/useBookingAdminStore";
import { Input } from "../../../components/ui/input";

export default function BookingList() {
  const { openEdit, openDelete } = useBookingAdminStore();
  const [search, setSearch] = useState("");

  const { data: bookings = [], isLoading: loadingBookings } = useQuery<
    Booking[]
  >({
    queryKey: QUERY_KEYS.BOOKINGS(),
    queryFn: async () => (await apiClient.get("/bookings")).data.data,
    refetchInterval: 5000,
  });

  const { data: barbers = [] } = useQuery<Barber[]>({
    queryKey: QUERY_KEYS.BARBERS,
    queryFn: async () => (await apiClient.get("/barbers")).data.data,
  });

  const { data: services = [] } = useQuery<Service[]>({
    queryKey: QUERY_KEYS.SERVICES,
    queryFn: async () => (await apiClient.get("/services")).data.data,
  });

  const filteredBookings = bookings.filter((booking) =>
    [booking.customerName, booking.customerPhone]
      .filter(Boolean)
      .some((field) =>
        field?.toString().toLowerCase().includes(search.toLowerCase())
      )
  );

  if (loadingBookings) {
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
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold">Lịch đặt gần nhất</h3>
        <div className="relative w-64">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Tìm tên, SĐT..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-gray-800 border-gray-700 focus:border-orange-500"
          />
        </div>
      </div>

      <div className="space-y-4">
        {filteredBookings.length === 0 ? (
          <p className="text-center text-gray-400 py-10">
            Không tìm thấy lịch nào
          </p>
        ) : (
          filteredBookings.slice(0, 8).map((booking) => {
            const barber = barbers.find((b) => b._id === booking.barberId);
            const serviceNames =
              booking.serviceIds
                ?.map(
                  (id) =>
                    services.find((s) => s._id === id)?.name ||
                    "Dịch vụ không xác định"
                )
                .join(", ") || "Dịch vụ không xác định";

            return (
              <div
                key={booking._id}
                className="bg-gray-800/50 p-6 rounded-xl hover:bg-gray-800 transition group shadow-md"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <p className="font-bold text-xl flex items-center gap-2">
                      <User className="w-5 h-5 text-orange-400" />
                      {booking.customerName || "Khách lẻ"}
                      <span className="text-gray-400 ml-2">
                        ({booking.customerPhone || "Không có SĐT"})
                      </span>
                    </p>

                    <p className="text-orange-400 flex items-center gap-2 mt-1">
                      <Scissors className="w-5 h-5" />
                      {serviceNames}
                    </p>

                    <p className="text-gray-400 text-sm mt-2">
                      Thợ:{" "}
                      <strong>{barber?.name || "Thợ không xác định"}</strong>
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      Mã:{" "}
                      <strong>
                        {booking.bookingCode
                          ? booking.bookingCode
                          : booking.type === "online"
                          ? "Online (chưa có mã)"
                          : "Walk-in (chưa có mã)"}
                      </strong>
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-2xl font-bold flex items-center gap-2 justify-end">
                      <Clock className="w-6 h-6" />
                      {booking.startTime || "--:--"} {/* ← Dùng startTime */}
                    </p>

                    <p className="text-gray-400">
                      {booking.date
                        ? format(new Date(booking.date), "dd/MM/yyyy")
                        : "--/--/----"}
                    </p>

                    <p
                      className={`mt-2 px-4 py-2 rounded-full text-sm font-medium ${
                        booking.status === "pending"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : booking.status === "confirmed"
                          ? "bg-green-500/20 text-green-400"
                          : booking.status === "cancelled"
                          ? "bg-red-500/20 text-red-400"
                          : booking.status === "completed"
                          ? "bg-blue-500/20 text-blue-400"
                          : "bg-gray-500/20 text-gray-400"
                      }`}
                    >
                      {booking.status === "pending"
                        ? "Chờ xác nhận"
                        : booking.status === "confirmed"
                        ? "Đã xác nhận"
                        : booking.status === "cancelled"
                        ? "Đã hủy"
                        : booking.status === "completed"
                        ? "Hoàn thành"
                        : "Từ chối"}
                    </p>
                  </div>
                </div>

                <div className="flex justify-end gap-2 mt-4 opacity-0 group-hover:opacity-100 transition">
                  <button
                    onClick={() => openEdit(booking)}
                    aria-label="Edit"
                    className="p-2 bg-blue-500/20 hover:bg-blue-500/40 rounded-lg transition"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => openDelete(booking)}
                    aria-label="Trash2"
                    className="p-2 bg-red-500/20 hover:bg-red-500/40 rounded-lg transition"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
