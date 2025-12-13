import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import apiClient from "../../../lib/apiClient";
import { QUERY_KEYS } from "../../../constants/queryKeys";
import { useBlogStore } from "../../../store/useBlogStore";
import type { CreateBlogData, UpdateBlogData } from "../../../types/blog";

export const useBlogActions = () => {
  const queryClient = useQueryClient();
  const { closeCreate, closeEdit, closeDelete } = useBlogStore();

  const create = useMutation({
    mutationFn: (data: CreateBlogData) => apiClient.post("/blogs", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.BLOGS });
      toast.success("Đăng bài thành công!");
      closeCreate();
    },
    onError: () => toast.error("Lỗi đăng bài"),
  });

  const update = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateBlogData }) =>
      apiClient.put(`/blogs/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.BLOGS });
      toast.success("Cập nhật thành công!");
      closeEdit();
    },
    onError: () => toast.error("Lỗi cập nhật"),
  });

  const remove = useMutation({
    mutationFn: (id: string) => apiClient.delete(`/blogs/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.BLOGS });
      toast.success("Xóa thành công!");
      closeDelete();
    },
    onError: () => toast.error("Lỗi xóa"),
  });

  return { create, update, remove };
};
