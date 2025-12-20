import { format, startOfWeek, addDays } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../../../lib/apiClient";
import { QUERY_KEYS } from "../../../constants/queryKeys";
import type { Booking } from "../../../types/booking";

export default function BookingCalendar() {
  const today = new Date();
  const weekStart = startOfWeek(today, { weekStartsOn: 1 }); // Thứ 2

  const { data: bookings = [], isLoading } = useQuery<Booking[]>({
    queryKey: QUERY_KEYS.BOOKINGS(),
    queryFn: async () => (await apiClient.get("/bookings")).data.data,
  });

  if (isLoading) {
    return (
      <div className="bg-gray-900/50 rounded-2xl p-6">
        <h3 className="text-2xl font-bold mb-6">Lịch tuần này</h3>
        <p className="text-gray-400 text-center py-10">Đang tải lịch...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900/50 backdrop-blur border border-gray-800 rounded-2xl p-6">
      <h3 className="text-2xl font-bold mb-6">Lịch tuần này</h3>

      <div className="grid grid-cols-7 gap-2">
        {[...Array(7)].map((_, i) => {
          const date = addDays(weekStart, i);
          const dateKey = format(date, "yyyy-MM-dd");

          const count = bookings.filter((b) => b.date === dateKey).length;

          return (
            <div
              key={dateKey}
              className="text-center p-4 bg-gray-800/50 rounded-xl"
            >
              <p className="text-sm text-gray-400">{format(date, "EEE")}</p>

              <p className="text-3xl font-bold">{format(date, "dd")}</p>

              <p className="text-xs text-orange-400 mt-2">{count} lịch</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
