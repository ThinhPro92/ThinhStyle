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
      try {
        // ƯU TIÊN 1: GỌI API LOGIN CHÍNH THỨC
        const res = await apiClient.post("/auth/login", { email, password });
        return res.data.data; // { accessToken, user }
      } catch (err) {
        console.warn("API /auth/login lỗi → fallback sang barber local check");

        // ƯU TIÊN 2: FALLBACK SANG CHECK BARBER Ở API /barber
        const res = await apiClient.get("/barber");
        const barbers = res.data.data;

        const user = barbers.find(
          (b: any) =>
            (b.email === email || b.phone === email) && b.password === password
        );

        if (!user) throw new Error("Email/SĐT hoặc mật khẩu không đúng");

        if (user.role !== "barber" && user.role !== "admin") {
          throw new Error("Tài khoản không có quyền truy cập");
        }

        return {
          accessToken: "fallback-token-" + user._id,
          user: {
            _id: user._id,
            name: user.name,
            email: user.email || user.phone,
            role: user.role || "barber",
          },
        };
      }
    },

    onSuccess: (data) => {
      const { accessToken, user } = data;

      // LƯU LOCAL
      localStorage.setItem("staffToken", accessToken);
      localStorage.setItem("staffRole", user.role);
      localStorage.setItem("staffId", user._id);
      localStorage.setItem("staffName", user.name);
      localStorage.setItem("staffUser", JSON.stringify(user));

      toast.success(
        `Chào mừng ${user.role === "admin" ? "Admin" : "Thợ"} ${user.name}!`
      );

      // CHUYỂN TRANG
      if (user.role === "admin") {
        navigate("/admin/dashboard", { replace: true });
      } else if (user.role === "barber") {
        navigate("/barber/dashboard", { replace: true });
      } else {
        toast.error("Tài khoản không hợp lệ!");
        localStorage.clear();
      }
    },

    onError: (error: any) => {
      toast.error(error.message || "Đăng nhập thất bại");
    },
  });
};
