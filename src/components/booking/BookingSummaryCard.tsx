import { format } from "date-fns";
import type { BookingData } from "../../types";
interface BookingSummaryCardProps {
  data: BookingData;
  mobile?: boolean;
}
export default function BookingSummaryCard({
  data,
  mobile = false,
}: BookingSummaryCardProps) {
  const totalPrice =
    data.services?.reduce((sum, service) => sum + service.price, 0) ?? 0;

  return (
    <div
      className={`${
        mobile ? "rounded-t-3xl" : "sticky top-24"
      } bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 rounded-3xl shadow-2xl`}
    >
      <h3 className="text-2xl font-bold mb-6">Tóm tắt đơn đặt</h3>
      <div className="space-y-4 text-lg">
        <div className="flex justify-between">
          <span>Thợ cắt</span>
          <span className="font-bold">{data.barber?.name || "-"}</span>
        </div>
        <div className="flex justify-between">
          <span>Dịch vụ</span>
          <span className="font-bold">
            {data.services?.map((s: any) => s.name).join(", ") || "-"}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Thời gian</span>
          <span className="font-bold">
            {data.time
              ? `${data.time} - ${
                  data.date ? format(new Date(data.date), "dd/MM") : ""
                }`
              : "-"}
          </span>
        </div>
        <div className="border-t border-white/20 pt-4">
          <div className="flex justify-between text-2xl font-bold">
            <span>Tổng tiền</span>
            <span className="text-orange-400">
              {totalPrice.toLocaleString("vi-VN")}đ
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
