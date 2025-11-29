import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import apiClient from "../../../lib/apiClient";

interface AvailableSlotsResponse {
  availableSlots: string[];
  bookedSlots: string[];
}

export const useAvailableSlots = (date: Date, barberId?: string) => {
  const formattedDate = format(date, "yyyy-MM-dd");

  return useQuery({
    queryKey: ["availableSlots", formattedDate, barberId],
    queryFn: async (): Promise<AvailableSlotsResponse> => {
      const res = await apiClient.get("/available-slots", {
        params: {
          date: formattedDate,
          barberId: barberId || "6928706f7f8faf6bf17a0aea",
        },
      });
      return res.data.data;
    },
    enabled: !!date && !!barberId,
    staleTime: 1000 * 60 * 2,
  });
};
