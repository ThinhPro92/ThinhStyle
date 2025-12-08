import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Users, Calendar, Phone, Clock, Bell, Scissors } from "lucide-react";
import ChangePasswordModal from "../../features/auth/staff/components/ChangePasswordModal";

// Kết nối Socket.IO với token
const socket = io("https://api-class-o1lo.onrender.com", {
  auth: { token: localStorage.getItem("staffToken") },
});

export default function BarberDashboard() {
  const [todayBookings, setTodayBookings] = useState<any[]>([]);
  const [showChangePassword, setShowChangePassword] = useState(false);

  // Lấy thông tin thợ từ localStorage
  const staffUser = JSON.parse(localStorage.getItem("staffUser") || "{}");
  const hasChangedPassword =
    localStorage.getItem("hasChangedPassword") === "true";

  // Kiểm tra lần đầu đăng nhập → bắt buộc đổi mật khẩu
  useEffect(() => {
    if (!staffUser?._id) return;

    // Nếu chưa đổi mật khẩu lần đầu → mở modal
    if (!hasChangedPassword) {
      // Để tránh warning, delay setState bằng microtask
      Promise.resolve().then(() => setShowChangePassword(true));
    }

    // Load lịch hôm nay
    const loadBookings = async () => {
      try {
        const res = await fetch(
          `https://api-class-o1lo.onrender.com/api/thinhstyle/bookings/barber/${staffUser._id}`
        );
        const data = await res.json();
        setTodayBookings(data.data || []);
      } catch {
        toast.error("Lỗi tải lịch hôm nay");
      }
    };
    loadBookings();

    // Realtime: nhận thông báo khi có khách đặt mới
    socket.emit("joinBarberRoom", staffUser._id);

    socket.on("newBooking", (booking) => {
      setTodayBookings((prev) => [booking, ...prev]);
      toast.success(`Khách mới: ${booking.customer.name} - ${booking.time}`, {
        duration: 8000,
        icon: "Máy cắt tóc",
        style: { background: "#f97316", color: "white" },
      });
    });

    return () => {
      socket.off("newBooking");
    };
  }, [staffUser._id, hasChangedPassword]);

  const handlePasswordChanged = () => {
    localStorage.setItem("hasChangedPassword", "true");
    setShowChangePassword(false);
    window.location.reload(); // Reload để load dashboard
  };

  // Bắt buộc đổi mật khẩu lần đầu
  if (showChangePassword) {
    return <ChangePasswordModal onSuccess={handlePasswordChanged} />;
  }

  // Nếu chưa có thông tin thợ
  if (!staffUser?._id) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white">
        <div className="text-center">
          <div className="animate-spin w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full mb-6" />
          <p className="text-xl">Đang tải thông tin thợ...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black text-white">
      {/* Header */}
      <header className="bg-black/60 backdrop-blur-xl border-b border-orange-500/20 p-6 sticky top-0 z-50 shadow-2xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
              Chào thợ {staffUser.name || "Barber"}!
            </h1>
            <p className="text-orange-400 text-xl mt-2">
              Hôm nay bạn có <strong>{todayBookings.length}</strong> lịch cắt
            </p>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <span className="flex items-center gap-2">
              <Phone className="w-5 h-5" />
              {staffUser.phone || "Chưa có SĐT"}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              {new Date().toLocaleDateString("vi-VN", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-8 space-y-10">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-orange-600 to-red-600 p-10 rounded-3xl shadow-2xl text-center"
          >
            <Users className="w-20 h-20 mx-auto mb-4" />
            <p className="text-7xl font-bold">{todayBookings.length}</p>
            <p className="text-2xl mt-2">Lịch hôm nay</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-blue-600 to-purple-700 p-10 rounded-3xl shadow-2xl text-center"
          >
            <Calendar className="w-20 h-20 mx-auto mb-4" />
            <p className="text-7xl font-bold">
              {
                todayBookings.filter(
                  (b) =>
                    new Date(b.date).toDateString() ===
                    new Date().toDateString()
                ).length
              }
            </p>
            <p className="text-2xl mt-2">Hôm nay</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-green-600 to-teal-600 p-10 rounded-3xl shadow-2xl text-center"
          >
            <Bell className="w-20 h-20 mx-auto mb-4" />
            <p className="text-7xl font-bold">Realtime</p>
            <p className="text-2xl mt-2">Thông báo tức thì</p>
          </motion.div>
        </div>

        {/* Danh sách lịch */}
        <div className="space-y-8">
          <h2 className="text-4xl font-bold flex items-center gap-4">
            <Clock className="w-12 h-12 text-orange-500" />
            Lịch cắt hôm nay
          </h2>

          {todayBookings.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-32 bg-gray-900/50 rounded-3xl border-2 border-dashed border-gray-700"
            >
              <div className="text-9xl mb-8">Máy cắt tóc</div>
              <p className="text-4xl text-gray-400 font-bold">
                Hôm nay chưa có lịch
              </p>
              <p className="text-2xl text-gray-500 mt-4">Nghỉ ngơi đi anh ơi</p>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {todayBookings.map((booking, index) => (
                <motion.div
                  key={booking._id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-900/80 backdrop-blur border border-gray-800 rounded-3xl p-8 hover:border-orange-500/60 transition-all hover:shadow-2xl hover:shadow-orange-500/20"
                >
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                    <div className="flex-1">
                      <h3 className="text-4xl font-bold text-orange-400 mb-3">
                        {booking.customer.name}
                      </h3>
                      <div className="flex flex-wrap gap-6 text-lg">
                        <span className="flex items-center gap-2">
                          <Clock className="w-6 h-6 text-orange-500" />
                          <strong>{booking.time}</strong>
                        </span>
                        <span className="flex items-center gap-2">
                          <Scissors className="w-6 h-6 text-gray-400" />
                          {booking.service.name}
                        </span>
                      </div>
                      {booking.note && (
                        <p className="mt-4 text-gray-300 bg-gray-800/50 px-6 py-3 rounded-xl inline-block">
                          Ghi chú: {booking.note}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-5xl font-bold text-orange-500">
                        {booking.time}
                      </p>
                      <p className="text-xl text-gray-400">
                        {new Date(booking.date).toLocaleDateString("vi-VN")}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
