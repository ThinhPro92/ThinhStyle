import { format } from "date-fns";
import { useCreateBooking } from "../../features/booking/hooks/useCreateBooking";
import { Button } from "../ui/button";
import type { Step4Props } from "../../types/booking";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../constants/queryKeys";
import { useCustomerStore } from "../../store/useCustomerStore";
import { useNavigate } from "react-router-dom";

const normalizePhone = (phone: string) =>
  phone.replace(/\D/g, "").replace(/^84/, "0").trim();

export default function Step4_Confirm({ bookingData, onPrev }: Step4Props) {
  const { mutate: createBooking, isPending } = useCreateBooking();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { user } = useCustomerStore();

  const handleConfirm = () => {
    if (!user?.phone) {
      toast.error("Bạn chưa đăng nhập");
      return;
    }

    const payload = {
      barberId: bookingData.barber._id,
      serviceIds: bookingData.services.map((s) => s._id),
      date: format(bookingData.date, "yyyy-MM-dd"),
      startTime: bookingData.time,
      note: "Khách đặt online từ ThinhStyle",
      type: "online" as const,

      customerName: user.name ?? "Khách online",
      customerPhone: normalizePhone(user.phone),

      status: "pending" as const,
    };

    createBooking(payload, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.BOOKINGS({
            customerPhone_like: normalizePhone(user.phone),
          }),
        });

        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.BOOKINGS(),
        });

        navigate("/profile/history");
      },
      onError: () => toast.error("Đặt lịch thất bại"),
    });
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">Xác Nhận Đặt Lịch</h2>

      <div className="space-y-6 text-lg">
        <div className="flex justify-between">
          <span>Thợ cắt:</span>
          <strong>{bookingData.barber.name}</strong>
        </div>

        <div className="flex justify-between">
          <span>Dịch vụ:</span>
          <strong>{bookingData.services.map((s) => s.name).join(", ")}</strong>
        </div>

        <div className="flex justify-between">
          <span>Thời gian:</span>
          <strong>
            {bookingData.time} - {format(bookingData.date, "dd/MM/yyyy")}
          </strong>
        </div>

        <div className="flex justify-between text-2xl font-bold">
          <span>Tổng tiền:</span>
          <span className="text-orange-500">
            {bookingData.totalPrice.toLocaleString()}đ
          </span>
        </div>
      </div>

      <div className="flex gap-4 mt-10">
        <Button
          variant="outline"
          size="lg"
          onClick={onPrev}
          disabled={isPending}
        >
          ← Sửa lại
        </Button>

        <Button
          size="lg"
          className="flex-1"
          onClick={handleConfirm}
          disabled={isPending}
        >
          {isPending ? "Đang đặt..." : "Xác nhận đặt lịch"}
        </Button>
      </div>
    </div>
  );
}
