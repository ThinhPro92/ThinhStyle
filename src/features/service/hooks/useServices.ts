import { useQuery } from "@tanstack/react-query";
import apiClient from "../../../lib/apiClient";
import type { Service } from "../../../types/service";
import type { ApiResponse } from "../../../types/common";

export const useServices = () => {
  return useQuery<Service[]>({
    queryKey: ["services"],
    queryFn: async () => {
      const res = await apiClient.get<ApiResponse<Service[]>>("/services");
      return res.data.data;
    },
  });
};
