import { useQuery } from "@tanstack/react-query";
import apiClient from "../../../lib/apiClient";
import type { Booking } from "../../../types/booking";

export interface SimpleCustomer {
  id: string;
  name: string;
  phone: string;
}

export const useCustomers = () => {
  return useQuery<SimpleCustomer[]>({
    queryKey: ["customers"],
    queryFn: async () => {
      const res = await apiClient.get("/bookings");
      const bookings: Booking[] = res.data.data;

      const map: Record<string, SimpleCustomer> = {};
      bookings.forEach((b) => {
        const key = b.customerPhone; // dùng phone làm key duy nhất
        if (!map[key]) {
          map[key] = {
            id: key,
            name: b.customerName || "Khách lẻ",
            phone: b.customerPhone,
          };
        }
      });

      return Object.values(map);
    },
  });
};
