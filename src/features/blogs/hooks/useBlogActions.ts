import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useBlogStore } from "../../../store/useBlogStore";
import apiClient from "../../../lib/apiClient";

export const useBlogActions = () => {
  const queryClient = useQueryClient();
  const { closeCreate, closeEdit, closeDelete } = useBlogStore();

  const create = useMutation({
    mutationFn: (data: any) => apiClient.post("/blogs", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      toast.success("Đăng bài thành công!");
      closeCreate();
    },
    onError: () => toast.error("Lỗi khi đăng bài"),
  });

  const update = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      apiClient.put(`/blogs/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      toast.success("Cập nhật thành công!");
      closeEdit();
    },
    onError: () => toast.error("Lỗi khi cập nhật"),
  });

  const remove = useMutation({
    mutationFn: (id: string) => apiClient.delete(`/blogs/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      toast.success("Xóa bài thành công!");
      closeDelete();
    },
    onError: () => toast.error("Lỗi khi xóa"),
  });
  const detail = useMutation({
    mutationFn: (id: string) => apiClient.get(`/blogs/${id}`),

    onError: () => toast.error("Không thể tải bài viết"),
  });

  // INCREASE VIEW — tăng view
  const increaseView = useMutation({
    mutationFn: (id: string) => apiClient.patch(`/blogs/${id}/view`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
    onError: () => {},
  });
  return { create, update, remove, detail, increaseView };
};
