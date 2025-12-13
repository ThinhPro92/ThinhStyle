import { useQuery } from "@tanstack/react-query";
import apiClient from "../../../lib/apiClient";
import { QUERY_KEYS } from "../../../constants/queryKeys";
import { format } from "date-fns";

export const useAvailableSlots = (date: Date, barberId?: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.AVAILABLE_SLOTS(format(date, "yyyy-MM-dd"), barberId),
    queryFn: async () => {
      const res = await apiClient.get(`/bookings/available-slots`, {
        params: { date: format(date, "yyyy-MM-dd"), barberId },
      });
      return res.data.data;
    },
    enabled: !!barberId,
  });
};
