import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Calendar,
  Scissors,
  DollarSign,
  Settings,
  LogOut,
  FileText,
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { logoutStaff } from "../../../utils/auth";
import toast from "react-hot-toast";

const menuItems = [
  { icon: LayoutDashboard, label: "Tổng quan", path: "/admin/dashboard" },
  { icon: DollarSign, label: "Doanh thu", path: "/admin/revenue" },
  { icon: Calendar, label: "Lịch đặt", path: "/admin/bookings" },
  { icon: Users, label: "Quản lý thợ", path: "/admin/barbers" },
  { icon: Scissors, label: "Dịch vụ", path: "/admin/services" },
  { icon: FileText, label: "Blog", path: "/admin/blogs" },
  { icon: Settings, label: "Cài đặt", path: "/admin/settings" },
];

export default function Sidebar() {
  const [isCollapsed] = useState(false);
  const location = useLocation();
  const handleLogout = () => {
    logoutStaff();
    toast.success("Đăng xuất thành công!", {
      icon: "Bye Bye",
      style: { background: "#16a34a", color: "white" },
    });
  };
  return (
    <motion.aside
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      className={`h-screen bg-black text-white flex flex-col border-r border-orange-500/20 ${
        isCollapsed ? "w-20" : "w-72"
      } transition-all duration-300`}
    >
      <div className="p-6 border-b border-orange-500/20">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center text-2xl font-bold">
            T
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="text-2xl font-bold">ThinhStyle</h1>
              <p className="text-orange-400 text-sm">Admin Pro</p>
            </div>
          )}
        </div>
      </div>

      <nav className="flex-1 p-4">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-4 p-4 rounded-xl mb-2 transition-all ${
                isActive
                  ? "bg-orange-600 text-white shadow-lg shadow-orange-600/20"
                  : "hover:bg-white/10"
              }`}
            >
              <item.icon className="w-6 h-6" />
              {!isCollapsed && (
                <span className="font-medium">{item.label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-orange-500/20">
        <button
          onClick={handleLogout}
          className="flex items-center gap-4 p-4 rounded-xl hover:bg-red-600/20 w-full transition-all"
        >
          <LogOut className="w-6 h-6" />
          {!isCollapsed && <span>Đăng xuất</span>}
        </button>
      </div>
    </motion.aside>
  );
}
