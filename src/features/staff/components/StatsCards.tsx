import { motion } from "framer-motion";
import { DollarSign, Calendar, Users, TrendingUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../../../lib/apiClient";

export default function StatsCards() {
  const { data } = useQuery({
    queryKey: ["adminStats"],
    queryFn: async () => {
      const res = await apiClient.get("/admin/stats");
      return res.data.data;
    },
  });

  const stats = [
    {
      label: "Doanh thu hôm nay",
      value: data?.todayRevenue || 0,
      icon: DollarSign,
      color: "from-green-500 to-emerald-600",
    },
    {
      label: "Lịch đặt hôm nay",
      value: data?.todayBookings || 0,
      icon: Calendar,
      color: "from-blue-500 to-cyan-600",
    },
    {
      label: "Khách mới",
      value: data?.newCustomers || 0,
      icon: Users,
      color: "from-purple-500 to-pink-600",
    },
    {
      label: "Tăng trưởng",
      value: `+${data?.growth || 12}%`,
      icon: TrendingUp,
      color: "from-orange-500 to-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: i * 0.1 }}
          className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:shadow-orange-600/20 transition-all"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">{stat.label}</p>
              <p className="text-4xl font-bold mt-2">
                {stat.value.toLocaleString("vi-VN")}
                {stat.label.includes("Tăng trưởng") && ""}
              </p>
            </div>
            <div
              className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center`}
            >
              <stat.icon className="w-8 h-8 text-white" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
