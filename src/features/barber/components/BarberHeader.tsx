import { Phone, Calendar, ToggleLeft, ToggleRight } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Socket } from "socket.io-client";
import type { BarberAdmin } from "../../../types/admin/barberAdmin";
export type BarberSocket = Socket;
interface Props {
  socket: BarberSocket;
  staffUser: BarberAdmin;
}
export default function BarberHeader({ socket, staffUser }: Props) {
  const [isOnline, setIsOnline] = useState(true);

  const toggleOnline = () => {
    const newStatus = !isOnline;
    setIsOnline(newStatus);
    socket.emit("barberStatus", { barberId: staffUser._id, online: newStatus });
    toast.success(newStatus ? "Bạn đang Online" : "Bạn đang Offline");
  };

  return (
    <header className="bg-black/60 backdrop-blur-xl border-b border-orange-500/20 p-6 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
            Chào thợ {staffUser.name}!
          </h1>
          <p className="text-orange-400 text-xl mt-2">
            Sẵn sàng phục vụ khách hôm nay
          </p>
        </div>
        <div className="flex items-center gap-6">
          <button
            onClick={toggleOnline}
            className={`flex items-center gap-3 px-6 py-3 rounded-full font-bold transition ${
              isOnline ? "bg-green-600" : "bg-gray-600"
            }`}
          >
            {isOnline ? (
              <ToggleRight className="w-6 h-6" />
            ) : (
              <ToggleLeft className="w-6 h-6" />
            )}
            {isOnline ? "Online" : "Offline"}
          </button>
          <span className="flex items-center gap-2">
            <Phone className="w-5 h-5" /> {staffUser.phone}
          </span>
          <span className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />{" "}
            {new Date().toLocaleDateString("vi-VN")}
          </span>
        </div>
      </div>
    </header>
  );
}
