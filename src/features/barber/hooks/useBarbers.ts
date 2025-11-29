import { useQuery } from "@tanstack/react-query";
import apiClient from "../../../lib/apiClient";
import type { Barber } from "../../../types";

export const useBarbers = () => {
  return useQuery<Barber[]>({
    queryKey: ["barbers"],
    queryFn: async () => {
      const res = await apiClient.get("/barbers");
      return res.data.data;
    },
  });
};
