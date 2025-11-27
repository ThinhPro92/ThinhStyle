import { useMutation } from "@tanstack/react-query";

import toast from "react-hot-toast";
import apiClient from "../../../../lib/apiClient";

export const useSendOtp = () => {
  return useMutation({
    mutationFn: async (phone: string) => {
      const res = await apiClient.post("/users", {
        phone,
        name: "Khách vãng lai",
        role: "customer",
      });
      return res.data.data;
    },
    onSuccess: () => {
      toast.success("Đã gửi mã OTP đến điện thoại của bạn!");
    },
    onError: () => {
      toast.error("Gửi mã thất bại, thử lại nhé!");
    },
  });
};
