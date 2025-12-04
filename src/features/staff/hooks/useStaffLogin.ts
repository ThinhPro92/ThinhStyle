import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import apiClient from "../../../lib/apiClient";
import { AxiosError } from "axios";
interface LoginResponse {
  data: {
    accessToken: string;
    user: {
      _id: string;
      name?: string;
      email: string;
      role: "admin" | "barber" | "customer";
    };
  };
}
interface ApiError {
  message?: string;
}
export const useStaffLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const res = await apiClient.post<LoginResponse>("/auth/login", {
        email,
        password,
      });
      return res.data.data;
    },
    onSuccess: (data) => {
      const { role } = data.user;
      if (role !== "admin" && role !== "barber") {
        toast.error("Bạn không có quyền truy cập khu vực nhân viên!");
        return navigate("/");
      }
      localStorage.setItem("staffToken", data.accessToken);
      localStorage.setItem("staffRole", data.user.role);
      localStorage.setItem("staffId", data.user._id);

      toast.success(
        `Chào mừng ${role === "admin" ? "Admin" : "Barber"} ${
          data.user.name || data.user.email
        }!`
      );

      if (role === "admin") {
        navigate("/admin/dashboard", { replace: true });
      } else {
        navigate("/barber/schedule", { replace: true });
      }
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(
        error.response?.data?.message || "Email hoặc mật khẩu không đúng"
      );
    },
  });
};
