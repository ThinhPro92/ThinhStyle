import { Navigate, Outlet } from "react-router-dom";
import { useStaffStore } from "../../store/useStaffStore";
import toast from "react-hot-toast";

export const StaffRoute = () => {
  const { isLoading, isAuthenticated, user } = useStaffStore();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/staff/login" replace />;
  }

  if (user.role !== "admin" && user.role !== "barber") {
    toast.error("Truy cập bị từ chối!");
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
