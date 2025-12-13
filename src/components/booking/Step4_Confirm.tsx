import { format } from "date-fns";
import { useCreateBooking } from "../../features/booking/hooks/useCreateBooking";
import { Button } from "../ui/button";
import type { Step4Props } from "../../types/booking";

export default function Step4_Confirm({ bookingData, onPrev }: Step4Props) {
  const { mutate: createBooking, isPending } = useCreateBooking();

  const handleConfirm = () => {
    const payload = {
      barberId: bookingData.barber._id,
      serviceIds: bookingData.services.map((s) => s._id),
      date: format(bookingData.date, "yyyy-MM-dd"),
      startTime: bookingData.time,
      note: "Khách đặt online từ ThinhStyle",
    };
    createBooking(payload);
  };

  const bookingCode = `THS-${format(bookingData.date, "ddMMyy")}-${Math.floor(
    1000 * 9000
  )}`;

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">Xác Nhận Đặt Lịch</h2>
      <div className="space-y-6 text-lg">
        <div className="flex justify-between">
          <span>Thợ cắt:</span> <strong>{bookingData.barber.name}</strong>
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

      <div className="my-10 text-center">
        <p className="text-xl font-bold mb-4">Mã đặt lịch của bạn</p>
        <div className="inline-block p-6 bg-gray-100 rounded-3xl">
          <p className="text-4xl font-bold text-orange-500">{bookingCode}</p>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          Quét QR khi đến tiệm để check-in
        </p>
      </div>

      <div className="flex gap-4">
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
