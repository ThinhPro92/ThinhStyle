import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import apiClient from "../../../lib/apiClient";
import type { CreateBookingPayload } from "../../../types/booking";
import { QUERY_KEYS } from "../../../constants/queryKeys";

export const useCreateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateBookingPayload) =>
      apiClient.post("/bookings", data),
    onSuccess: (res) => {
      toast.success(`Đặt lịch thành công! Mã: ${res.data.bookingCode}`);
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.BOOKINGS() });
    },
    onError: () => toast.error("Đặt lịch thất bại"),
  });
};
