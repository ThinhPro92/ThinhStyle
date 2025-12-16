import { format } from "date-fns";
import { useCreateBooking } from "../../features/booking/hooks/useCreateBooking";
import { Button } from "../ui/button";
import type { Step4Props } from "../../types/booking";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function generateBookingCode(date: Date) {
  return `THS-${format(date, "ddMMyy")}-${Math.floor(
    Math.random() * 9000 + 1000
  )}`;
}

export default function Step4_Confirm({ bookingData, onPrev }: Step4Props) {
  const { mutate: createBooking, isPending } = useCreateBooking();
  const navigate = useNavigate();

  const handleConfirm = () => {
    const payload = {
      barberId: bookingData.barber._id,
      serviceIds: bookingData.services.map((s) => s._id),
      date: format(bookingData.date, "yyyy-MM-dd"),
      startTime: bookingData.time,
      note: "Khách đặt online từ ThinhStyle",
    };

    createBooking(payload, {
      onSuccess: (res) => {
        const code =
          res.data?.bookingCode ?? generateBookingCode(bookingData.date);

        navigate("/booking/success", {
          state: {
            bookingCode: code,
            barberName: bookingData.barber.name,
            serviceNames: bookingData.services.map((s) => s.name),
            date: bookingData.date,
            time: bookingData.time,
            totalPrice: bookingData.totalPrice,
          },
        });
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
