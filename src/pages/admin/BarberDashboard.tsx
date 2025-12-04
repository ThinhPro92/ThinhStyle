import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import toast from "react-hot-toast";
import { Users } from "lucide-react";

const socket = io("https://api-class-o1lo.onrender.com");

export default function BarberDashboard() {
  const [todayBookings, setTodayBookings] = useState<any[]>([]);
  const barber = JSON.parse(localStorage.getItem("staffUser") || "{}");

  useEffect(() => {
    // Lấy lịch hôm nay
    fetch(
      `https://api-class-o1lo.onrender.com/api/thinhstyle/bookings/barber/${barber._id}`
    )
      .then((r) => r.json())
      .then((d) => setTodayBookings(d.data));

    // Realtime khi có khách đặt mới
    socket.emit("joinBarberRoom", barber._id);
    socket.on("newBooking", (booking) => {
      setTodayBookings((prev) => [booking, ...prev]);
      toast.success(`Khách mới: ${booking.customer.name} - ${booking.time}`, {
        duration: 6000,
      });
    });

    return () => {
      socket.off("newBooking");
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
          Chào thợ {barber.name}!
        </h1>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-orange-500 to-red-600 p-8 rounded-2xl">
            <Users className="w-12 h-12 mb-4" />
            <p className="text-5xl font-bold">{todayBookings.length}</p>
            <p>Lịch hôm nay</p>
          </div>
        </div>

        <div className="space-y-6">
          {todayBookings.map((b) => (
            <div
              key={b._id}
              className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 hover:border-orange-500/50 transition"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-2xl font-bold">{b.customer.name}</p>
                  <p className="text-orange-400 text-lg">{b.service.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-orange-400">{b.time}</p>
                  <p className="text-sm text-gray-400">{b.date}</p>
                </div>
              </div>
              {b.note && (
                <p className="mt-4 text-gray-300">Ghi chú: {b.note}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
