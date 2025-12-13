import { Users, Calendar, Bell } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import type { BarberAdmin } from "../../../types/barber";
import { QUERY_KEYS } from "../../../constants/queryKeys";
import apiClient from "../../../lib/apiClient";

interface Props {
  staffUser: BarberAdmin;
}

interface BarberStatsData {
  todayCount: number;
  completed: number;
}

export default function BarberStats({ staffUser }: Props) {
  const { data: stats } = useQuery<BarberStatsData>({
    queryKey: QUERY_KEYS.BOOKINGS(staffUser._id),
    queryFn: async () => {
      const res = await apiClient.get(`/barber/stats/${staffUser._id}`);
      return res.data;
    },
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-orange-600 to-red-600 p-10 rounded-3xl text-center shadow-2xl"
      >
        <Users className="w-20 h-20 mx-auto mb-4" />
        <p className="text-7xl font-bold">{stats?.todayCount || 0}</p>
        <p className="text-2xl mt-2">Lịch hôm nay</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-br from-blue-600 to-purple-700 p-10 rounded-3xl text-center shadow-2xl"
      >
        <Calendar className="w-20 h-20 mx-auto mb-4" />
        <p className="text-7xl font-bold">{stats?.completed || 0}</p>
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
