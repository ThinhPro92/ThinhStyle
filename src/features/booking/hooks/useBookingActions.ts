import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useBookingStore } from "../../../store/useBookingStore";
import apiClient from "../../../lib/apiClient";

export const useBookingActions = () => {
  const queryClient = useQueryClient();
  const { closeCreate } = useBookingStore();

  const create = useMutation({
    mutationFn: async (data: any) => {
      const res = await apiClient.post("/bookings", data);
      return res.data;
    },
    onSuccess: () => {
      // Refetch danh sách lịch + calendar
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["barbers"] }); // nếu cần cập nhật trạng thái thợ

      toast.success("Đặt lịch thành công! Thợ đã nhận thông báo", {
        duration: 6000,
        icon: "Thành công",
        style: { background: "#16a34a", color: "white" },
      });

      closeCreate();
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Đặt lịch thất bại, vui lòng thử lại"
      );
    },
  });

  return { create };
};
