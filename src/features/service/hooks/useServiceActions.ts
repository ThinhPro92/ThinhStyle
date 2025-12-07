// src/features/admin/services/hooks/useServiceActions.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useServiceStore } from "../../../store/useServiceStore";
import apiClient from "../../../lib/apiClient";

export const useServiceActions = () => {
  const queryClient = useQueryClient();
  const { closeCreate, closeEdit, closeDelete } = useServiceStore();

  const create = useMutation({
    mutationFn: (data: any) => apiClient.post("/services", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast.success("Thêm dịch vụ thành công!");
      closeCreate();
    },
  });

  const update = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      apiClient.put(`/services/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast.success("Cập nhật thành công!");
      closeEdit();
    },
  });

  const remove = useMutation({
    mutationFn: (id: string) => apiClient.delete(`/services/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast.success("Xóa dịch vụ thành công!");
      closeDelete();
    },
  });

  return { create, update, remove };
};
