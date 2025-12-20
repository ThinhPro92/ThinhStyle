import { X } from "lucide-react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../../../lib/apiClient";
import { QUERY_KEYS } from "../../../constants/queryKeys";
import { useBookingAdminStore } from "../../../store/useBookingAdminStore";
import { useBookingActions } from "../hooks/useBookingActions";
import { useLayoutEffect } from "react";
import { updateBookingSchema } from "../../../validates/BookingSchema";
import type { z } from "zod";
import type { Barber } from "../../../types/barber";
import type { Service } from "../../../types/service";

type FormData = z.infer<typeof updateBookingSchema>;

const statusConfig = [
  { value: "pending", label: "Chờ xác nhận", color: "text-yellow-400" },
  { value: "confirmed", label: "Đã xác nhận", color: "text-green-400" },
  { value: "cancelled", label: "Đã hủy", color: "text-red-400" },
  { value: "completed", label: "Hoàn thành", color: "text-blue-400" },
  { value: "rejected", label: "Từ chối", color: "text-gray-400" },
] as const;

export default function EditBookingModal() {
  const { isEditOpen, closeEdit, selectedBooking } = useBookingAdminStore();
  const { update } = useBookingActions();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(updateBookingSchema),
  });

  const { data: barbers = [] } = useQuery<Barber[]>({
    queryKey: QUERY_KEYS.BARBERS,
    queryFn: async () => (await apiClient.get("/barbers")).data.data,
  });

  const { data: services = [] } = useQuery<Service[]>({
    queryKey: QUERY_KEYS.SERVICES,
    queryFn: async () => (await apiClient.get("/services")).data.data,
  });

  useLayoutEffect(() => {
    if (selectedBooking && isEditOpen) {
      reset({
        customerName: selectedBooking.customerName || "",
        customerPhone: selectedBooking.customerPhone || "",
        barberId: selectedBooking.barberId || "",
        serviceIds: selectedBooking.serviceIds || [],
        date: selectedBooking.date ? selectedBooking.date.split("T")[0] : "",
        startTime: selectedBooking.startTime || "",
        note: selectedBooking.note || "",
        status: selectedBooking.status,
      });
    }
  }, [selectedBooking, isEditOpen, reset]);

  const onSubmit = (data: FormData) => {
    if (!selectedBooking) return;

    const payload = {
      barberId: data.barberId || selectedBooking.barberId,
      serviceIds: data.serviceIds?.length
        ? data.serviceIds
        : selectedBooking.serviceIds || [],
      date: data.date || selectedBooking.date?.split("T")[0],
      startTime: data.startTime || selectedBooking.startTime,
      customerName: data.customerName || selectedBooking.customerName,
      customerPhone: data.customerPhone || selectedBooking.customerPhone,
      note: data.note,
      status: data.status || selectedBooking.status,
    };

    update.mutate({ id: selectedBooking._id, data: payload });
  };

  if (!isEditOpen || !selectedBooking) return null;

  const currentStatus = selectedBooking.status;

  // Logic trạng thái: không cho phép chuyển ngược hoặc không hợp lý
  const isAllowed = (target: string) => {
    if (currentStatus === "completed" || currentStatus === "cancelled")
      return target === currentStatus;
    if (currentStatus === "confirmed")
      return ["confirmed", "completed", "cancelled"].includes(target);
    if (currentStatus === "pending") return true;
    return false;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/80 backdrop-blur z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={closeEdit}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="bg-gradient-to-br from-gray-900 to-black border border-orange-500/50 rounded-3xl p-10 max-w-5xl w-full my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
            Sửa Lịch Đặt
          </h2>
          <button
            onClick={closeEdit}
            aria-label="X"
            className="p-3 hover:bg-white/10 rounded-xl transition"
          >
            <X className="w-8 h-8" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid lg:grid-cols-2 gap-8"
        >
          {/* Cột trái - thông tin khách + thợ + ngày giờ */}
          <div className="space-y-6">
            <input
              {...register("customerName")}
              placeholder="Tên khách hàng"
              className="w-full px-6 py-4 bg-gray-800/70 border border-gray-700 rounded-2xl focus:border-orange-500 outline-none transition text-lg"
            />
            {errors.customerName && (
              <p className="text-red-400 text-sm">
                {errors.customerName.message}
              </p>
            )}

            <input
              {...register("customerPhone")}
              placeholder="Số điện thoại"
              className="w-full px-6 py-4 bg-gray-800/70 border border-gray-700 rounded-2xl focus:border-orange-500 outline-none transition text-lg"
            />
            {errors.customerPhone && (
              <p className="text-red-400 text-sm">
                {errors.customerPhone.message}
              </p>
            )}

            <select
              {...register("barberId")}
              className="w-full px-6 py-4 bg-gray-800/70 border border-gray-700 rounded-2xl focus:border-orange-500 outline-none transition text-lg"
            >
              <option value="">Chọn thợ cắt</option>
              {barbers.map((b) => (
                <option key={b._id} value={b._id}>
                  {b.name}
                </option>
              ))}
            </select>

            <input
              {...register("date")}
              type="date"
              className="w-full px-6 py-4 bg-gray-800/70 border border-gray-700 rounded-2xl focus:border-orange-500 outline-none transition text-lg"
            />
            {errors.date && (
              <p className="text-red-400 text-sm">{errors.date.message}</p>
            )}

            <input
              {...register("startTime")}
              type="time"
              className="w-full px-6 py-4 bg-gray-800/70 border border-gray-700 rounded-2xl focus:border-orange-500 outline-none transition text-lg"
            />
            {errors.startTime && (
              <p className="text-red-400 text-sm">{errors.startTime.message}</p>
            )}
          </div>

          {/* Cột phải - dịch vụ + ghi chú + trạng thái */}
          <div className="space-y-6">
            <div>
              <p className="text-lg font-medium mb-3 text-orange-400">
                Chọn dịch vụ
              </p>
              <div className="bg-gray-800/70 border border-gray-700 rounded-2xl p-4 max-h-64 overflow-y-auto">
                {services.map((s) => {
                  const isChecked = selectedBooking.serviceIds?.includes(s._id);
                  return (
                    <label
                      key={s._id}
                      className="flex items-center gap-4 cursor-pointer hover:bg-gray-700/50 p-3 rounded-xl transition"
                    >
                      <input
                        type="checkbox"
                        value={s._id}
                        defaultChecked={isChecked}
                        {...register("serviceIds")}
                        className="w-6 h-6 accent-orange-500 rounded"
                      />
                      <div className="flex-1">
                        <p className="font-medium">{s.name}</p>
                        <p className="text-sm text-gray-400">
                          {s.price.toLocaleString()}đ
                        </p>
                      </div>
                    </label>
                  );
                })}
              </div>
              {errors.serviceIds && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.serviceIds.message}
                </p>
              )}
            </div>

            <textarea
              {...register("note")}
              placeholder="Ghi chú"
              rows={4}
              className="w-full px-6 py-4 bg-gray-800/70 border border-gray-700 rounded-2xl focus:border-orange-500 outline-none transition text-lg resize-none"
            />

            <div>
              <label className="text-lg font-medium mb-2 block text-white">
                Trạng thái
              </label>
              <select
                {...register("status")}
                className="w-full px-6 py-4 bg-gray-800/70 border border-gray-700 rounded-2xl focus:border-orange-500 outline-none transition text-lg text-white"
              >
                {statusConfig.map((opt) => (
                  <option
                    key={opt.value}
                    value={opt.value}
                    disabled={!isAllowed(opt.value)}
                    className={opt.color}
                  >
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={update.isPending}
            className="col-span-2 w-full bg-gradient-to-r from-orange-500 to-red-600 py-6 rounded-2xl font-bold text-2xl hover:scale-105 transition shadow-2xl disabled:opacity-70"
          >
            {update.isPending ? "Đang cập nhật..." : "Cập Nhật Lịch"}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}
