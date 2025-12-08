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
      const res = await apiClient.post("/auth/login", { email, password });
      return res.data.data; // { accessToken, user: { _id, name, email, role } }
    },
    onSuccess: (data) => {
      const { accessToken, user } = data;

      // Lưu thông tin staff (dùng chung cho cả admin và barber)
      localStorage.setItem("staffToken", accessToken);
      localStorage.setItem("staffRole", user.role);
      localStorage.setItem("staffId", user._id);
      localStorage.setItem("staffName", user.name || user.email);
      localStorage.setItem("staffUser", JSON.stringify(user)); // quan trọng!

      toast.success(
        `Chào mừng ${user.role === "admin" ? "Admin" : "Thợ"} ${
          user.name || user.email
        }!`
      );

      // ĐIỀU HƯỚNG THEO ROLE
      if (user.role === "admin") {
        navigate("/admin/dashboard", { replace: true });
      } else if (user.role === "barber") {
        navigate("/barber/dashboard", { replace: true }); // ĐÚNG ĐƯỜNG DẪN
      } else {
        toast.error("Tài khoản không hợp lệ!");
        localStorage.clear();
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Sai email hoặc mật khẩu");
    },
  });
};
