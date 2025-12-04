import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

const data = [
  { name: "T2", revenue: 4200000 },
  { name: "T3", revenue: 5800000 },
  { name: "T4", revenue: 4900000 },
  { name: "T5", revenue: 7200000 },
  { name: "T6", revenue: 8900000 },
  { name: "T7", revenue: 9500000 },
  { name: "CN", revenue: 11200000 },
];

export default function RevenueChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6"
    >
      <h3 className="text-2xl font-bold mb-6">Doanh thu 7 ngày qua</h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="name" stroke="#9CA3AF" />
          <YAxis stroke="#9CA3AF" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1F2937",
              border: "1px solid #374151",
            }}
            formatter={(value: number) => value.toLocaleString("vi-VN") + "đ"}
          />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#F97316"
            strokeWidth={4}
            dot={{ fill: "#F97316", r: 6 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
