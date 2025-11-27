import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useVerifyOtp = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({ phone, otp }: { phone: string; otp: string }) => {
      // Giả lập OTP đúng = 123456
      if (otp !== "123456") throw new Error("Sai mã");

      // Tạo token giả (sau này backend trả thật)
      const fakeToken = btoa(phone + Date.now());
      localStorage.setItem("token", fakeToken);
      localStorage.setItem("userPhone", phone);

      return { token: fakeToken, phone };
    },
    onSuccess: () => {
      toast.success("Xác nhận thành công! Chào mừng bạn đến ThinhStyle");
      navigate("/booking");
    },
    onError: () => {
      toast.error("Mã OTP không đúng");
    },
  });
};
