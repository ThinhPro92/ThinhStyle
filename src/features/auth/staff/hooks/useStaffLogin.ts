// src/features/auth/staff/hooks/useStaffLogin.ts
import { useMutation } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import apiClient from "../../../../lib/apiClient";

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
      // Dùng collection users có role
      const res = await apiClient.post("/users", {
        email,
        password,
        role: email.includes("admin") ? "admin" : "barber",
      });
      return res.data.data;
    },
    onSuccess: (user) => {
      localStorage.setItem("staffToken", "fake-staff-token-" + user._id);
      localStorage.setItem("staffRole", user.role);
      toast.success(
        `Chào mừng ${user.role === "admin" ? "Admin" : "Barber"} ${
          user.name || user.email
        }`
      );

      // Chuyển hướng theo role
      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/barber/schedule");
      }
    },
    onError: () => {
      toast.error("Email hoặc mật khẩu không đúng");
    },
  });
};
