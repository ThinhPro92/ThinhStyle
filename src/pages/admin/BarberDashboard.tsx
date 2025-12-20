// src/pages/admin/BarberDashboard.tsx
import { useState } from "react";
import { io } from "socket.io-client";
import ChangePasswordModal from "../../features/auth/staff/components/ChangePasswordModal";
import BarberHeader from "../../features/barber/components/BarberHeader";
import BarberStats from "../../features/barber/components/BarberStats";
import BookingList from "../../features/barber/components/BookingList";
import HistoryList from "../../features/barber/components/HistoryList";
import { useStaffStore } from "../../store/useStaffStore";
import type { BarberSocket } from "../../types/barber";

const socket: BarberSocket = io(
  "https://api-class-o1lo.onrender.com/api/thinhstyle",
  {
    auth: { token: localStorage.getItem("staffToken") },
  }
);

export default function BarberDashboard() {
  const [activeTab, setActiveTab] = useState<"today" | "history">("today");
  const { user: staffUser, isLoading } = useStaffStore();

  const hasChangedPassword =
    localStorage.getItem("hasChangedPassword") === "true";

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white text-2xl">
        Đang tải...
      </div>
    );
  }

  if (!staffUser?._id) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white text-2xl">
        Không tìm thấy thông tin thợ
      </div>
    );
  }

  if (!hasChangedPassword) {
    return <ChangePasswordModal onSuccess={() => window.location.reload()} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black text-white">
      <BarberHeader socket={socket} staffUser={staffUser} />
      <div className="max-w-7xl mx-auto p-8">
        <BarberStats staffUser={staffUser} />
        <div className="flex gap-4 mb-8 border-b border-gray-800">
          <button
            onClick={() => setActiveTab("today")}
            className={`px-8 py-4 font-bold text-xl border-b-4 transition ${
              activeTab === "today"
                ? "border-orange-500 text-orange-400"
                : "border-transparent text-gray-500 hover:text-white"
            }`}
          >
            Lịch hôm nay
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`px-8 py-4 font-bold text-xl border-b-4 transition ${
              activeTab === "history"
                ? "border-orange-500 text-orange-400"
                : "border-transparent text-gray-500 hover:text-white"
            }`}
          >
            Lịch sử cắt tóc
          </button>
        </div>
        {activeTab === "today" ? (
          <BookingList socket={socket} staffUser={staffUser} />
        ) : (
          <HistoryList staffUser={staffUser} />
        )}
      </div>
    </div>
  );
}
