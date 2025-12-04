import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import apiClient from "../../../lib/apiClient";
import { useBarberStore } from "../../../store/useBarberStore";

export const useBarberActions = () => {
  const queryClient = useQueryClient();
  const { closeCreate, closeEdit, closeDelete } = useBarberStore();

  const create = useMutation({
    mutationFn: (data: any) => apiClient.post("/barber", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["barbers"] });
      toast.success("Thêm thợ thành công!");
      closeCreate();
    },
    onError: () => toast.error("Lỗi khi thêm thợ"),
  });

  const update = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      apiClient.put(`/barber/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["barbers"] });
      toast.success("Cập nhật thành công!");
      closeEdit();
    },
  });

  const remove = useMutation({
    mutationFn: (id: string) => apiClient.delete(`/barber/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["barbers"] });
      toast.success("Xóa thợ thành công!");
      closeDelete();
    },
  });

  return { create, update, remove };
};
