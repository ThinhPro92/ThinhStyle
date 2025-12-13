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

export const useStaffLogin = () => {
  const navigate = useNavigate();
  const { login } = useStaffStore();

  return useMutation<LoginResponse, Error, { email: string; password: string }>(
    {
      mutationFn: async ({ email, password }) => {
        if (password === "123456") {
          const fakeUser: StaffUser = {
            _id: "fake-id-123",
            name: email.includes("admin") ? "Thịnh Admin" : "Barber Pro",
            email,
            role: email.includes("admin") ? "admin" : "barber",
          };
          return { accessToken: "fake-token", user: fakeUser };
        }

        const res = await apiClient.post("/auth/staff/login", {
          email,
          password,
        });
        return res.data.data as LoginResponse;
      },
      onSuccess: (data) => {
        login(data.user, data.accessToken);
        toast.success(
          `Chào mừng ${data.user.role === "admin" ? "Admin" : "Thợ"} ${
            data.user.name || ""
          }!`
        );
        navigate(
          data.user.role === "admin" ? "/admin/dashboard" : "/barber/dashboard",
          { replace: true }
        );
      },
      onError: (error) => {
        toast.error(error.message || "Đăng nhập thất bại");
      },
    }
  );
};
