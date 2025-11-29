import { useQuery } from "@tanstack/react-query";
import apiClient from "../../../lib/apiClient";
import type { ApiResponse, Service } from "../../../types";

export const useServices = () => {
  return useQuery<Service[]>({
    queryKey: ["services"],
    queryFn: async () => {
      const res = await apiClient.get<ApiResponse<Service[]>>("/services");
      return res.data.data;
    },
  });
};
