import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import apiClient from "../../../lib/apiClient";

export const useCreateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bookingData: any) => {
      const res = await apiClient.post("/bookings", bookingData);
      return res.data.data;
    },
    onSuccess: (data) => {
      toast.success("Đặt lịch thành công! Mã lịch: " + data.bookingCode);
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: () => {
      toast.error("Đặt lịch thất bại, vui lòng thử lại");
    },
  });
};
