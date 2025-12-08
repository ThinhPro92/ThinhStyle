import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import apiClient from "../../../lib/apiClient";

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
      // Lấy danh sách barber từ API
      const res = await apiClient.get("/barber");
      const barbers = res.data.data;

      // Tìm thợ có email + password khớp
      const user = barbers.find(
        (b: any) =>
          (b.email === email || b.phone === email) && b.password === password
      );

      if (!user) throw new Error("Email/SĐT hoặc mật khẩu không đúng");

      if (user.role !== "barber" && user.role !== "admin") {
        throw new Error("Tài khoản không có quyền truy cập");
      }

      return {
        accessToken: "fake-jwt-token-" + user._id,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email || user.phone,
          role: user.role || "barber",
        },
      };
    },
    onSuccess: (data) => {
      const { accessToken, user } = data;

      // Giả lập lưu token + thông tin
      localStorage.setItem("staffToken", accessToken);
      localStorage.setItem("staffRole", user.role);
      localStorage.setItem("staffId", user._id);
      localStorage.setItem("staffName", user.name);
      localStorage.setItem("staffUser", JSON.stringify(user));

      toast.success(
        `Chào mừng ${user.role === "admin" ? "Admin" : "Thợ"} ${user.name}!`
      );

      // Điều hướng
      if (user.role === "admin") {
        navigate("/admin/dashboard", { replace: true });
      } else {
        navigate("/barber/dashboard", { replace: true });
      }
    },
    onError: (error: any) => {
      toast.error(error.message || "Đăng nhập thất bại");
    },
  });
};
