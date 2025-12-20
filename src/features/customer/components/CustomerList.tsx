import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useCustomers } from "../hooks/useCustomers";

export default function CustomerList() {
  const [search, setSearch] = useState("");
  const { data: customers = [], isLoading } = useCustomers();

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search)
  );

  if (isLoading)
    return (
      <p className="text-center py-20 text-gray-400 text-2xl">Đang tải...</p>
    );

  return (
    <div className="space-y-8">
      {/* Header + Search */}
      <div className="flex justify-between items-center">
        <h2 className="text-4xl font-bold text-white">Danh Sách Khách Hàng</h2>
        <div className="relative w-80">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            placeholder="Tìm tên hoặc SĐT..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:border-orange-500 outline-none text-white"
          />
        </div>
      </div>

      {/* Grid cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((c) => (
          <motion.div
            key={c.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-800 border border-gray-700 rounded-2xl p-6 text-white"
          >
            <div className="text-lg font-bold">{c.name}</div>
            <div className="text-gray-400 mt-1">{c.phone}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
