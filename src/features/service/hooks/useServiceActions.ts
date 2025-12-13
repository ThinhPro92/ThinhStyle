import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useServiceStore } from "../../../store/useServiceStore";
import type {
  CreateServiceData,
  UpdateServiceData,
} from "../../../types/service";
import apiClient from "../../../lib/apiClient";
import { QUERY_KEYS } from "../../../constants/queryKeys";

export const useServiceActions = () => {
  const queryClient = useQueryClient();
  const { closeCreate, closeEdit, closeDelete } = useServiceStore();

  const create = useMutation({
    mutationFn: (data: CreateServiceData) => apiClient.post("/services", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.SERVICES });
      toast.success("Thêm dịch vụ thành công!");
      closeCreate();
    },
  });

  const update = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateServiceData }) =>
      apiClient.put(`/services/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.SERVICES });
      toast.success("Cập nhật thành công!");
      closeEdit();
    },
  });

  const remove = useMutation({
    mutationFn: (id: string) => apiClient.delete(`/services/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.SERVICES });
      toast.success("Xóa dịch vụ thành công!");
      closeDelete();
    },
  });

  return { create, update, remove };
};
