import { useState } from "react";
import { io } from "socket.io-client";
import ChangePasswordModal from "../../features/auth/staff/components/ChangePasswordModal";
import BarberHeader from "../../features/barber/components/BarberHeader";
import BarberStats from "../../features/barber/components/BarberStats";
import BookingList from "../../features/barber/components/BookingList";
import HistoryList from "../../features/barber/components/HistoryList";

const socket = io("https://api-class-o1lo.onrender.com", {
  auth: { token: localStorage.getItem("staffToken") },
});

export default function BarberDashboard() {
  const [activeTab, setActiveTab] = useState<"today" | "history">("today");

  const staffUser = JSON.parse(localStorage.getItem("staffUser") || "{}");
  const hasChangedPassword =
    localStorage.getItem("hasChangedPassword") === "true";

  // Bắt buộc đổi mật khẩu lần đầu
  if (!hasChangedPassword) {
    return <ChangePasswordModal onSuccess={() => window.location.reload()} />;
  }

  if (!staffUser?._id) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white text-2xl">
        Đang tải...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black text-white">
      <BarberHeader socket={socket} staffUser={staffUser} />

      <div className="max-w-7xl mx-auto p-8">
        <BarberStats staffUser={staffUser} />

        {/* Tab chuyển đổi */}
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
