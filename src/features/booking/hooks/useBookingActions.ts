import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import apiClient from "../../../lib/apiClient";
import { QUERY_KEYS } from "../../../constants/queryKeys";
import { useBookingAdminStore } from "../../../store/useBookingAdminStore";
import type { AxiosError } from "axios";
import type {
  CreateBookingPayload,
  UpdateBookingData,
} from "../../../types/booking";

export const useBookingActions = () => {
  const queryClient = useQueryClient();
  const { closeCreate, closeEdit, closeDelete } = useBookingAdminStore();

  const create = useMutation({
    mutationFn: (data: CreateBookingPayload) =>
      apiClient.post("/bookings", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.BOOKINGS() });
      queryClient.refetchQueries({ queryKey: QUERY_KEYS.BOOKINGS() });
      toast.success("Đặt lịch thành công!");
      closeCreate();
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || "Lỗi đặt lịch");
    },
  });

  const update = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateBookingData }) =>
      apiClient.put(`/bookings/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.BOOKINGS() });
      toast.success("Cập nhật thành công!");
      closeEdit();
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || "Lỗi sửa lịch");
    },
  });

  const remove = useMutation({
    mutationFn: (id: string) => apiClient.delete(`/bookings/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.BOOKINGS() });
      toast.success("Xóa lịch thành công!");
      closeDelete();
    },
  });

  return { create, update, remove };
};
