import { useQuery } from "@tanstack/react-query";
import apiClient from "../../../lib/apiClient";

export const useServices = () => {
  return useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const res = await apiClient.get("/services");
      return res.data.data;
    },
  });
};
