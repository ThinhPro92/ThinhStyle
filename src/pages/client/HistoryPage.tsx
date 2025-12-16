import { useQuery } from "@tanstack/react-query";
import apiClient from "../../lib/apiClient";
import { QUERY_KEYS } from "../../constants/queryKeys";
import { useCustomerStore } from "../../store/useCustomerStore";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Booking } from "../../types/booking";
import { Button } from "../../components/ui/button";
import { format } from "date-fns";

export default function HistoryPage() {
  const { user } = useCustomerStore(); // ← CHỈ DÙNG 1 LẦN
  const queryClient = useQueryClient();

  const { data: bookings = [] } = useQuery<Booking[]>({
    queryKey: QUERY_KEYS.HISTORY(user?.phone || ""),
    queryFn: async () => {
      if (!user?.phone) throw new Error("No phone");
      const res = await apiClient.get(`/bookings/customer/${user.phone}`);
      return res.data.data;
    },
    enabled: !!user?.phone,
  });

  const cancelMutation = useMutation({
    mutationFn: (id: string) => apiClient.delete(`/bookings/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.HISTORY(user?.phone || ""),
      });
      toast.success("Hủy lịch thành công");
    },
    onError: () => toast.error("Hủy lịch thất bại"),
  });

  if (!user)
    return (
      <p className="text-center py-20">Bạn cần đăng nhập để xem lịch sử</p>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h2 className="text-3xl font-bold text-center mb-8">Lịch Sử Đặt Lịch</h2>
      <div className="max-w-4xl mx-auto space-y-6">
        {bookings.length === 0 ? (
          <p className="text-center text-gray-500 py-10">
            Chưa có lịch đặt nào
          </p>
        ) : (
          bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white p-6 rounded-2xl shadow-md"
            >
              <p className="font-bold text-xl">Mã: {booking.bookingCode}</p>
              <p>Thợ: {booking.barber.name}</p>
              <p>Dịch vụ: {booking.service.name}</p>
              <p>
                Thời gian: {booking.time} -{" "}
                {format(new Date(booking.date), "dd/MM/yyyy")}
              </p>
              <p>Trạng thái: {booking.status}</p>
              {booking.status === "pending" && (
                <Button
                  variant="destructive"
                  onClick={() => cancelMutation.mutate(booking._id)}
                >
                  Hủy lịch
                </Button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
