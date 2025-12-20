import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import BookingCalendar from "../../features/booking/admin/BookingCalendar";
import BookingList from "../../features/booking/admin/BookingList";
import CreateBookingModal from "../../features/booking/admin/CreateBookingModal";
import EditBookingModal from "../../features/booking/admin/EditBookingModal.tsx";
import DeleteBookingModal from "../../features/booking/admin/DeleteBookingModal";
import { useBookingAdminStore } from "../../store/useBookingAdminStore";

export default function BookingsPage() {
  const { openCreate } = useBookingAdminStore();

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <Link
          to="/admin/dashboard"
          className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 transition mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          Quay lại Dashboard
        </Link>

        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
              Quản Lý Lịch Đặt
            </h1>
            <p className="text-xl text-gray-400 mt-2">
              Sắp xếp lịch cắt cho thợ
            </p>
          </div>
          <button
            onClick={openCreate}
            className="bg-gradient-to-r from-orange-500 to-red-600 px-8 py-4 rounded-2xl font-bold text-xl hover:scale-105 transition shadow-2xl flex items-center gap-3"
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Đặt Lịch Mới
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <BookingCalendar />
          <BookingList />
        </div>

        <CreateBookingModal />
        <EditBookingModal />
        <DeleteBookingModal />
      </div>
    </div>
  );
}
