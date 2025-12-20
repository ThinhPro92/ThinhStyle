import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import apiClient from "../../../lib/apiClient";
import { useBarberStore } from "../../../store/useBarberStore";
import type {
  CreateBarberData,
  UpdateBarberData,
  Barber,
} from "../../../types/barber";
import { QUERY_KEYS } from "../../../constants/queryKeys";

export const useBarberActions = () => {
  const queryClient = useQueryClient();
  const { closeCreate, closeEdit, closeDelete } = useBarberStore();

  const create = useMutation({
    mutationFn: (data: CreateBarberData) => apiClient.post("/barber", data),
    onSuccess: (res) => {
      const newBarber = res.data.data as Barber;
      // Optimistic: thêm vào cache ngay → không refetch
      queryClient.setQueryData<Barber[]>(QUERY_KEYS.BARBERS, (old = []) => [
        ...old,
        newBarber,
      ]);
      toast.success("Thêm thợ thành công!");
      closeCreate();
    },
    onError: () => toast.error("Lỗi khi thêm thợ"),
  });

  const update = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateBarberData }) =>
      apiClient.put(`/barber/${id}`, data),
    onSuccess: (res) => {
      const updatedBarber = res.data.data as Barber;
      // Optimistic: cập nhật cache ngay
      queryClient.setQueryData<Barber[]>(QUERY_KEYS.BARBERS, (old = []) =>
        old.map((b) => (b._id === updatedBarber._id ? updatedBarber : b))
      );
      toast.success("Cập nhật thành công!");
      closeEdit();
    },
  });

  const remove = useMutation({
    mutationFn: (id: string) => apiClient.delete(`/barber/${id}`),
    onSuccess: (_, id) => {
      // Optimistic: xóa khỏi cache ngay
      queryClient.setQueryData<Barber[]>(QUERY_KEYS.BARBERS, (old = []) =>
        old.filter((b) => b._id !== id)
      );
      toast.success("Xóa thợ thành công!");
      closeDelete();
    },
  });

  return { create, update, remove };
};
