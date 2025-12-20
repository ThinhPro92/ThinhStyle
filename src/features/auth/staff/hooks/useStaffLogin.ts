import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import apiClient from "../../../../lib/apiClient";
import { useStaffStore } from "../../../../store/useStaffStore";
import type { StaffUser } from "../../../../types/auth";

interface LoginResponse {
  accessToken: string;
  user: StaffUser;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: LoginResponse;
  meta?: unknown;
}

export const useStaffLogin = () => {
  const navigate = useNavigate();
  const { login } = useStaffStore();

  return useMutation<ApiResponse, Error, { email: string; password: string }>({
    mutationFn: async ({ email, password }) => {
      const res = await apiClient.post("/auth/login", { email, password });
      return res.data as ApiResponse;
    },
    onSuccess: (apiRes) => {
      const { user, accessToken } = apiRes.data;
      localStorage.setItem("staffToken", accessToken);
      localStorage.setItem("staffUser", JSON.stringify(user));
      login(user, accessToken);
      toast.success(
        `Chào mừng ${user.role === "admin" ? "Admin" : "Thợ"} ${
          user.name || ""
        }!`
      );

      if (user.role === "admin") {
        navigate("/admin/dashboard", { replace: true });
      } else if (user.role === "barber") {
        navigate("/barber/dashboard", { replace: true });
      } else {
        navigate("/");
      }
    },
    onError: (error) => {
      toast.error(error.message || "Đăng nhập thất bại");
    },
  });
};
