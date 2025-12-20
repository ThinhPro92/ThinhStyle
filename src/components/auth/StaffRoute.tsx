import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useStaffStore } from "../../store/useStaffStore";
import toast from "react-hot-toast";

export const StaffRoute = () => {
  const { isLoading, isAuthenticated, user } = useStaffStore();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    toast.error("Truy cập bị từ chối!");
    return <Navigate to="/staff/login" replace />;
  }

  const isAdminPath = location.pathname.startsWith("/admin");
  const isBarberPath = location.pathname.startsWith("/barber");

  // Admin chỉ vào /admin
  if (isAdminPath && user.role !== "admin") {
    toast.error("Chỉ Admin mới truy cập được!");
    return <Navigate to="/barber/dashboard" replace />;
  }

  // Barber chỉ vào /barber
  if (isBarberPath && user.role !== "barber") {
    toast.error("Chỉ Barber mới truy cập được!");
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Outlet />;
};
