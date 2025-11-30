// src/components/auth/StaffRoute.tsx
import toast from "react-hot-toast";
import { Navigate, Outlet } from "react-router-dom";

export const StaffRoute = () => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("staffToken") : null;
  const role =
    typeof window !== "undefined" ? localStorage.getItem("staffRole") : null;

  if (token === null || role === null) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!token || !role) {
    return <Navigate to="/staff/login" replace />;
  }

  if (role !== "admin" && role !== "barber") {
    localStorage.clear();
    toast.error("Truy cập bị từ chối!");
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
