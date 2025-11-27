import { useQuery } from "@tanstack/react-query";
import apiClient from "../../../lib/apiClient";

export const useBarbers = () => {
  return useQuery({
    queryKey: ["barbers"],
    queryFn: async () => {
      const res = await apiClient.get("/barbers");
      return res.data.data;
    },
  });
};
