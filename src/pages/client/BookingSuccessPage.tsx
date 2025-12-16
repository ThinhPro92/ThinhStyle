import { format } from "date-fns";
import { Button } from "../../components/ui/button";
import { useCustomerStore } from "../../store/useCustomerStore";
import toast from "react-hot-toast";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface BookingSuccessProps {
  bookingCode: string;
  barberName: string;
  serviceNames: string[];
  date: Date;
  time: string;
  totalPrice: number;
}

export default function BookingSuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useCustomerStore();
  const [cancelReason, setCancelReason] = useState("");
  const [isCancelling, setIsCancelling] = useState(false);

  // Lấy data từ navigate state
  const data = location.state as BookingSuccessProps | null;

  if (!data) {
    // Nếu không có data → quay lại booking hoặc home
    navigate("/booking");
    return null;
  }

  const { bookingCode, barberName, serviceNames, date, time, totalPrice } =
    data;

  const cancelCount = Number(
    localStorage.getItem(`cancelCount_${user?.phone}`) || "0"
  );

  if (cancelCount >= 3) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center p-8">
        <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-md text-center">
          <h2 className="text-3xl font-bold mb-4">
            Tài khoản bị tạm khóa đặt lịch
          </h2>
          <p className="text-gray-600 text-lg">
            Bạn đã hủy lịch quá 3 lần. Vui lòng liên hệ salon.
          </p>
          <Button className="mt-8" onClick={() => navigate("/")}>
            Quay về trang chủ
          </Button>
        </div>
      </div>
    );
  }

  const handleCancel = () => {
    if (!cancelReason.trim()) {
      toast.error("Vui lòng nhập lý do hủy");
      return;
    }

    setIsCancelling(true);
    setTimeout(() => {
      localStorage.setItem(
        `cancelCount_${user?.phone}`,
        String(cancelCount + 1)
      );
      toast.success("Hủy lịch thành công!");
      navigate("/booking");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="bg-white rounded-3xl shadow-2xl p-12 text-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg
              className="w-16 h-16 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-4xl font-bold mb-4">Đặt lịch thành công!</h1>
          <p className="text-xl text-gray-600 mb-10">
            Vui lòng đến đúng giờ nhé!
          </p>

          <div className="bg-gray-50 rounded-3xl p-8 mb-10">
            <p className="text-lg mb-4">Mã đặt lịch</p>
            <p className="text-5xl font-bold text-orange-500 mb-6">
              {bookingCode}
            </p>

            <div className="space-y-4 text-left max-w-md mx-auto">
              <p>
                <strong>Thợ cắt:</strong> {barberName}
              </p>
              <p>
                <strong>Dịch vụ:</strong> {serviceNames.join(", ")}
              </p>
              <p>
                <strong>Thời gian:</strong> {time} -{" "}
                {format(date, "dd/MM/yyyy")}
              </p>
              <p>
                <strong>Tổng tiền:</strong> {totalPrice.toLocaleString()}đ
              </p>
            </div>
          </div>

          <div className="max-w-md mx-auto">
            <h3 className="text-xl font-bold mb-4">Hủy lịch?</h3>
            <textarea
              placeholder="Lý do hủy (bắt buộc)"
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-xl focus:border-orange-500 outline-none mb-4"
              rows={3}
            />
            <Button
              variant="destructive"
              size="lg"
              className="w-full"
              onClick={handleCancel}
              disabled={isCancelling}
            >
              {isCancelling ? "Đang hủy..." : "Hủy đặt lịch"}
            </Button>
          </div>

          <Button className="mt-8" onClick={() => navigate("/")}>
            Quay về trang chủ
          </Button>
        </div>
      </div>
    </div>
  );
}
