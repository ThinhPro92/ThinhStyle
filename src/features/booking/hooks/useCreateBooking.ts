import { useMutation } from "@tanstack/react-query";
import apiClient from "../../../lib/apiClient";
import toast from "react-hot-toast";

type CreateBookingPayload = {
  barberId: string;
  serviceIds: string[];
  date: string;
  startTime: string;
  customerName: string;
  customerPhone: string;
  note?: string;
  type?: "online" | "offline";
};

const normalizePhone = (phone: string) => {
  return phone
    .replace(/\D/g, "") // bỏ ký tự không phải số
    .replace(/^84/, "0") // +84 -> 0
    .trim();
};

export const useCreateBooking = () => {
  return useMutation({
    mutationFn: async (payload: CreateBookingPayload) => {
      const res = await apiClient.post("/bookings", {
        ...payload,
        customerPhone: normalizePhone(payload.customerPhone),
        type: payload.type ?? "online",
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Đặt lịch thành công 🎉");
    },
    onError: () => {
      toast.error("Đặt lịch thất bại");
    },
  });
};
