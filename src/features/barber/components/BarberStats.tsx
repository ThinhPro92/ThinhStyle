import { Users, Calendar, Bell } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  staffUser: any;
}

export default function BarberStats() {
  const todayCount = 8; // Giả lập, sẽ lấy từ API sau

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-orange-600 to-red-600 p-10 rounded-3xl text-center shadow-2xl"
      >
        <Users className="w-20 h-20 mx-auto mb-4" />
        <p className="text-7xl font-bold">{todayCount}</p>
        <p className="text-2xl mt-2">Lịch hôm nay</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-br from-blue-600 to-purple-700 p-10 rounded-3xl text-center shadow-2xl"
      >
        <Calendar className="w-20 h-20 mx-auto mb-4" />
        <p className="text-7xl font-bold">6</p>
        <p className="text-2xl mt-2">Đã hoàn thành</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-green-600 to-teal-600 p-10 rounded-3xl text-center shadow-2xl"
      >
        <Bell className="w-20 h-20 mx-auto mb-4" />
        <p className="text-7xl font-bold">Realtime</p>
        <p className="text-2xl mt-2">Thông báo tức thì</p>
      </motion.div>
    </div>
  );
}
